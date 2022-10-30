export const generateId = (): string => Math.random().toString(36).slice(-6);
export const generateUniqueKey = (value: string | number): string => `${value}_${new Date().getTime()}`;