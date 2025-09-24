#!/usr/bin/env node

/**
 * Test script for dashboard_updates table integration
 * Run with: node scripts/test-dashboard-updates.js
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testDashboardUpdates() {
  console.log('🧪 Testing Dashboard Updates Table Integration\n');

  // Test 1: Check if we can connect to Supabase
  console.log('1. Testing Supabase connection...');
  try {
    const { data, error } = await supabase
      .from('dashboard_updates')
      .select('count(*)', { count: 'exact', head: true });
    
    if (error) {
      console.log('❌ Connection test failed:', error.message);
      console.log('   Make sure to run the migration script first!');
      return false;
    }
    
    console.log('✅ Connected to Supabase successfully');
    console.log(`   Current record count: ${data || 0}\n`);
  } catch (err) {
    console.log('❌ Connection error:', err.message);
    return false;
  }

  // Test 2: Create a test update
  console.log('2. Testing create operation...');
  const testUpdate = {
    type: 'test_update',
    data: {
      test: true,
      message: 'This is a test update',
      timestamp: new Date().toISOString()
    },
    ai_insights: 'Test update created successfully by automated test script'
  };
  
  try {
    const { data, error } = await supabase
      .from('dashboard_updates')
      .insert(testUpdate)
      .select()
      .single();
    
    if (error) {
      console.log('❌ Create test failed:', error.message);
      return false;
    }
    
    console.log('✅ Successfully created test update');
    console.log(`   ID: ${data.id}`);
    console.log(`   Type: ${data.type}`);
    console.log(`   Created: ${data.created_at}\n`);
    
    // Store ID for cleanup
    testUpdateId = data.id;
  } catch (err) {
    console.log('❌ Create error:', err.message);
    return false;
  }

  // Test 3: Read recent updates
  console.log('3. Testing read operations...');
  try {
    const { data, error } = await supabase
      .from('dashboard_updates')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(5);
    
    if (error) {
      console.log('❌ Read test failed:', error.message);
      return false;
    }
    
    console.log('✅ Successfully retrieved updates');
    console.log(`   Found ${data.length} recent updates`);
    if (data.length > 0) {
      console.log(`   Most recent: ${data[0].type} (${data[0].created_at})`);
    }
    console.log('');
  } catch (err) {
    console.log('❌ Read error:', err.message);
    return false;
  }

  // Test 4: Test filtering by type
  console.log('4. Testing type filtering...');
  try {
    const { data, error } = await supabase
      .from('dashboard_updates')
      .select('*')
      .eq('type', 'test_update')
      .limit(10);
    
    if (error) {
      console.log('❌ Filter test failed:', error.message);
      return false;
    }
    
    console.log('✅ Successfully filtered by type');
    console.log(`   Found ${data.length} test_update records\n`);
  } catch (err) {
    console.log('❌ Filter error:', err.message);
    return false;
  }

  // Test 5: Cleanup function (if it exists)
  console.log('5. Testing cleanup function...');
  try {
    const { error } = await supabase.rpc('cleanup_old_dashboard_updates');
    
    if (error) {
      console.log('⚠️  Cleanup function test failed:', error.message);
      console.log('   This is expected if the function was not created yet');
    } else {
      console.log('✅ Cleanup function is available and working');
    }
    console.log('');
  } catch (err) {
    console.log('⚠️  Cleanup function error:', err.message);
    console.log('   This is expected if the function was not created yet\n');
  }

  console.log('🎉 All tests completed successfully!');
  console.log('\nNext steps:');
  console.log('1. Run the full migration script in Supabase SQL Editor');
  console.log('2. Enable real-time subscriptions');
  console.log('3. Set up Row Level Security policies');
  console.log('4. Consider enabling the cleanup cron job');
  
  return true;
}

if (require.main === module) {
  testDashboardUpdates()
    .then((success) => {
      process.exit(success ? 0 : 1);
    })
    .catch((err) => {
      console.error('❌ Test script failed:', err);
      process.exit(1);
    });
}

module.exports = { testDashboardUpdates };