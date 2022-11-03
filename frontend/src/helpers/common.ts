const generateId = (): string => Math.random().toString(36).slice(-6);
const generateUniqueKey = (value: string | number): string => `${value}_${new Date().getTime()}`;

export {
  generateId,
  generateUniqueKey,
}