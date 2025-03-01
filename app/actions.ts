"use server";

export const getLaunched = async () => {
    const launchTime = new Date('2025-03-05T16:00:00+01:00');
    const now = new Date();
    const isLaunched = now >= launchTime;

    return isLaunched;
}