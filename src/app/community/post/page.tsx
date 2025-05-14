'use client';

import { useEffect, useRef } from 'react';

import { cn } from '@/utils/cn';

import SelectBox from '@components/common/SelectBox';

const data = [
  { value: '0', label: 'QnA' },
  { value: '1', label: '자유게시판' },
  { value: '2', label: '나눔' },
];

export default function Page() {
  const className = cn(
    'm-auto flex flex-col w-full',
    // 모바일
    'px-[1.25rem] py-[2.5rem]',
    // PC
    'md:w-full md:py-[3.75rem] md:px-[7.5rem]',
  );

  const editorRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const quillInstanceRef = useRef<any>(null);

  useEffect(() => {
    // CSS 불러오기
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href =
      'https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.bubble.css';
    document.head.appendChild(link);

    // Quill JS 불러오기
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.min.js';
    script.onload = () => {
      // Quill이 전역에 로드된 후 초기화
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const Quill = (window as any).Quill;
      if (Quill && editorRef.current) {
        // 에디터 인스턴스 생성
        quillInstanceRef.current = new Quill(editorRef.current, {
          placeholder: '내용을 입력하세요',
          theme: 'bubble',
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline'],
              [{ header: 1 }, { header: 2 }],
              ['link', 'image'],
              [{ list: 'ordered' }, { list: 'bullet' }],
            ],
          },
        });

        // 전체 영역 클릭시 에디터 포커스 처리
        const editorContainer = editorRef.current.parentElement;
        if (editorContainer) {
          editorContainer.addEventListener('click', () => {
            quillInstanceRef.current.focus();
          });
        }
      }
    };
    document.body.appendChild(script);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      const editorContainer = editorRef.current?.parentElement;
      if (editorContainer && quillInstanceRef.current) {
        editorContainer.removeEventListener('click', () => {
          quillInstanceRef.current.focus();
        });
      }
    };
  }, []);

  return (
    <form className={className}>
      <h1 className="title1 mb-[2rem] text-[#333]">게시글 작성하기</h1>
      <fieldset className="mb-[1.5rem] flex flex-col gap-[0.25rem]">
        <legend className="sr-only">제목 작성하기</legend>
        <label className="title2 text-[#333]" htmlFor={'title-input'}>
          {'제목'}
        </label>
        <input
          type="text"
          className="font-HappinessR h-[2.75rem] rounded-[0.625rem] border border-[#ddd] bg-[#fff] px-[0.75rem] py-[0.81rem] text-[0.875rem] placeholder-[#ccc]"
          id={'title-input'}
          name={'title'}
          // value={''}
          // onChange={onChange}
          placeholder={'제목을 입력하세요'}
        />
      </fieldset>
      <fieldset className="mb-[1.5rem] flex flex-col gap-[0.25rem]">
        <legend className="sr-only">카테고리 작성하기</legend>
        <label className="title2 text-[#333]" id="category">
          카테고리
        </label>
        <SelectBox
          aria-labelledby="category"
          placeholder="카테고리를 선택해 주세요."
          data={data}
          onChange={() => {}}
        />
      </fieldset>
      <fieldset className="mb-[1.5rem]">
        <legend className="sr-only">내용 작성하기</legend>
        <div
          className={cn(
            'editor-container cursor-text',
            'h-[15rem] md:h-[25rem]',
            'w-full rounded-[0.625rem] border-1 border-[#ddd] bg-[#fff] p-[0.75rem]',
          )}
        >
          <div
            id="content-input"
            ref={editorRef}
            className="font-HappinessR body1 h-full w-full p-0 leading-[1.375] tracking-[-0.02rem] text-[#333]"
          />
        </div>
      </fieldset>
    </form>
  );
}
