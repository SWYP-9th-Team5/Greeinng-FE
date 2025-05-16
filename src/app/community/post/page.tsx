'use client';

import { useRef } from 'react';

import { cn } from '@/utils/cn';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Button from '@components/common/Button';
import CategorySelectField from '@components/features/community/post/CategorySelectField';
import ContentField from '@components/features/community/post/ContentField';
import TitleInputField from '@components/features/community/post/TitleInputField';
import useQuillEditor from '@components/features/community/post/hooks/useQuillEditor';
import useQuillImageUpload, {
  UploadFiles,
} from '@components/features/community/post/hooks/useQuillImageUpload';

import useCommunityMutation from '@apis/mutations/community/useCommunityMutation';

import useInputs from '@hooks/useInputs';

import { COMMUNITY_LIST } from '@constants/communityData';

import {
  QuillDeltaInsert,
  calBuildFormData,
  calImageUrls,
  calIsDisabledSubmitBtn,
} from './utils';

export default function Page() {
  const router = useRouter();

  // * 제목, 카테고리
  const { inputs, onChangeValue } = useInputs({
    title: '',
    category: '',
  });
  const { title, category } = inputs;
  const TitleField = (
    <TitleInputField
      label="제목"
      name="title"
      value={title}
      placeholder="제목을 입력하세요"
      onChange={onChangeValue}
    />
  );
  const CategoryField = (
    <CategorySelectField
      name="category"
      label="카테고리"
      placeholder="카테고리를 선택해 주세요"
      data={COMMUNITY_LIST}
      value={category}
      onChange={onChangeValue}
    />
  );

  // * 에디터 입력 및 script 불러오기
  const editorRef = useRef<HTMLDivElement | null>(null);
  const { quillInstanceRef } = useQuillEditor({ editorRef });

  // * 이미지 핸들러 관련 Hook
  const {
    fileInputRef,
    uploadedFilesRef,
    handleFileInputChange,
    handleImageButtonClick,
  } = useQuillImageUpload(quillInstanceRef);

  // * 이미지 업로드, 게시물 작성 API Mutation
  const { postImageMutation, postMutation } = useCommunityMutation();

  const ImageUploadBtn = (
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
  );

  // * 등록 버튼
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !category || !quillInstanceRef.current) return;

    const { ops: content } = quillInstanceRef.current.getContents();
    if (!content.length) return;

    // 1. 이미지 URL 추출
    const imageUrls: string[] = calImageUrls(content);
    const imageUrlSet = new Set(imageUrls);

    // 2. 업로드된 이미지와 매핑
    const imagecontentList: UploadFiles = uploadedFilesRef.current.filter(
      (file) => imageUrlSet.has(file.imageUrl),
    );

    // 3. 이미지 업로드
    let uploadedImageUrls: string[] = [];
    if (imagecontentList.length > 0) {
      const formData = calBuildFormData(imagecontentList);

      try {
        const { data } = await postImageMutation.mutateAsync(formData);
        uploadedImageUrls = data;
      } catch (error) {
        console.error(error);
        // toast
        return;
      }
    }

    // 4. 콘텐츠 변환
    let imageIndex = 0;
    const transformContent = content.map((item: QuillDeltaInsert) => {
      if (typeof item.insert === 'object' && 'image' in item.insert) {
        return {
          type: 'image',
          value: uploadedImageUrls[imageIndex++] ?? '',
        };
      }
      return {
        type: 'text',
        value: item.insert,
      };
    });

    // 5. 게시물 작성
    const body = {
      title,
      categoryId: Number(category) as 1 | 2 | 3,
      content: transformContent,
    };

    postMutation.mutate(body, {
      onSuccess: () => {
        router.back();
      },
      onError: (error) => {
        console.error(error);
        // toast
      },
    });
  };

  // 제출 버튼 disabled, loading 유무
  const isDisabledSubmitBtn = calIsDisabledSubmitBtn(title, category);
  const isLoading = postImageMutation.isPending || postMutation.isPending;

  const SubmitBtn = (
    <Button
      type="submit"
      color="secondary"
      size="sm"
      className="body1 w-fit px-[1.16rem] py-1 text-[#fff]"
      disabled={isDisabledSubmitBtn}
      isLoading={isLoading}
    >
      등록
    </Button>
  );

  return (
    <form
      className={cn(
        'm-auto flex w-full flex-col',
        // 모바일
        'px-[1.25rem] py-[2.5rem]',
        // PC
        'md:w-full md:px-[7.5rem] md:py-[3.75rem]',
      )}
      onSubmit={handleSubmit}
    >
      <h1 className="title1 md:text-primary mb-[2rem] text-[#333] md:mb-[2.5rem]">
        게시글 작성하기
      </h1>
      <div className="mb-[1.5rem] grid gap-[1.5rem] md:grid-cols-[49.5625fr_24.1875fr] md:gap-[1.25rem]">
        {TitleField}
        {CategoryField}
      </div>
      <ContentField editorRef={editorRef} />
      <div className="flex justify-between">
        {ImageUploadBtn}
        {SubmitBtn}
      </div>
    </form>
  );
}
