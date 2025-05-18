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

export const resizeImageToWebP = (
  file: File,
  maxSize: number,
  quality: number,
): Promise<{ blob: Blob; previewUrl: string }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };

    img.onerror = reject;
    reader.onerror = reject;

    img.onload = () => {
      let { width, height } = img;

      if (width > height && width > maxSize) {
        height = (maxSize / width) * height;
        width = maxSize;
      } else if (height > maxSize) {
        width = (maxSize / height) * width;
        height = maxSize;
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) return reject('canvas context 불러오기 실패');

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const previewUrl = URL.createObjectURL(blob); // 🔍 미리보기용 URL 생성
            resolve({ blob, previewUrl });
          } else {
            reject('canvas toBlob 실패');
          }
        },
        'image/webp', // ⭐️ WebP 포맷
        quality,
      );
    };

    reader.readAsDataURL(file);
  });
};

export const calResizeBuildFormData = async (
  files: UploadFiles,
  maxSize = 1024,
  quality = 0.8,
): Promise<FormData> => {
  const formData = new FormData();

  for (const fileObj of files) {
    const { blob } = await resizeImageToWebP(fileObj.file, maxSize, quality);

    const webpFile = new File(
      [blob],
      fileObj.file.name.replace(/\.[^.]+$/, '.webp'),
      {
        type: 'image/webp',
      },
    );

    formData.append('image', webpFile, webpFile.name);
  }

  return formData;
};
