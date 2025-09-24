import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Dashboard update types
export interface DashboardUpdate {
  id?: string
  type: string
  data: Record<string, any>
  ai_insights?: string
  timestamp?: string
  created_at?: string
}

// Database table name
export const DASHBOARD_UPDATES_TABLE = 'dashboard_updates'