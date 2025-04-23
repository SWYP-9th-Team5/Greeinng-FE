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
      <Image src="/icons/person.svg" alt="로그인 버튼" width={24} height={24} />
      {text}
    </Link>
  );
}
