import { supabase, DashboardUpdate, DASHBOARD_UPDATES_TABLE } from './supabase'

/**
 * Service for managing dashboard updates in Supabase
 */
export class DashboardUpdatesService {
  
  /**
   * Create a new dashboard update
   */
  static async createUpdate(update: Omit<DashboardUpdate, 'id' | 'timestamp' | 'created_at'>) {
    const { data, error } = await supabase
      .from(DASHBOARD_UPDATES_TABLE)
      .insert(update)
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to create dashboard update: ${error.message}`)
    }

    return data
  }

  /**
   * Get recent dashboard updates
   */
  static async getRecentUpdates(limit: number = 50) {
    const { data, error } = await supabase
      .from(DASHBOARD_UPDATES_TABLE)
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(limit)

    if (error) {
      throw new Error(`Failed to fetch dashboard updates: ${error.message}`)
    }

    return data
  }

  /**
   * Get updates by type
   */
  static async getUpdatesByType(type: string, limit: number = 20) {
    const { data, error } = await supabase
      .from(DASHBOARD_UPDATES_TABLE)
      .select('*')
      .eq('type', type)
      .order('timestamp', { ascending: false })
      .limit(limit)

    if (error) {
      throw new Error(`Failed to fetch updates by type: ${error.message}`)
    }

    return data
  }

  /**
   * Subscribe to real-time updates
   */
  static subscribeToUpdates(callback: (update: DashboardUpdate) => void) {
    return supabase
      .channel('dashboard_updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: DASHBOARD_UPDATES_TABLE
        },
        (payload) => {
          callback(payload.new as DashboardUpdate)
        }
      )
      .subscribe()
  }

  /**
   * Clean up old updates (calls the database function)
   */
  static async cleanupOldUpdates() {
    const { error } = await supabase.rpc('cleanup_old_dashboard_updates')

    if (error) {
      throw new Error(`Failed to cleanup old updates: ${error.message}`)
    }

    return true
  }
}