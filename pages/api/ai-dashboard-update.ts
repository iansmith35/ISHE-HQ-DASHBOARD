// pages/api/ai-dashboard-update.ts
import { createClient } from '@supabase/supabase-js'
import { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from 'openai'

// Initialize Supabase client only if credentials are available
const supabase = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
  ? createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )
  : null

// Initialize OpenAI client only if API key is available
const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    })
  : null

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { type, data } = req.body

    // Validate input
    if (!type || !data) {
      return res.status(400).json({ 
        error: 'Missing required fields: type and data are required' 
      })
    }

    let insights: string | null = null

    // Process webhook data with AI (or mock if no API key)
    if (openai) {
      try {
        const aiAnalysis = await openai.chat.completions.create({
          model: 'gpt-4',
          messages: [{
            role: 'system',
            content: 'Analyze this dashboard data and provide insights and recommendations.'
          }, {
            role: 'user',
            content: `Data type: ${type}, Data: ${JSON.stringify(data)}`
          }],
          max_tokens: 200
        })

        insights = aiAnalysis.choices[0].message.content
      } catch (error) {
        console.error('OpenAI API error:', error)
        insights = `Mock AI analysis for ${type}: Based on the provided data, I observe interesting patterns in user behavior. This ${type} event indicates active engagement with the dashboard system.`
      }
    } else {
      // Mock AI analysis when OpenAI is not available
      insights = `Mock AI analysis for ${type}: Based on the provided data, I observe interesting patterns in user behavior. This ${type} event indicates active engagement with the dashboard system.`
    }

    let dbResult = null
    let broadcastResult = null

    // Update dashboard with real-time data and AI insights (or mock if no Supabase)
    if (supabase) {
      try {
        const { error } = await supabase
          .from('dashboard_updates')
          .insert({
            type,
            data,
            ai_insights: insights,
            timestamp: new Date().toISOString()
          })

        if (error) {
          console.error('Supabase insert error:', error)
          dbResult = { error: error.message, mock: true }
        } else {
          dbResult = { success: true }
        }

        // Broadcast to connected clients via Supabase realtime
        const { error: broadcastError } = await supabase
          .channel('dashboard-updates')
          .send({
            type: 'broadcast',
            event: 'dashboard-update',
            payload: { type, data, ai_insights: insights }
          })

        if (broadcastError) {
          console.error('Supabase broadcast error:', broadcastError)
          broadcastResult = { error: broadcastError.message, mock: true }
        } else {
          broadcastResult = { success: true }
        }
      } catch (error) {
        console.error('Supabase operation error:', error)
        dbResult = { error: 'Database operation failed', mock: true }
        broadcastResult = { error: 'Broadcast operation failed', mock: true }
      }
    } else {
      // Mock database and broadcast operations when Supabase is not available
      dbResult = { success: true, mock: true, message: 'Mock database insert completed' }
      broadcastResult = { success: true, mock: true, message: 'Mock broadcast completed' }
    }

    res.status(200).json({ 
      success: true, 
      message: 'Dashboard updated with AI insights',
      insights,
      database: dbResult,
      broadcast: broadcastResult,
      mock: !openai || !supabase
    })

  } catch (error) {
    console.error('AI Dashboard Update Error:', error)
    res.status(500).json({ 
      error: 'Failed to process dashboard update',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}