import { UploadFiles } from '@components/features/community/post/hooks/useQuillImageUpload';

export type QuillDeltaInsert = { insert: string } | QuillImage;
type QuillImage = { insert: { image: string }; attributes?: string };

export type QuillDelta = QuillDeltaInsert[];

//
export const calImageUrls = (content: QuillDelta): string[] => {
  const filterImageContent = content.filter(
    (item): item is QuillImage =>
      typeof item.insert === 'object' && 'image' in item.insert,
  );
  const imageUrls = filterImageContent.map((item) => item.insert.image);
  return imageUrls;
};

// 버튼 비활성화 판별 함수
export const calIsDisabledSubmitBtn = (title: string, category: string) => {
  if (!title) return true;
  if (!category) return true;
  return false;
};

export const calBuildFormData = (files: UploadFiles) => {
  const formData = new FormData();
  files.forEach((fileObj) =>
    formData.append('image', fileObj.file, fileObj.file.name),
  );
  return formData;
};
