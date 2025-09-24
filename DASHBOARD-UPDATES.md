# Dashboard Updates System

## Overview

The Dashboard Updates system provides real-time tracking and display of events, activities, and insights across the ISHE HQ Dashboard. Built with Supabase for real-time capabilities and PostgreSQL for reliable data storage.

## Features

✅ **Real-time Updates**: Live sync of dashboard events using Supabase subscriptions  
✅ **Flexible Data Storage**: JSONB field for storing arbitrary update data  
✅ **AI Insights**: Optional AI-generated insights for each update  
✅ **Type-based Organization**: Categorize updates by type for filtering  
✅ **Automatic Cleanup**: Configurable cleanup of old records (7-day default)  
✅ **Row Level Security**: Secure access with authenticated user policies  
✅ **Performance Optimized**: Indexes on timestamp and type fields  

## Database Schema

```sql
CREATE TABLE dashboard_updates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type VARCHAR(100) NOT NULL,
  data JSONB NOT NULL,
  ai_insights TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Quick Start

### 1. Database Setup

Run the migration script in your Supabase SQL Editor:

```bash
# Copy and paste the contents of:
scripts/dashboard-updates-migration.sql
```

### 2. Environment Configuration

Ensure your `.env.local` contains:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Test the Setup

```bash
npm run test:db
```

### 4. View the Demo

Navigate to `/dashboard-demo` in your application to see the interactive demo.

## Usage Examples

### Creating Updates

```typescript
import { DashboardUpdatesService } from '@/lib/dashboard-updates'

// Create a job completion update
await DashboardUpdatesService.createUpdate({
  type: 'job_completed',
  data: {
    jobId: 'JOB-001',
    customerId: 'CUST-123',
    status: 'completed',
    completedBy: 'Ian Smith',
    duration: '2 hours'
  },
  ai_insights: 'Job completed on time with no issues. Customer satisfaction high.'
})

// Create a system alert
await DashboardUpdatesService.createUpdate({
  type: 'system_alert',
  data: {
    level: 'warning',
    message: 'Server CPU usage above 80%',
    server: 'web-01',
    threshold: 80,
    current: 85
  },
  ai_insights: 'Consider scaling resources if this continues.'
})
```

### Reading Updates

```typescript
// Get recent updates
const recentUpdates = await DashboardUpdatesService.getRecentUpdates(20)

// Get updates by type
const jobUpdates = await DashboardUpdatesService.getUpdatesByType('job_completed', 10)

// Subscribe to real-time updates
const subscription = DashboardUpdatesService.subscribeToUpdates((update) => {
  console.log('New update received:', update)
  // Update your UI here
})

// Cleanup subscription
subscription.unsubscribe()
```

### React Hook Usage

```typescript
import { useDashboardUpdates } from '@/hooks/useDashboardUpdates'

function DashboardComponent() {
  const { updates, loading, error, addUpdate } = useDashboardUpdates(10)

  const handleNewUpdate = async () => {
    await addUpdate({
      type: 'user_action',
      data: { action: 'button_clicked', timestamp: Date.now() }
    })
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <button onClick={handleNewUpdate}>Add Update</button>
      {updates.map(update => (
        <div key={update.id}>
          <h3>{update.type}</h3>
          <pre>{JSON.stringify(update.data, null, 2)}</pre>
          {update.ai_insights && <p>{update.ai_insights}</p>}
        </div>
      ))}
    </div>
  )
}
```

## Update Types

Common update types you might use:

- `job_created` - New job scheduled
- `job_completed` - Job finished
- `task_assigned` - Task assigned to team member
- `customer_interaction` - Customer contact or feedback
- `system_alert` - System notifications or warnings
- `ai_insight` - AI-generated business insights
- `financial_update` - Revenue, invoice, or payment updates
- `inventory_change` - Stock level changes
- `user_action` - User activity tracking

## Security

The system includes Row Level Security (RLS) policies:

- **Authenticated users**: Full access (read/write/update/delete)
- **Anonymous users**: Read-only access for dashboard viewing
- **Service role**: Full administrative access

## Performance

Optimized for high-frequency updates:

- **Indexes**: `timestamp DESC` and `type` for fast queries
- **JSONB**: Efficient storage and querying of structured data
- **Real-time**: Low-latency updates via Supabase subscriptions
- **Cleanup**: Automatic removal of old records to maintain performance

## Cleanup and Maintenance

### Automatic Cleanup

The system includes a cleanup function that removes records older than 7 days:

```sql
-- Manual cleanup
SELECT cleanup_old_dashboard_updates();
```

### Scheduled Cleanup (Optional)

If your Supabase project has the `pg_cron` extension enabled:

```sql
-- Weekly cleanup every Sunday at midnight
SELECT cron.schedule('cleanup-dashboard-updates', '0 0 * * 0', 'SELECT cleanup_old_dashboard_updates();');
```

## API Reference

### DashboardUpdatesService

| Method | Description | Parameters |
|--------|-------------|------------|
| `createUpdate(update)` | Create a new update | `{ type, data, ai_insights? }` |
| `getRecentUpdates(limit?)` | Get recent updates | `limit: number (default: 50)` |
| `getUpdatesByType(type, limit?)` | Filter by type | `type: string, limit: number` |
| `subscribeToUpdates(callback)` | Real-time subscription | `callback: (update) => void` |
| `cleanupOldUpdates()` | Manual cleanup | None |

### React Hooks

- `useDashboardUpdates(limit)` - Main hook for dashboard updates
- `useDashboardUpdatesByType(type, limit)` - Filter updates by type

## Troubleshooting

### Common Issues

1. **Connection Failed**: Verify Supabase URL and keys in `.env.local`
2. **Table Not Found**: Run the migration script in Supabase SQL Editor
3. **Permission Denied**: Check RLS policies are properly configured
4. **Real-time Not Working**: Ensure table is added to `supabase_realtime` publication

### Testing

```bash
# Test database connection and operations
npm run test:db

# View interactive demo
# Navigate to /dashboard-demo in your browser
```

## Migration Notes

If upgrading from a previous version:

1. Run the migration script - it uses `CREATE TABLE IF NOT EXISTS`
2. Existing data will be preserved
3. New indexes and policies will be added
4. Real-time subscriptions will be enabled

---

For more information, see:
- [Supabase Documentation](https://supabase.com/docs)
- [Real-time Subscriptions](https://supabase.com/docs/guides/realtime)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)