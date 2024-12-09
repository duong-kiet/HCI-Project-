
import { createClient } from '@supabase/supabase-js'
// Create a single supabase client for interacting with your database
export const db = createClient('https://cljphmfbwlqlihcopfjx.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsanBobWZid2xxbGloY29wZmp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzMDA3OTgsImV4cCI6MjA0ODg3Njc5OH0.nny-MYWyGTlNC290MgnOYIh3Xyntnttu8WvGLSa3e2k')