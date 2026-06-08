import { NextResponse } from 'next/server'
import {
  fetchRecentItems,
  summarizeItem,
  writeSceneItemToNotion,
} from '@/lib/scene-fetcher'

export async function GET(req: Request) {
  // Auth gate — only Vercel cron or your manual test calls
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // 1. Fetch and filter RSS items from last 24 hours
    const items = await fetchRecentItems()
    console.log(`[scene] Found ${items.length} relevant items`)

    if (items.length === 0) {
      return NextResponse.json({ success: true, processed: 0 })
    }

    // 2. Summarize and write each item to Notion
    const results = { success: 0, failed: 0 }

    for (const item of items) {
      try {
        const summary = await summarizeItem(item)
        await writeSceneItemToNotion(item, summary)
        results.success++
        console.log(`[scene] ✓ ${item.title.slice(0, 60)}`)
      } catch (err) {
        results.failed++
        console.error(`[scene] ✗ ${item.title.slice(0, 60)}:`, err)
      }
    }

    return NextResponse.json({
      success: true,
      processed: results.success,
      failed: results.failed,
    })
  } catch (err) {
    console.error('[scene] Fatal error:', err)
    return NextResponse.json({ error: 'Scene fetch failed' }, { status: 500 })
  }
}
