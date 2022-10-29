import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ylkjsepcmladipuoplpm.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlsa2pzZXBjbWxhZGlwdW9wbHBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjM2MDM2NDMsImV4cCI6MTk3OTE3OTY0M30.hVYoMop_HBq4Dw4hL56ADbNGbsSQt8_d3kEe0DqM570"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase