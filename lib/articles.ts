import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const ARTICLES_DIR = path.join(process.cwd(), 'content/articles')

export type Article = {
  slug: string
  title: string
  dek: string
  section: 'the-assignment' | 'the-craft' | 'the-archive' | 'the-altar' | 'the-guild'
  sectionLabel: string
  publishDate: string
  readTime: string
  heroImage?: string
  heroImageAlt?: string
  heroImageCaption?: string
  metaDescription?: string
  content: string
  // Issue & placement
  issueNumber?: string
  issueTheme?: string
  featuredPlacement?: 'opening-essay' | 'object-feature' | 'hard-question' | 'respite' | 'guild-feature' | 'closing-note'
  pieceType?: string
  mood?: string
  respite?: boolean
  // Editorial assets
  pullQuote?: string
  studioWall?: string
  closingRitual?: string
  answerBox?: string
  tags?: string[]
  author?: string
}

const SECTION_LABELS: Record<string, string> = {
  'the-assignment': 'The Assignment',
  'the-craft':      'The Craft',
  'the-archive':    'The Archive',
  'the-altar':      'The Altar',
  'the-guild':      'The Guild',
}

export function getAllArticles(): Article[] {
  if (!fs.existsSync(ARTICLES_DIR)) return []
  const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
  return files.map(file => {
    const slug = file.replace(/\.mdx?$/, '')
    return getArticleBySlug(slug)!
  }).filter(Boolean).sort((a, b) =>
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  )
}

export function getArticlesBySection(section: string): Article[] {
  return getAllArticles().filter(a => a.section === section)
}

export function getArticlesByPlacement(placement: Article['featuredPlacement']): Article[] {
  return getAllArticles().filter(a => a.featuredPlacement === placement)
}

export function getIssueArticles(issueNumber: string): Article[] {
  return getAllArticles().filter(a => a.issueNumber === issueNumber)
}

export function getArticleBySlug(slug: string): Article | null {
  const mdxPath = path.join(ARTICLES_DIR, `${slug}.mdx`)
  const mdPath  = path.join(ARTICLES_DIR, `${slug}.md`)
  const filePath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null
  if (!filePath) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    slug,
    title:            data.title ?? '',
    dek:              data.dek ?? '',
    section:          data.section ?? 'the-assignment',
    sectionLabel:     SECTION_LABELS[data.section] ?? data.section,
    publishDate:      data.publishDate ?? '',
    readTime:         data.readTime ?? '',
    heroImage:        data.heroImage ?? null,
    heroImageAlt:     data.heroImageAlt ?? data.title ?? '',
    heroImageCaption: data.heroImageCaption ?? null,
    metaDescription:  data.metaDescription ?? data.dek ?? '',
    issueNumber:      data.issueNumber ?? null,
    issueTheme:       data.issueTheme ?? null,
    featuredPlacement:data.featuredPlacement ?? null,
    pieceType:        data.pieceType ?? null,
    mood:             data.mood ?? null,
    respite:          data.respite ?? false,
    pullQuote:        data.pullQuote ?? null,
    studioWall:       data.studioWall ?? null,
    closingRitual:    data.closingRitual ?? null,
    answerBox:        data.answerBox ?? null,
    tags:             data.tags ?? [],
    author:           data.author ?? null,
    content,
  }
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) return []
  return fs.readdirSync(ARTICLES_DIR)
    .filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
    .map(f => f.replace(/\.mdx?$/, ''))
}
