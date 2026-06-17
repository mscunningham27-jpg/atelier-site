import { getAllArticles } from '@/lib/articles'

const SITE_URL = 'https://www.atelierandaltar.com'

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

// publishDate is 'YYYY-MM-DD'; parse as UTC midnight → RFC 822
function toRfc822(dateStr: string): string {
  return new Date(`${dateStr}T00:00:00Z`).toUTCString()
}

export async function GET() {
  const articles = getAllArticles() // sorted by publishDate desc

  const lastBuildDate = articles[0]
    ? toRfc822(articles[0].publishDate)
    : new Date(0).toUTCString()

  const items = articles.map(article => {
    const url = `${SITE_URL}/articles/${article.slug}`
    const description = escapeXml(article.metaDescription || article.dek || '')
    const pubDate = toRfc822(article.publishDate)

    const authorTag = article.author
      ? `\n    <author>${escapeXml(article.author)}</author>`
      : ''

    const categoryTag = article.sectionLabel
      ? `\n    <category>${escapeXml(article.sectionLabel)}</category>`
      : ''

    const tagItems = (article.tags ?? [])
      .map(tag => `\n    <category>${escapeXml(tag)}</category>`)
      .join('')

    return `
  <item>
    <title>${escapeXml(article.title)}</title>
    <link>${escapeXml(url)}</link>
    <guid isPermaLink="true">${escapeXml(url)}</guid>
    <description>${description}</description>
    <pubDate>${pubDate}</pubDate>${authorTag}${categoryTag}${tagItems}
  </item>`
  })

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>The Atelier &amp; The Altar</title>
    <link>${SITE_URL}</link>
    <description>A digital magazine for artists and Christian connoisseurs.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />${items.join('')}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
