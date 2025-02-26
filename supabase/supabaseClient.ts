import { createClient } from '@/supabase/supabaseServer';

export default async function SupabaseClient() {
    const supabase = await createClient();
    // const { data } = await supabase.from("test-table").select();

    // console.log(data);

    return null
}