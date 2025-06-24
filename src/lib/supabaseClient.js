import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://iwewirmlkwuvgfqttftr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3ZXdpcm1sa3d1dmdmcXR0ZnRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3NzU1OTMsImV4cCI6MjA2NjM1MTU5M30.LuOOHfFysvAH65b3ZcPMslh6_X77tG7mKBG_Pou_a8w';
export const supabase = createClient(supabaseUrl, supabaseKey);