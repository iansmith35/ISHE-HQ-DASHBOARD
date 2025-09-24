import { useState, useEffect } from 'react'
import { DashboardUpdatesService } from '@/lib/dashboard-updates'
import { DashboardUpdate } from '@/lib/supabase'

/**
 * Custom hook for managing dashboard updates
 */
export function useDashboardUpdates(limit: number = 10) {
  const [updates, setUpdates] = useState<DashboardUpdate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load initial updates
  useEffect(() => {
    async function loadUpdates() {
      try {
        setLoading(true)
        const data = await DashboardUpdatesService.getRecentUpdates(limit)
        setUpdates(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load updates')
      } finally {
        setLoading(false)
      }
    }

    loadUpdates()
  }, [limit])

  // Subscribe to real-time updates
  useEffect(() => {
    const subscription = DashboardUpdatesService.subscribeToUpdates((newUpdate) => {
      setUpdates(prev => [newUpdate, ...prev.slice(0, limit - 1)])
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [limit])

  // Function to add a new update
  const addUpdate = async (update: Omit<DashboardUpdate, 'id' | 'timestamp' | 'created_at'>) => {
    try {
      const newUpdate = await DashboardUpdatesService.createUpdate(update)
      // Real-time subscription will handle adding it to the state
      return newUpdate
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add update')
      throw err
    }
  }

  return {
    updates,
    loading,
    error,
    addUpdate
  }
}

/**
 * Hook for updates by type
 */
export function useDashboardUpdatesByType(type: string, limit: number = 20) {
  const [updates, setUpdates] = useState<DashboardUpdate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadUpdates() {
      try {
        setLoading(true)
        const data = await DashboardUpdatesService.getUpdatesByType(type, limit)
        setUpdates(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load updates')
      } finally {
        setLoading(false)
      }
    }

    if (type) {
      loadUpdates()
    }
  }, [type, limit])

  return {
    updates,
    loading,
    error
  }
}