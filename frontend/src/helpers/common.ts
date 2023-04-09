// Currently no use for these guys
// const generateId = (): string => Math.random().toString(36).slice(-6);
// const generateUniqueKey = (value: string | number): string => `${value}_${new Date().getTime()}`;

const classNames = (...classes: any[]): string =>
  classes.filter(Boolean).join(' ');

export { classNames };
