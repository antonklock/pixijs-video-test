// import { PostgrestResponse } from '@supabase/supabase-js';
// import { createClient } from "@/supabase/supabaseServer";
// import { GameSession } from '@/types';

// interface Hitbox {
//     name: string;
//     color: number;
//     x: number;
//     y: number;
//     width: number;
//     height: number;
//     onHit: () => void;
//     isLoaded: boolean;
//     isActive: boolean;
//     activationIntervals: {
//         start: number;
//         end: number;
//     }[];
// }

// export async function saveGameSession(gameSession: GameSession): Promise<PostgrestResponse<any> | null> {
//     const supabase = await createClient();
//     const { data, error } = await supabase
//         .from('game_sessions')
//         .insert([{
//             started_scenes: Array.from(gameSession.startedScenes),
//             session: gameSession.session
//         }]);

//     if (error) {
//         console.error('Error saving game session:', error);
//         return null;
//     }

//     return data;
// }

// export default saveGameSession;
