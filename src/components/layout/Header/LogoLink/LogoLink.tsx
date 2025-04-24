import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

interface LogoLink {
  href: string;
  width?: number;
  height?: number;
  src: string | StaticImageData;
}

const LogoLink = ({ href, width, height, src }: LogoLink) => {
  return (
    <Link href={href}>
      <Image
        width={width}
        height={height}
        src={src}
        alt="greening logo"
        priority
      />
    </Link>
  );
};

export default LogoLink;
