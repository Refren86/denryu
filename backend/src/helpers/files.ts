import path from 'node:path';

// 1st - avatar.jpg, 2nd - user/car etc, 3rd - userId, carId etc
export const buildFileName = (fileName: string, itemType: string, itemId: string) => {
  const extName = path.extname(fileName); // avatar.jpg => .jpg
  return `${itemType}/${itemId}/${crypto.randomUUID()}${extName}`;
};
