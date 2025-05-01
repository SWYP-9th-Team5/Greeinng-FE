'use client';

import { cn } from '@/utils/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type HeaderTabItemProps = {
  href: string;
  name: string;
};

const HeaderTabItem = ({ href, name }: HeaderTabItemProps) => {
  const pathname = usePathname();
  const isActivve = pathname.includes(href);

  return (
    <li
      className={cn([
        'hover:text-primary font-NanumSquareRoundB text-[1.125rem] font-normal whitespace-nowrap text-[#666]',
        isActivve && 'text-primary',
      ])}
    >
      <Link href={href}>{name}</Link>
    </li>
  );
};

export default function HeaderTab({
  tabList,
}: {
  tabList: HeaderTabItemProps[];
}) {
  return (
    <ul className="flex gap-[3.125rem]">
      {tabList.map((tabValue) => {
        const { href, name } = tabValue;
        return <HeaderTabItem key={href} href={href} name={name} />;
      })}
    </ul>
  );
}
