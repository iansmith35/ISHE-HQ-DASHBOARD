-- Initialize Sample Data for ISHE CRM
-- Run this in Supabase SQL Editor (mydxasjicsfetnglbppp project)

-- Clear existing sample data (optional)
DELETE FROM tasks WHERE created_by = 'Rebecca AI';

-- Insert sample tasks for all business units
INSERT INTO tasks (
  title, 
  description, 
  business, 
  assigned_to, 
  due_date, 
  priority, 
  task_id, 
  task_name, 
  category, 
  created_by,
  status
) VALUES
('Finalize Q2 Gas Safety Report', 'Complete quarterly gas safety compliance report for all ISHE properties', 'ISHE', 'Ian Smith', '2025-09-30', 'high', 'TASK-001', 'Q2 Gas Safety Report', 'compliance', 'Rebecca AI', 'open'),
('Schedule EventSafe venue inspection', 'Inspect new venue for upcoming KinkyBrizzle event security requirements', 'EventSafe', 'Security Team', '2025-09-26', 'medium', 'TASK-002', 'Venue Inspection', 'security', 'Rebecca AI', 'open'),
('Update KinkyBrizzle product catalog', 'Add new merchandise to online catalog with proper age verification', 'KinkyBrizzle', 'Marketing Team', '2025-09-28', 'medium', 'TASK-003', 'Product Catalog Update', 'marketing', 'Rebecca AI', 'open'),
('Process outstanding invoices', 'Review and process pending client invoices across all business units', 'ISHE', 'Accounting', '2025-09-25', 'high', 'TASK-004', 'Invoice Processing', 'finance', 'Rebecca AI', 'open'),
('Customer follow-up calls', 'Contact recent gas certificate clients for renewal reminders', 'ISHE', 'Customer Service', '2025-09-27', 'medium', 'TASK-005', 'Customer Follow-up', 'customer_service', 'Rebecca AI', 'open');
-- Confirm data inserted
SELECT count(*) as total_tasks FROm tasks WHERE created_by = 'Rebecca AI';
SELECT distinct business as business_units FROM tasks WHERE created_by = 'Rebecca AI';