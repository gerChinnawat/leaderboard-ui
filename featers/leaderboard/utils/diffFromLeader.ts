import { toMillisecond } from "./toMillisecond";

export const diffFromLeader = (timeStampLeader: string, currentTimeStamp: string) => {
    const leaderMs = toMillisecond(timeStampLeader);
    const currentMs = toMillisecond(currentTimeStamp);
    const diffMs = currentMs - leaderMs;
    const min = Math.floor(diffMs / 60000);
    const sec = ((diffMs - min * 60000) / 1000).toFixed(3);
    return `${min}:${sec.padStart(6, "0")}`;
}