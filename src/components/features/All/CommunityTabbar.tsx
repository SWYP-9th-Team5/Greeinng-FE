import Link from 'next/link';

import { COMMUNITY_LIST } from '@constants/communityData';

export const TabComponent = ({ type }: { type: string }) => {
  return (
    <div className="mb-4 flex items-center gap-4">
      {COMMUNITY_LIST.map(({ label, path }) => (
        <Link
          key={label}
          href={path}
          className={`title2 inline-flex items-center pb-1 text-center whitespace-nowrap ${
            type === path
              ? 'text-secondary border-secondary border-b-2'
              : 'text-[#666]'
          }`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
};
