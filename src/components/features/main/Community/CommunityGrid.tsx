'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Nocontents } from '@components/features/community/common/NoContents/NoContents';

import { CommunityButton } from '../Buttonlink';
import type { PostItem } from './MainTabbar';

interface CommunityDataProps {
  data: PostItem[];
  label: string;
}

export function CommunityGrid({ data, label }: CommunityDataProps) {
  return data.length === 0 ? (
    <Nocontents />
  ) : (
    <>
      <div className="block md:hidden">
        <MBCommunityGrid data={data} label={label} />
      </div>
      <div className="hidden md:block">
        <PCCommunityGrid data={data} label={label} />
      </div>
    </>
  );
}

function PCCommunityGrid({ data, label }: CommunityDataProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 grid grid-cols-3 gap-4">
        {data.map((item) => (
          <div
            key={item.postId}
            onClick={() => router.push(`/community/${item.postId}`)}
            className="bg-tertiary relative h-[27vh] w-[28vw] cursor-pointer rounded-[1.25rem] p-4"
          >
            <p className="body2 text-[#eee]">{label}</p>
            <p className="subTitle text-text mb-4 overflow-hidden break-words text-ellipsis whitespace-nowrap">
              {item.title}
            </p>
            <p className="body1 text-text mb-4 line-clamp-3 break-words">
              {item.content}
            </p>
            <div className="absolute bottom-4 flex flex-row items-center">
              <Image
                src="/icons/heart.svg"
                alt="좋아요"
                width={18}
                height={18}
                className="mr-1"
              />
              <p className="body1 text-text mr-3">{item.likeCount}</p>
              <Image
                src="/icons/message.svg"
                alt="댓글"
                width={18}
                height={18}
                className="mr-1"
              />
              <p className="body1 text-text">{item.commentCount}</p>
            </div>
          </div>
        ))}
      </div>
      <CommunityButton />
    </div>
  );
}

function MBCommunityGrid({ data, label }: CommunityDataProps) {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex flex-col gap-2">
        {data.slice(0, 5).map((item) => (
          <div
            key={item.postId}
            onClick={() => router.push(`/community`)}
            className="bg-tertiary h-[77px] w-[90vw] rounded-[0.625rem] p-4"
          >
            <p className="body2 text-[#eee]">{label}</p>
            <div className="flex flex-row items-center justify-between">
              <p className="subTitle text-text overflow-hidden break-words text-ellipsis whitespace-nowrap">
                {item.title}
              </p>
              <div className="ml-2 flex flex-shrink-0 flex-row">
                <Image
                  src="/icons/heart.svg"
                  alt="좋아요"
                  width={14}
                  height={14}
                  className="mr-1"
                />
                <p className="body1 text-text mr-3">{item.likeCount}</p>
                <Image
                  src="/icons/message.svg"
                  alt="댓글"
                  width={16}
                  height={16}
                  className="mr-1"
                />
                <p className="body1 text-text">{item.commentCount}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <CommunityButton />
    </div>
  );
}
