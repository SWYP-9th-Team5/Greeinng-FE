import { RefObject } from 'react';

import { cn } from '@/utils/cn';

interface ContentFieldProps {
  editorRef: RefObject<HTMLDivElement | null>;
}

export default function ContentField({ editorRef }: ContentFieldProps) {
  return (
    <fieldset className="mb-[1rem] md:mb-[1.5rem]">
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
