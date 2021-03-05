export const decodeBase64 = (val: string) =>
  Buffer.from(val, 'base64').toString('utf8');
