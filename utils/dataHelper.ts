export function generateRandomFullName(): string {
  const firstName = 'AUTO';
  const lastName = getRandomChars(4);
  return `${firstName} ${lastName}`;
}

export function generateRandomCompanyName(): string {
  const prefix = 'AUTO_CORP_';
  const randomChar = getRandomChars(4);
  return `${prefix}${randomChar}`;
}

export function generateRandomEmail(): string {
  const prefix = 'peternew2016';
  const randomChar = getRandomChars(4);
  return `${prefix}+${randomChar}@gmail.com`;
}

function getRandomChars(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * chars.length);
    result += chars[index];
  }
  return result;
}
