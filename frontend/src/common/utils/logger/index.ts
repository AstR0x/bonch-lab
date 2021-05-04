type LoggerType = (...data: unknown[]) => void;

export const logger: LoggerType = (...data) => console.log(data);
