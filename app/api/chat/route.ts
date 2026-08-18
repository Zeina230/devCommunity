import { openai } from '@ai-sdk/openai'
import { convertToModelMessages, streamText, type UIMessage } from 'ai'

export const maxDuration = 30 //between each request

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const result = streamText({
    model: openai('gpt-4o-mini'), //cheapest model
    system: 'You are a helpful teaching assistant for beginner developers.', //how ai thinks
    messages: await convertToModelMessages(messages),
  })

  return result.toUIMessageStreamResponse()
}