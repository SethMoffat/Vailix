import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tutkorxhxmmyhuguigvp.supabase.co';
const supabaseKey = 'the api keeeeeyyy';

const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
