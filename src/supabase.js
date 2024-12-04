import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://sijabvgveoulslsmjege.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpamFidmd2ZW91bHNsc21qZWdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE3NzY1MDUsImV4cCI6MjA0NzM1MjUwNX0.8fCPG1QWWWGR0eInUD4j9zQdvKeVu5i0yzjC2G6Zh9o";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);