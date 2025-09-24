-- Create dashboard_updates table in Supabase
CREATE TABLE IF NOT EXISTS dashboard_updates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type VARCHAR(100) NOT NULL,
  data JSONB NOT NULL,
  ai_insights TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE dashboard_updates ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (adjust based on your auth needs)
CREATE POLICY "Enable all operations for authenticated users" ON dashboard_updates
  FOR ALL USING (auth.role() = 'authenticated');

-- Create policy for anonymous reads (for dashboard viewing)
CREATE POLICY "Enable read for anonymous users" ON dashboard_updates
  FOR SELECT USING (true);

-- Create indexes for better performance
CREATE INDEX idx_dashboard_updates_timestamp ON dashboard_updates (timestamp DESC);
CREATE INDEX idx_dashboard_updates_type ON dashboard_updates (type);

-- Enable real-time subscriptions
ALTER PUBLICATION supabase_realtime ADD TABLE dashboard_updates;

-- Create a function to clean up old records (optional)
CREATE OR REPLACE FUNCTION cleanup_old_dashboard_updates()
RETURNS void AS $$
BEGIN
  DELETE FROM dashboard_updates 
  WHERE timestamp < NOW() - INTERVAL '7 days';
END;
$$ LANGUAGE plpgsql;

-- Create a scheduled job to run cleanup weekly (requires pg_cron extension)
-- SELECT cron.schedule('cleanup-dashboard-updates', '0 0 * * 0', 'SELECT cleanup_old_dashboard_updates();');