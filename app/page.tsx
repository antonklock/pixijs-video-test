"use server";

import LaunchedGame from "@/components/LaunchedGame";
import UnlaunchedGame from "@/components/UnlaunchedGame";

export default async function DateConditionalComponent() {
  const targetDate = new Date("2025-03-05T16:00:00+01:00");
  const currentDate = new Date();
  // const hasDatePassed = currentDate > targetDate;
  const hasDatePassed = true;

  if (hasDatePassed) {
    return <LaunchedGame />;
  } else {
    return <UnlaunchedGame />;
  }
}
