import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sqclgvuwzhcqwpkeggav.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxY2xndnV3emhjcXdwa2VnZ2F2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU3NjM5MTYsImV4cCI6MjA1MTMzOTkxNn0.onPS8pjY1QoH_xcAoXA39nG8vKjzPkB_j6vvpgIC_lE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false
  }
})