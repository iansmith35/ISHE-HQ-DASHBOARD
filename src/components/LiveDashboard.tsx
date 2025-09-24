'use client'

import React from 'react'
import { useRealtimeDashboard } from '../hooks/useRealtimeDashboard'

export default function LiveDashboard() {
  const { updates, isConnected, error, sendTestUpdate } = useRealtimeDashboard()

  const handleTestUpdate = () => {
    sendTestUpdate({
      metric: 'user_engagement',
      value: Math.floor(Math.random() * 100),
      timestamp: new Date().toISOString()
    })
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Connection Status */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">ISHE HQ Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${
              isConnected ? 'bg-green-500' : 'bg-red-500'
            }`} />
            <span className="text-sm">
              {isConnected ? 'Live Connected' : 'Disconnected'}
            </span>
          </div>
          <button
            onClick={handleTestUpdate}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Send Test Update
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          Error: {error}
        </div>
      )}

      {/* Live Updates Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Real-time Updates */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            Live Updates ({updates.length})
          </h2>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {updates.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No updates yet. Click "Send Test Update" to start.
              </p>
            ) : (
              updates.map((update) => (
                <div key={update.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-gray-900">
                      {update.type.replace(/_/g, ' ').toUpperCase()}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(update.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  
                  {/* Data Preview */}
                  <div className="text-sm text-gray-600 mb-2">
                    <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
                      {JSON.stringify(update.data, null, 2)}
                    </pre>
                  </div>
                  
                  {/* AI Insights */}
                  {update.ai_insights && (
                    <div className="bg-blue-50 border border-blue-200 p-3 rounded">
                      <p className="text-xs font-medium text-blue-800 mb-1">
                        🤖 AI Insights:
                      </p>
                      <p className="text-sm text-blue-700">
                        {update.ai_insights}
                      </p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Dashboard Metrics */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Dashboard Metrics</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg">
              <h3 className="text-sm font-medium opacity-90">Total Updates</h3>
              <p className="text-2xl font-bold">{updates.length}</p>
            </div>
            
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg">
              <h3 className="text-sm font-medium opacity-90">Connection</h3>
              <p className="text-lg font-semibold">
                {isConnected ? '🟢 Live' : '🔴 Offline'}
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg">
              <h3 className="text-sm font-medium opacity-90">AI Insights</h3>
              <p className="text-2xl font-bold">
                {updates.filter(u => u.ai_insights).length}
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-lg">
              <h3 className="text-sm font-medium opacity-90">Last Update</h3>
              <p className="text-sm font-medium">
                {updates.length > 0 
                  ? new Date(updates[0].timestamp).toLocaleTimeString()
                  : 'Never'
                }
              </p>
            </div>
          </div>
          
          {/* Recent Activity Chart */}
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">Activity Timeline</h3>
            <div className="space-y-2">
              {updates.slice(0, 5).map((update, index) => (
                <div key={update.id} className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    index === 0 ? 'bg-green-500' : 'bg-gray-400'
                  }`} />
                  <span className="text-sm text-gray-600">
                    {update.type.replace(/_/g, ' ')} - {new Date(update.timestamp).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
        <h3 className="font-medium text-gray-900 mb-2">🎯 Dashboard Status</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>✅ Real-time Supabase connection active</li>
          <li>✅ AI-powered insights enabled</li>
          <li>✅ Webhook processing ready</li>
          <li>✅ Live data updates streaming</li>
        </ul>
        <p className="text-xs text-gray-500 mt-2">
          Use "Send Test Update" to simulate real-time data or trigger updates via webhook endpoints.
        </p>
      </div>
    </div>
  )
}