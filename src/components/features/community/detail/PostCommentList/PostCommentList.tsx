import { cn } from '@/utils/cn';

import { CommentItem } from '@apis/data/community';

const PostCommentItem = ({
  userName,
  comment,
  createdAt,
  isWriter,
  commentId,
  handleDeleteComment,
}: CommentItem & {
  handleDeleteComment: (commentId: number) => void;
}) => {
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
          'font-HappinessR w-full leading-[1.375] tracking-[-0.0175rem] break-words whitespace-pre-line text-[#333]',
          'md:text-[1rem] md:leading-[1.375] md:tracking-[-0.02rem]',
        )}
      >
        {comment}
      </p>
      <div className={cn('body2 flex gap-[0.8125rem] text-[#999]', 'md:gap-3')}>
        <time>{createdAt}</time>
        {isWriter && (
          <button onClick={() => handleDeleteComment(commentId)}>삭제</button>
        )}
      </div>
    </li>
  );
};

export default function PostCommentList({
  data,
  handleDeleteComment,
}: {
  data: CommentItem[];
  handleDeleteComment: (commentId: number) => void;
}) {
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
            handleDeleteComment={handleDeleteComment}
          />
        );
      })}
    </ul>
  );
}
