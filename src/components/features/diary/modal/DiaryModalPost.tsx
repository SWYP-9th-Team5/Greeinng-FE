'use client';

import React, { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

import {
  QuillDeltaInsert,
  calImageUrls,
  calResizeBuildFormData,
} from '@/app/community/post/utils';
import { useDiaryModalStore } from '@/stores/useDiaryModalStore';
import { usePopupStore } from '@/stores/usePopupStore';
import { cn } from '@/utils/cn';
import { QueryClient } from '@tanstack/react-query';
import Image from 'next/image';

import Button from '@components/common/Button';
import TitleInputField from '@components/features/community/post/TitleInputField';
import useQuillEditor from '@components/features/community/post/hooks/useQuillEditor';
import useQuillImageUpload, {
  UploadFiles,
} from '@components/features/community/post/hooks/useQuillImageUpload';

import { PostContentItem } from '@apis/data/community';
import useCommunityMutation from '@apis/mutations/community/useCommunityMutation';
import useDiaryMutation from '@apis/mutations/diary/useDiaryMutation';
import diaryKeys from '@apis/queryKeys/diaryKeys';

import useInputs from '@hooks/useInputs';

import { TabValue } from './PostModal';

interface DiaryModalPostProps {
  titleValue?: string;
  contentValue?: PostContentItem[];
  date: string;
  petPlantId: number;
  dailyRecordId: number;
  handlePost: (value: TabValue) => void;
  refetch: () => void;
}

export default function DiaryModalPost({
  titleValue,
  contentValue,
  date,
  petPlantId,
  dailyRecordId,
  handlePost,
  refetch,
}: DiaryModalPostProps) {
  // * 에디터 입력 및 script 불러오기
  const editorRef = useRef<HTMLDivElement | null>(null);
  const { quillInstanceRef, loading } = useQuillEditor({ editorRef });

  // * 이미지 핸들러 관련 Hook
  const {
    fileInputRef,
    uploadedFilesRef,
    handleFileInputChange,
    handleImageButtonClick,
  } = useQuillImageUpload(quillInstanceRef);

  const { inputs, onChangeValue } = useInputs({
    title: titleValue ? titleValue : '',
  });
  const { title } = inputs;
  const TitleField = (
    <TitleInputField
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

  const queryClient = new QueryClient();
  const { postImageMutation } = useCommunityMutation();
  const { postDiaryPostMutation, putPetPlantDiaryMutation } =
    useDiaryMutation();

  const handleOpenPopup = usePopupStore((state) => state.openPopup);
  const handleClosePopup = usePopupStore((state) => state.closePopup);
  const handleSetDiaryState = useDiaryModalStore(
    (state) => state.handleSetDiaryState,
  );

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
    if (!titleValue) {
      const body = {
        petPlantId,
        today: date,
        title,
        content: transformContent,
      };

      postDiaryPostMutation.mutate(body, {
        onSuccess: (res) => {
          queryClient.invalidateQueries({
            queryKey: diaryKeys.getPetPlantsTodayInfo(dailyRecordId),
          });
          handleSetDiaryState({
            dailyRecordId: res.data.dailyRecordId,
          });
          handlePost('content');
        },
        onError: (error) => {
          console.log(error.response);
        },
      });
      return;
    }

    // 수정
    const body = {
      title,
      content: transformContent,
      dailyRecordId,
    };

    putPetPlantDiaryMutation.mutate(
      { dailyRecordId, body },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: diaryKeys.getPetPlantsTodayInfo(dailyRecordId),
          });

          refetch();
          handlePost('content');
        },
      },
    );
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

  useEffect(() => {
    console.log(quillInstanceRef.current);
    if (contentValue && !loading) {
      const convertToDelta = (content: PostContentItem[]) => {
        return content.map((item) => {
          if (item.type === 'IMAGE') {
            return { insert: { image: item.value } };
          }
          return { insert: item.value };
        });
      };

      const delta = convertToDelta(contentValue);
      quillInstanceRef.current.setContents(delta);
    }
  }, [contentValue, loading]);

  return (
    <form
      className="flex min-w-0 flex-col break-all whitespace-normal"
      onSubmit={handleSubmit}
    >
      <div className="mb-[0.5rem] md:mb-[0.63rem]">{TitleField}</div>
      <fieldset
        className={cn(
          'mb-[0.5rem] flex flex-col overflow-y-auto md:mb-[0.63rem]',
        )}
      >
        <legend className="sr-only">내용 작성하기</legend>
        <div
          className={cn(
            'h-[15rem] cursor-text md:h-[25rem]',
            'rounded-[0.625rem] border-1 border-[#ddd] bg-[#fff]',
          )}
        >
          <div
            ref={editorRef}
            className="p-[0.75rem] break-words whitespace-pre-wrap md:px-[1rem]"
          />
        </div>
      </fieldset>
      <div className="flex justify-between">
        {ImageUploadBtn}
        {SubmitBtn}
      </div>
    </form>
  );
}
