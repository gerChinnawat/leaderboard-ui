export const toTimeStampForm = (timeStamp: string) => {
    return `${timeStamp[0]}:${timeStamp.slice(1,3)}.${timeStamp.slice(3,6)}`
};