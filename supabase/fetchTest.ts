import supabase from "./supabaseClient";

export async function fetchFirstRow() {
    const { data, error } = await supabase
        .from('game_sessions')
        .select('*')
        .limit(1) // Fetch only the first row
        .single();

    if (error) {
        console.error('Error fetching game session:', error);
        return null;
    }

    return data;
}
