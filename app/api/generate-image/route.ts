import { NextResponse } from 'next/server'
import { config, subscribe } from '@fal-ai/serverless-client'

config({ credentials: process.env.FAL_KEY })

type FluxOutput = { images: Array<{ url: string }> }

export async function POST(req: Request) {
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { prompt } = await req.json() as { prompt?: string }
  if (!prompt) {
    return NextResponse.json({ error: 'Missing prompt' }, { status: 400 })
  }

  const result = await subscribe<object, FluxOutput>('fal-ai/flux/dev', {
    input: {
      prompt,
      image_size: 'landscape_16_9',
      num_inference_steps: 28,
      guidance_scale: 3.5,
      num_images: 1,
    },
  })

  return NextResponse.json({ url: result.images[0].url })
}
