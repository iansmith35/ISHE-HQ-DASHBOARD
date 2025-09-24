// pages/api/chat.ts - Real OpenAI Assistant integration
import OpenAI from 'openai'
import type { NextApiRequest, NextApiResponse } from 'next'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { message, assistant_id, thread_id } = req.body

    // Add message to thread
    await openai.beta.threads.messages.create(thread_id, {
      role: 'user',
      content: message
    })

    // Run the assistant
    const run = await openai.beta.threads.runs.create(thread_id, {
      assistant_id: assistant_id
    })

    // Wait for completion
    let runStatus = await openai.beta.threads.runs.retrieve(thread_id, run.id)
    
    while (runStatus.status === 'running' || runStatus.status === 'queued') {
      await new Promise(resolve => setTimeout(resolve, 1000))
      runStatus = await openai.beta.threads.runs.retrieve(thread_id, run.id)
    }

    if (runStatus.status === 'completed') {
      // Get the assistant's response
      const messages = await openai.beta.threads.messages.list(thread_id)
      const lastMessage = messages.data[0]
      
      if (lastMessage.role === 'assistant') {
        const content = lastMessage.content[0]
        if (content.type === 'text') {
          return res.status(200).json({ 
            response: content.text.value,
            success: true 
          })
        }
      }
    }

    return res.status(500).json({ error: 'Assistant run failed' })

  } catch (error) {
    console.error('Chat API error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}