import React from 'react';

import Link from 'next/link';

import { SIDEBAR_LIST } from '@constants/sidebar';

interface SidebarGroupProps {
  title: string;
  path: string;
  submenu: { id: string; name: string; path: string }[];
}

interface SidebarItemProps {
  id: string;
  path: string;
  name: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ id, path, name }) => {
  return (
    <li key={id} role="menuitem">
      <Link className="body1 text-[#666]" href={path}>
        {name}
      </Link>
    </li>
  );
};

const SidebarGroup: React.FC<SidebarGroupProps> = ({
  title,
  path,
  submenu,
}) => {
  return (
    <li role="menuitem" key={title}>
      <Link
        href={path}
        className="font-NanumSquareRoundB mb-[1rem] block tracking-[-0.02rem]"
      >
        {title}
      </Link>
      {submenu.length > 0 && (
        <ul role="menu" className="mb-[1.5rem] flex flex-col gap-4 pl-[1rem]">
          {submenu.map((linkItem) => {
            const { id, name, path } = linkItem;
            return <SidebarItem key={id} id={id} name={name} path={path} />;
          })}
        </ul>
      )}
    </li>
  );
};

export default function SidebarNav() {
  return (
    <nav role="navigation" aria-label="사이드 메뉴">
      <ul role="menu">
        {SIDEBAR_LIST.map((item) => {
          const { title, path, children } = item;
          return (
            <SidebarGroup
              key={title}
              title={title}
              path={path}
              submenu={children}
            />
          );
        })}
      </ul>
    </nav>
  );
}
