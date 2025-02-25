import { fetchFirstRow } from "@/supabase/fetchTest";
import { useEffect, useState } from "react";

export default function SupabaseTest() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchFirstRow();
      setData(data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Supabase Test</h1>
      <p className="text-white">{data}</p>
    </div>
  );
}
