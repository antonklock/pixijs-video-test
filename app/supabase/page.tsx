import { createClient } from "@/supabase/supabaseServer";

export default async function SupabaseApp() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("test-table")
    .select("*")
    .limit(10); // Increased limit to see more data when it exists

  console.log("Query result:", data);
  if (error) console.error("Query error:", error);

  return (
    <div className="bg-black text-white p-4">
      <p>Supabase Connection</p>
      {error ? (
        <div className="text-red-500">Error: {error.message}</div>
      ) : data && data.length > 0 ? (
        <>
          <p className="text-green-500 mb-2">
            Successfully connected and found {data.length} records:
          </p>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </>
      ) : (
        <div className="text-yellow-500">
          <p>Successfully connected to the table, but no data found.</p>
          <p>
            You might want to insert some test data to verify everything works.
          </p>
        </div>
      )}
    </div>
  );
}
