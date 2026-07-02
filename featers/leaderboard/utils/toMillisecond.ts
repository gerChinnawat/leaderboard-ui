export const toMillisecond = (timeStamp: string): number => {
    const [min, sec] = timeStamp.split(":");
    return Number(min) * 60000 + Number(sec) * 1000;
};
