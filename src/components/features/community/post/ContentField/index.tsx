import { RefObject } from 'react';

import { cn } from '@/utils/cn';

interface ContentFieldProps {
  editorRef: RefObject<HTMLDivElement | null>;
  className?: string;
}

export default function ContentField({
  editorRef,
  className,
}: ContentFieldProps) {
  return (
    <fieldset className={cn('mb-[1rem] md:mb-[1.5rem]', className)}>
      <legend className="sr-only">내용 작성하기</legend>
      <div
        className={cn(
          'editor-container cursor-text',
          'h-[15rem] md:h-[25rem]',
          'rounded-[0.625rem] border-1 border-[#ddd] bg-[#fff]',
        )}
      >
        <div
          ref={editorRef}
          className="h-full overflow-auto p-[0.75rem] break-words whitespace-pre-wrap md:px-[1rem]"
        />
      </div>
    </fieldset>
  );
}
