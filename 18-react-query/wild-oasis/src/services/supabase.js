import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://onnptmnzqsdrtgprhjuu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ubnB0bW56cXNkcnRncHJoanV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYzNTQzOTAsImV4cCI6MjAxMTkzMDM5MH0.uI0XNzJc0lWwtU8VyUhotTwBY50P9xv38YRc8c3bPeU";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
