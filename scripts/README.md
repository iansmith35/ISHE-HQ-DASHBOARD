# Database Scripts

This directory contains SQL scripts for setting up and managing the ISHE HQ Dashboard database.

## Dashboard Updates Table Setup

### 1. Run the Migration Script

Execute the following script in your Supabase SQL Editor:

```sql
-- File: dashboard-updates-migration.sql
```

This script will:
- Create the `dashboard_updates` table with proper schema
- Enable Row Level Security (RLS)
- Set up authentication policies for secure access
- Create performance indexes
- Enable real-time subscriptions
- Add a cleanup function for old records

### 2. Environment Variables

Make sure your `.env.local` file contains:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Optional: Enable Scheduled Cleanup

If you have the `pg_cron` extension enabled in your Supabase project, you can uncomment the last line in the migration script to enable weekly cleanup of old records:

```sql
SELECT cron.schedule('cleanup-dashboard-updates', '0 0 * * 0', 'SELECT cleanup_old_dashboard_updates();');
```

## Table Schema

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key, auto-generated |
| type | VARCHAR(100) | Type of dashboard update |
| data | JSONB | Update data as JSON |
| ai_insights | TEXT | Optional AI-generated insights |
| timestamp | TIMESTAMPTZ | When the update occurred |
| created_at | TIMESTAMPTZ | When the record was created |

## Usage

Use the `DashboardUpdatesService` class in your TypeScript code:

```typescript
import { DashboardUpdatesService } from '@/lib/dashboard-updates'

// Create an update
await DashboardUpdatesService.createUpdate({
  type: 'job_completed',
  data: { jobId: 'JOB-001', status: 'completed' },
  ai_insights: 'Job completed successfully with no issues'
})

// Get recent updates
const updates = await DashboardUpdatesService.getRecentUpdates(10)

// Subscribe to real-time updates
DashboardUpdatesService.subscribeToUpdates((update) => {
  console.log('New update:', update)
})
```