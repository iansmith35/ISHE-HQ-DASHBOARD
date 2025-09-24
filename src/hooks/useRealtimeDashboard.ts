'use client'

import { useState, useEffect, useCallback } from 'react'

export interface DashboardUpdate {
  id: string
  type: string
  data: any
  timestamp: string
  ai_insights?: string
}

export interface RealtimeDashboardHook {
  updates: DashboardUpdate[]
  isConnected: boolean
  error: string | null
  sendTestUpdate: (update: { metric: string; value: number; timestamp: string }) => void
}

export function useRealtimeDashboard(): RealtimeDashboardHook {
  const [updates, setUpdates] = useState<DashboardUpdate[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Simulate connection status
  useEffect(() => {
    // Simulate initial connection delay
    const connectTimeout = setTimeout(() => {
      setIsConnected(true)
      setError(null)
    }, 1000)

    // Simulate occasional connection issues
    const connectionInterval = setInterval(() => {
      const shouldDisconnect = Math.random() < 0.05 // 5% chance of disconnection
      if (shouldDisconnect && isConnected) {
        setIsConnected(false)
        setError('Connection lost. Attempting to reconnect...')
        
        // Reconnect after a short delay
        setTimeout(() => {
          setIsConnected(true)
          setError(null)
        }, 2000)
      }
    }, 5000)

    return () => {
      clearTimeout(connectTimeout)
      clearInterval(connectionInterval)
    }
  }, [isConnected])

  // Generate AI insights for updates
  const generateAIInsights = (type: string, data: any): string => {
    const insights = {
      user_engagement: [
        'User engagement is trending upward based on recent activity patterns.',
        'This metric shows positive momentum compared to the previous hour.',
        'Consider implementing targeted campaigns to maintain this growth.'
      ],
      system_performance: [
        'System performance is within optimal parameters.',
        'Response times are 15% better than average for this time period.',
        'Memory usage is stable and below threshold limits.'
      ],
      sales_metrics: [
        'Sales conversion rate has improved by 8% this quarter.',
        'Peak activity detected during afternoon hours.',
        'Recommend focusing marketing efforts during high-conversion periods.'
      ],
      default: [
        'Data patterns indicate normal operational status.',
        'Metrics are within expected ranges for current time period.',
        'No immediate action required based on current trends.'
      ]
    }

    const categoryInsights = insights[type as keyof typeof insights] || insights.default
    return categoryInsights[Math.floor(Math.random() * categoryInsights.length)]
  }

  const sendTestUpdate = useCallback((testData: { metric: string; value: number; timestamp: string }) => {
    if (!isConnected) {
      setError('Cannot send update: Not connected to real-time service')
      return
    }

    const newUpdate: DashboardUpdate = {
      id: `update_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: testData.metric,
      data: {
        metric: testData.metric,
        value: testData.value,
        timestamp: testData.timestamp,
        source: 'test_generator',
        metadata: {
          browser: navigator.userAgent.split(' ')[0],
          generated_at: new Date().toISOString()
        }
      },
      timestamp: testData.timestamp,
      ai_insights: Math.random() > 0.3 ? generateAIInsights(testData.metric, testData) : undefined
    }

    setUpdates(prevUpdates => [newUpdate, ...prevUpdates.slice(0, 49)]) // Keep last 50 updates
    setError(null)
  }, [isConnected])

  // Simulate periodic background updates
  useEffect(() => {
    if (!isConnected) return

    const backgroundUpdateInterval = setInterval(() => {
      const shouldGenerateUpdate = Math.random() < 0.3 // 30% chance every 10 seconds
      
      if (shouldGenerateUpdate) {
        const metrics = ['system_performance', 'sales_metrics', 'user_activity', 'data_sync']
        const randomMetric = metrics[Math.floor(Math.random() * metrics.length)]
        
        sendTestUpdate({
          metric: randomMetric,
          value: Math.floor(Math.random() * 1000),
          timestamp: new Date().toISOString()
        })
      }
    }, 10000) // Check every 10 seconds

    return () => clearInterval(backgroundUpdateInterval)
  }, [isConnected, sendTestUpdate])

  return {
    updates,
    isConnected,
    error,
    sendTestUpdate
  }
}