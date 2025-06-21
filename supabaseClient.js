
import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dlscchelehlbgnppjgtt.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsc2NjaGVsZWhsYmducHBqZ3R0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxNzI1MDMsImV4cCI6MjA2NTc0ODUwM30.WGQtmFoIXmIa1NzMuGhKLOGVht_OcOp-Xl_4jL9GR_Q'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
