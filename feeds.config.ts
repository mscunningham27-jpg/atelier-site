export interface Feed {
  name: string
  url: string
  tier: 1 | 2
}

export const FEEDS: Feed[] = [
  // Tier 1 — Core (pull daily, high signal)
  {
    name: 'Christianity Today',
    url: 'https://www.christianitytoday.com/feed/',
    tier: 1,
  },
  {
    name: 'Ekstasis Magazine',
    url: 'https://www.ekstasismagazine.com/feed/',
    tier: 1,
  },
  {
    name: 'RELEVANT Magazine',
    url: 'https://relevantmagazine.com/feed/',
    tier: 1,
  },
  {
    name: 'The Gospel Coalition',
    url: 'https://www.thegospelcoalition.org/feed/',
    tier: 1,
  },
  {
    name: 'Art & Theology',
    url: 'https://artandtheology.org/feed',
    tier: 1,
  },

  // Tier 2 — Scene & music (pull daily, filtered)
  {
    name: 'Mere Orthodoxy',
    url: 'https://mereorthodoxy.com/rss.xml',
    tier: 2,
  },
  {
    name: 'Jesus Freak Hideout',
    url: 'https://www.jesusfreakhideout.com/rss/',
    tier: 2,
  },
  {
    name: 'Christ and Pop Culture',
    url: 'https://christandpopculture.com/feed/',
    tier: 2,
  },
  {
    name: 'Relief Journal',
    url: 'https://www.reliefjournal.com/blog?format=rss',
    tier: 2,
  },
]

// Keywords that signal an item is relevant to The Atelier's niche.
// Items with no keyword match are skipped before calling Claude.
export const RELEVANCE_KEYWORDS = [
  'music', 'album', 'song', 'artist', 'art', 'painting', 'gallery',
  'film', 'movie', 'novel', 'book', 'poetry', 'poem', 'writer',
  'creative', 'craft', 'beauty', 'culture', 'design', 'literature',
  'theater', 'theatre', 'worship', 'hymn', 'image', 'visual',
  'storytelling', 'imagination', 'calling', 'vocation',
]
