import Parser from 'rss-parser'
import Anthropic from '@anthropic-ai/sdk'
import { FEEDS, RELEVANCE_KEYWORDS } from '@/feeds.config'

const rssParser = new Parser({
  timeout: 10000,
  headers: { 'User-Agent': 'AtelierSceneFeed/1.0' },
})

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export interface SceneItem {
  title: string
  link: string
  pubDate: string
  snippet: string
  source: string
}

// ─── Step 1: Fetch RSS feeds and filter to last 24 hours ─────────────────────

export async function fetchRecentItems(): Promise<SceneItem[]> {
  const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000)
  const items: SceneItem[] = []

  for (const feed of FEEDS) {
    try {
      const parsed = await rssParser.parseURL(feed.url)

      for (const item of parsed.items) {
        const pubDate = item.pubDate ? new Date(item.pubDate) : null
        if (!pubDate || pubDate < cutoff) continue
        if (!item.title || !item.link) continue

        // Keyword relevance gate — skip before hitting Claude
        if (!isRelevant(item.title, item.contentSnippet)) continue

        items.push({
          title: item.title,
          link: item.link,
          pubDate: item.pubDate ?? '',
          snippet: item.contentSnippet?.slice(0, 400) ?? '',
          source: feed.name,
        })
      }
    } catch (err) {
      console.error(`[scene-fetcher] Failed to fetch "${feed.name}":`, err)
    }
  }

  return items
}

// ─── Step 2: Relevance filter ─────────────────────────────────────────────────

function isRelevant(title: string, snippet?: string): boolean {
  const haystack = `${title} ${snippet ?? ''}`.toLowerCase()
  return RELEVANCE_KEYWORDS.some((kw) => haystack.includes(kw))
}

// ─── Step 3: Claude summarization in Atelier voice ───────────────────────────

export async function summarizeItem(item: SceneItem): Promise<string> {
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 120,
    system: `You write brief items for "From the Scene" — the daily news feed of The Atelier & The Altar, 
a connoisseur-led, Scripture-first digital magazine of faith and culture.

Voice: A well-read friend with real taste and quiet conviction. Never churchy, never preachy, never a 
press release. Plain and concrete. Warm without saccharine. Honest without being hopeless.

Format: 2 sentences only. The first sentence names what happened and why it matters. 
The second sentence earns the click — the angle only The Atelier would notice.

Do not begin with the artist or publication name. Do not use phrases like "This article" or "This piece."`,
    messages: [
      {
        role: 'user',
        content: `Write a 2-sentence "From the Scene" item for this:\n\nTitle: ${item.title}\nSource: ${item.source}\nSnippet: ${item.snippet}`,
      },
    ],
  })

  if (response.content[0].type === 'text') {
    return response.content[0].text.trim()
  }
  return item.title
}

// ─── Step 4: Write to Notion ──────────────────────────────────────────────────

export async function writeSceneItemToNotion(
  item: SceneItem,
  summary: string
): Promise<void> {
  const res = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      parent: { database_id: process.env.NOTION_DB_ID },
      properties: {
        // Title property — the original article headline
        title: {
          title: [{ text: { content: item.title } }],
        },
        // Status — Draft so you review before publish
        Status: {
          select: { name: 'Draft' },
        },
        // Section — new value for the scene feed
        Section: {
          select: { name: 'From the Scene' },
        },
      },
      // Page body: Atelier summary + source attribution
      children: [
        {
          object: 'block',
          type: 'callout',
          callout: {
            icon: { type: 'emoji', emoji: '📡' },
            rich_text: [
              { type: 'text', text: { content: summary } },
            ],
          },
        },
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [
              {
                type: 'text',
                text: { content: `Source: ${item.source}  ·  ` },
                annotations: { color: 'gray' },
              },
              {
                type: 'text',
                text: { content: item.title, link: { url: item.link } },
              },
            ],
          },
        },
      ],
    }),
  })

  if (!res.ok) {
    const err = await res.json()
    throw new Error(`Notion write failed: ${JSON.stringify(err)}`)
  }
}
