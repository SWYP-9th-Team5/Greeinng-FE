import { cn } from '@/utils/cn';

type Comment = {
  commentId: number;
  userId: number;
  userName: string;
  comment: string;
  createdAt: string; // 날짜 문자열 ISO 8601 (e.g., '2025-05-12')
  isWriter: boolean;
};

const PostCommentItem = ({
  userName,
  comment,
  createdAt,
  isWriter,
}: Comment) => {
  return (
    <li className={cn('flex flex-col gap-1', 'md:gap-2')}>
      <span
        className={cn(
          'font-HappinessB text-[0.875rem] leading-[1.5714] tracking-[-0.0175rem] text-[#333]',
          'md:text-[1rem] md:leading-[1.375] md:tracking-[-0.02rem]',
        )}
      >
        {userName}
      </span>
      <p
        className={cn(
          'font-HappinessR leading-[1.375] tracking-[-0.0175rem] whitespace-pre-line text-[#333]',
          'md:text-[1rem] md:leading-[1.375] md:tracking-[-0.02rem]',
        )}
      >
        {comment}
      </p>
      <div className={cn('body2 flex gap-[0.8125rem] text-[#999]', 'md:gap-3')}>
        <time>{createdAt}</time>
        {isWriter && <button>삭제</button>}
      </div>
    </li>
  );
};

export default function PostCommentList() {
  const data = [
    {
      commentId: 1,
      userId: 2,
      userName: '다육이 집사',
      comment: '안녕하세요.\n 물을 너무 많이 주거나 적게 주면 그럴 수 있어요!',
      createdAt: '2025-05-12',
      isWriter: true,
    },
    {
      commentId: 2,
      userId: 3,
      userName: '초보식집사',
      comment:
        '혹시 그럼 어느 정도로 줘야 적당할까요..? 일주일에 한 번이면 많은 편인가요?',
      createdAt: '2025-05-12',
      isWriter: false,
    },
  ];

  return (
    <ul className={cn('mb-5 flex w-full flex-col gap-6', 'md:mb-8 md:gap-5')}>
      <h2 className="sr-only">댓글 목록</h2>
      {/* 댓글이 없을 경우 예외처리 (디자인 요청) */}
      {data.map((item) => {
        const { commentId, userId, userName, comment, createdAt, isWriter } =
          item;
        return (
          <PostCommentItem
            key={commentId}
            commentId={commentId}
            userId={userId}
            userName={userName}
            comment={comment}
            createdAt={createdAt}
            isWriter={isWriter}
          />
        );
      })}
    </ul>
  );
}
