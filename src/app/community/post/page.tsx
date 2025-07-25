'use client';

import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

import { usePopupStore } from '@/stores/usePopupStore';
import { cn } from '@/utils/cn';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

import Button from '@components/common/Button';
import FocusTrap from '@components/common/FocusTrap';
import CategorySelectField from '@components/features/community/post/CategorySelectField';
import ContentField from '@components/features/community/post/ContentField';
import TitleInputField from '@components/features/community/post/TitleInputField';
import useQuillEditor from '@components/features/community/post/hooks/useQuillEditor';
import useQuillImageUpload, {
  UploadFiles,
} from '@components/features/community/post/hooks/useQuillImageUpload';

import { PostContentItem, getPostDetail } from '@apis/data/community';
import useCommunityMutation from '@apis/mutations/community/useCommunityMutation';
import postKeys from '@apis/queryKeys/postKeys';

import useInputs from '@hooks/useInputs';

import { COMMUNITY_LIST } from '@constants/communityData';

import {
  QuillDeltaInsert,
  calImageUrls,
  calResizeBuildFormData,
} from './utils';

export default function Page() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  const modifyId = searchParams.get('modifyId');
  const postId = modifyId ? Number(modifyId) : undefined;

  const { data: modifyData } = useQuery({
    queryKey: postId ? postKeys.postDetail(postId) : [],
    queryFn: () => getPostDetail(postId!),
    enabled: postId !== undefined,
  });

  // * 제목, 카테고리
  const { inputs, onChangeValue } = useInputs({
    title: postId ? (modifyData?.title ?? '') : '',
    category: postId ? `${modifyData?.categoryId}` : '',
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
  const { quillInstanceRef, loading } = useQuillEditor({ editorRef });

  // * 이미지 핸들러 관련 Hook
  const {
    fileInputRef,
    uploadedFilesRef,
    handleFileInputChange,
    handleImageButtonClick,
  } = useQuillImageUpload(quillInstanceRef);

  // * 이미지 업로드, 게시물 작성 API Mutation
  const { postImageMutation, postMutation, putPostMutation } =
    useCommunityMutation();

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

    if (!category) {
      showPopup(
        '카테고리 미선택',
        '카테고리가 선택되지 않았습니다.\n카테고리 선택 후 업로드 가능합니다',
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
    if (!modifyId) {
      const body = {
        title,
        categoryId: Number(category) as 1 | 2 | 3,
        content: transformContent,
      };

      postMutation.mutate(body, {
        onSuccess: ({ data }) => {
          const { postId } = data;
          const findItem = COMMUNITY_LIST.find(
            ({ value }) => category === value,
          );
          router.replace(`/community/${findItem?.path}/${postId}`);
        },
        onError: (error) => {
          console.error(error);
          toast.error(error.response?.data.message);
        },
      });
      return;
    }

    // 게시물 수정
    if (postId) {
      const body = {
        postId,
        title,
        content: transformContent,
      };
      putPostMutation.mutate(body, {
        onSuccess: () => {
          const findItem = COMMUNITY_LIST.find(
            ({ value }) => category === value,
          );
          queryClient.invalidateQueries({
            queryKey: postKeys.postDetail(postId),
          });
          router.replace(`/community/${findItem?.path}/${postId}`);
        },
      });
    }
  };

  const isLoading = postImageMutation.isPending || postMutation.isPending;

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
    if (!loading && modifyData) {
      const convertToDelta = (content: PostContentItem[]) => {
        return content.map((item) => {
          if (item.type === 'IMAGE') {
            return { insert: { image: item.value } };
          }
          return { insert: item.value };
        });
      };

      const delta = convertToDelta(modifyData.content);
      quillInstanceRef.current.setContents(delta);
    }
  }, [modifyData, loading]);

  return (
    <FocusTrap isAutoFocus={true}>
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
        <div className="mb-[1.5rem] grid gap-[1.5rem] md:gap-[1.25rem] lg:grid-cols-[49.5625fr_24.1875fr]">
          {TitleField}
          {CategoryField}
        </div>
        <ContentField editorRef={editorRef} />
        <div className="flex justify-between">
          {ImageUploadBtn}
          {SubmitBtn}
        </div>
      </form>
    </FocusTrap>
  );
}
