"use client";

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useDashboardUpdates } from '@/hooks/useDashboardUpdates';

/**
 * Demo page showing dashboard_updates table integration
 */
export default function DashboardDemoPage() {
  const { updates, loading, error, addUpdate } = useDashboardUpdates(20);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddSampleUpdate = async () => {
    setIsAdding(true);
    try {
      await addUpdate({
        type: 'demo_update',
        data: {
          message: 'Sample dashboard update',
          timestamp: new Date().toISOString(),
          user: 'Demo User'
        },
        ai_insights: 'This is a demonstration of the dashboard updates system.'
      });
    } catch (err) {
      console.error('Failed to add update:', err);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header title="Dashboard Updates Demo" />
      <main className="flex-1 p-6 space-y-6">
        
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle>Dashboard Updates Table Integration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>This page demonstrates the dashboard_updates table integration with Supabase.</p>
            <Button 
              onClick={handleAddSampleUpdate} 
              disabled={isAdding}
              className="bg-primary/90 hover:bg-primary text-primary-foreground"
            >
              {isAdding ? 'Adding...' : 'Add Sample Update'}
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardHeader>
            <CardTitle>Recent Updates</CardTitle>
          </CardHeader>
          <CardContent>
            {loading && <p>Loading updates...</p>}
            {error && <p className="text-destructive">Error: {error}</p>}
            
            {updates && updates.length > 0 ? (
              <div className="space-y-4">
                {updates.map((update) => (
                  <div 
                    key={update.id} 
                    className="border border-border/60 rounded-lg p-4 bg-card/50"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-primary">{update.type}</span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(update.timestamp || '').toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="mb-2">
                      <strong>Data:</strong>
                      <pre className="text-sm text-muted-foreground mt-1 bg-muted/50 p-2 rounded">
                        {JSON.stringify(update.data, null, 2)}
                      </pre>
                    </div>
                    
                    {update.ai_insights && (
                      <div>
                        <strong>AI Insights:</strong>
                        <p className="text-sm text-muted-foreground mt-1">{update.ai_insights}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              !loading && <p>No updates found. Add a sample update to see how it works!</p>
            )}
          </CardContent>
        </Card>
        
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle>Setup Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>To set up the dashboard_updates table:</p>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Run the SQL script: <code className="bg-muted/50 px-1 rounded">scripts/dashboard-updates-migration.sql</code></li>
              <li>Configure your environment variables in <code className="bg-muted/50 px-1 rounded">.env.local</code></li>
              <li>The table will support real-time updates and include RLS policies</li>
              <li>Use the <code className="bg-muted/50 px-1 rounded">DashboardUpdatesService</code> to interact with the data</li>
            </ol>
          </CardContent>
        </Card>
        
      </main>
    </div>
  );
}