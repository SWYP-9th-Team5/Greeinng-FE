import ProfileIcon from '@assets/icons/person.svg';
import Link from 'next/link';

interface LoginButtonProps {
  href: string;
  text: string;
}

export default function LoginLink({ href, text }: LoginButtonProps) {
  return (
    <Link
      href={href}
      className="font-NanumSquareRoundB flex items-center gap-[0.25rem] text-[1.125rem] whitespace-nowrap text-[#666]"
    >
      <ProfileIcon />
      {text}
    </Link>
  );
}
