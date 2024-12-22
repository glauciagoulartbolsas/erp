import { createClient } from '@supabase/supabase-js';

// Substitua pelos seus valores do Supabase
const supabaseUrl = 'https://nxxzebtikfyzyvqhntvd.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54eHplYnRpa2Z5enl2cWhudHZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ4MTc1MDIsImV4cCI6MjA1MDM5MzUwMn0.3hK5R7Ptf7AxKBb97YskqJbjtNT2UPCPyXjk2A4sYZc'; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
