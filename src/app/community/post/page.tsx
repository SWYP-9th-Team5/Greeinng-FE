'use client';

import { useRef } from 'react';

import { cn } from '@/utils/cn';
import Image from 'next/image';

import Button from '@components/common/Button';
import CategorySelectField from '@components/features/community/post/CategorySelectField';
import ContentField from '@components/features/community/post/ContentField';
import TitleInputField from '@components/features/community/post/TitleInputField';
import useQuillEditor from '@components/features/community/post/hooks/useQuillEditor';
import useQuillImageUpload from '@components/features/community/post/hooks/useQuillImageUpload';

import useInputs from '@hooks/useInputs';

import { COMMUNITY_LIST } from '@constants/communityData';

export default function Page() {
  // 제목, 카테고리 입력
  const { inputs, onChangeValue } = useInputs({
    title: '',
    category: '',
  });
  const { title, category } = inputs;

  // 에디터 입력 및 script 불러오기
  const editorRef = useRef<HTMLDivElement | null>(null);
  const { quillInstanceRef } = useQuillEditor({ editorRef });

  // 이미지 핸들러
  const { fileInputRef, handleFileInputChange, handleImageButtonClick } =
    useQuillImageUpload(quillInstanceRef);

  return (
    <form
      className={cn(
        'm-auto flex w-full flex-col',
        // 모바일
        'px-[1.25rem] py-[2.5rem]',
        // PC
        'md:w-full md:px-[7.5rem] md:py-[3.75rem]',
      )}
    >
      <h1 className="title1 md:text-primary mb-[2rem] text-[#333] md:mb-[2.5rem]">
        게시글 작성하기
      </h1>
      <div className="mb-[1.5rem] grid gap-[1.5rem] md:grid-cols-[49.5625fr_24.1875fr] md:gap-[1.25rem]">
        <TitleInputField
          label="제목"
          name="title"
          value={title}
          placeholder="제목을 입력하세요"
          onChange={onChangeValue}
        />
        <CategorySelectField
          name="category"
          label="카테고리"
          placeholder="카테고리를 선택해 주세요"
          data={COMMUNITY_LIST}
          value={category}
          onChange={onChangeValue}
        />
      </div>
      <ContentField editorRef={editorRef} />
      <div className="flex justify-between">
        <Button
          type="button"
          color="gray"
          size="sm"
          className="body2 flex w-fit items-center justify-center gap-[0.25rem] px-4 py-[0.25rem] text-[#666]"
          onClick={handleImageButtonClick}
        >
          <Image
            src="/icons/image_upload.svg"
            alt="이미지 업로드 아이콘"
            width={14}
            height={14}
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            accept="image/*"
            className="hidden"
          />
          사진 업로드
        </Button>
        <Button
          type="submit"
          color="secondary"
          size="sm"
          className="body1 w-fit px-[1.16rem] py-1 text-[#fff]"
        >
          등록
        </Button>
      </div>
    </form>
  );
}
