import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tutkorxhxmmyhuguigvp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInR1dGtvcnhoeG1teWh1Z3VpZ3ZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY1NDAyNzMsImV4cCI6MjA0MjExNjI3M30.Q4HiSg8mY-ss00c13xwR_rsB1l8xKBKqK9Xe6o2euZY';
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase }; // Add this line to export the supabase client