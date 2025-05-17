import { headers } from 'next/headers';

export async function isMobileUserAgent(): Promise<boolean> {
  const userAgent = (await headers()).get('user-agent') || '';
  return /mobile/i.test(userAgent);
}
