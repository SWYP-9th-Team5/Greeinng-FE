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

export const calBuildFormData = (files: UploadFiles) => {
  const formData = new FormData();
  files.forEach((fileObj) =>
    formData.append('image', fileObj.file, fileObj.file.name),
  );
  return formData;
};
