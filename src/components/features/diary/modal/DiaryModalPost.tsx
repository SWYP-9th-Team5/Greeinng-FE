'use client';

import React, { useRef } from 'react';
import { toast } from 'react-toastify';

import {
  QuillDeltaInsert,
  calImageUrls,
  calResizeBuildFormData,
} from '@/app/community/post/utils';
import { usePopupStore } from '@/stores/usePopupStore';
import { cn } from '@/utils/cn';
import Image from 'next/image';

import Button from '@components/common/Button';
import TitleInputField from '@components/features/community/post/TitleInputField';
import useQuillEditor from '@components/features/community/post/hooks/useQuillEditor';
import useQuillImageUpload, {
  UploadFiles,
} from '@components/features/community/post/hooks/useQuillImageUpload';

import useCommunityMutation from '@apis/mutations/community/useCommunityMutation';
import useDiaryMutation from '@apis/mutations/diary/useDiaryMutation';

import useInputs from '@hooks/useInputs';

import { TabValue } from './PostModal';

interface DiaryModalPostProps {
  value: TabValue;
}

export default function DiaryModalPost({ value }: DiaryModalPostProps) {
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

  const { inputs, onChangeValue } = useInputs({
    title: '',
  });
  const { title } = inputs;
  const TitleField = (
    <TitleInputField
      label=""
      name="title"
      value={title}
      placeholder="제목을 입력하세요"
      onChange={onChangeValue}
    />
  );

  // * 이미지 업로드, 게시물 작성 API Mutation
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

  const { postImageMutation } = useCommunityMutation();
  const { postDiaryPostMutation } = useDiaryMutation();

  const handleOpenPopup = usePopupStore((state) => state.openPopup);
  const handleClosePopup = usePopupStore((state) => state.closePopup);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { ops: content } = quillInstanceRef.current.getContents();

    const showPopup = (title: string, description: string) => {
      handleOpenPopup({
        title,
        description,
        confirmText: '확인',
        mode: 'single',
        onConfirm: () => handleClosePopup(),
      });
    };

    if (!title) {
      showPopup(
        '제목을 입력해 주세요',
        '제목이 입력되지 않았습니다.\n제목 입력 후 업로드 가능합니다.',
      );
      return;
    }

    if (content.length === 1 && content[0].insert.trim() === '') {
      showPopup(
        '내용을 입력해 주세요',
        '내용이 입력되지 않았습니다.\n내용 입력 후 업로드 가능합니다.',
      );
      return;
    }

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
      const formData = await calResizeBuildFormData(imagecontentList);
      try {
        const { data } = await postImageMutation.mutateAsync(formData, {
          onError: (error) => {
            toast.error(error.response?.data.message);
          },
        });
        uploadedImageUrls = data;
      } catch (error) {
        console.error(error);
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
      userId: 3,
      petPlantId: 13,
      today: '2025-07-16',
      title,
      content: transformContent,
    };

    postDiaryPostMutation.mutate(body, {
      onSuccess: ({ data }) => {
        console.log(data);
      },
      onError: ({}) => {},
    });
  };

  const isLoading =
    postImageMutation.isPending || postDiaryPostMutation.isPending;

  const SubmitBtn = (
    <Button
      type="submit"
      color="secondary"
      size="sm"
      className="body1 w-[3.75rem] py-1 text-[#fff] md:w-[6.25rem]"
      isLoading={isLoading}
    >
      등록
    </Button>
  );

  return (
    <>
      {value === 'post' && (
        <form
          className="flex h-full min-w-0 flex-col break-all whitespace-normal"
          onSubmit={handleSubmit}
        >
          <div className="mb-[0.5rem] md:mb-[0.63rem]">{TitleField}</div>
          <fieldset
            className={cn('mb-[0.5rem] flex flex-1 flex-col md:mb-[0.63rem]')}
          >
            <legend className="sr-only">내용 작성하기</legend>
            <div
              className={cn(
                'editor-container w-full flex-1 cursor-text',
                'rounded-[0.625rem] border-1 border-[#ddd] bg-[#fff]',
              )}
            >
              <div
                ref={editorRef}
                className="h-full overflow-y-auto p-[0.75rem] break-words whitespace-pre-wrap md:px-[1rem]"
              />
            </div>
          </fieldset>
          <div className="flex justify-between">
            {ImageUploadBtn}
            {SubmitBtn}
          </div>
        </form>
      )}
    </>
  );
}
