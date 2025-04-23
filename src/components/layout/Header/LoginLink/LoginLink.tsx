import ProfileIcon from '@assets/icons/person.svg';
import Image from 'next/image';
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
      <Image
        src={ProfileIcon}
        alt="로그인 페이지 이동"
        width={20}
        height={20}
      />
      {text}
    </Link>
  );
}
