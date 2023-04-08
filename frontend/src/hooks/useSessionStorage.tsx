import { useEffect, useState } from 'react';

const PREFIX = 'denryu-';

export const useSessionStorage = (key: string, initialValue: any) => {
  const prefixedKey = PREFIX + key;

  const [value, setValue] = useState(() => {
    const item = sessionStorage.getItem(prefixedKey);
    return item ? JSON.parse(item) : initialValue;
  });

  useEffect(() => {
    sessionStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
