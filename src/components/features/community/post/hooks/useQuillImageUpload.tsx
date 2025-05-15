import { RefObject, useRef } from 'react';
import { toast } from 'react-toastify';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useQuillImageUpload(quillRef: RefObject<any>) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (file: File) => {
    if (!file || !quillRef.current) return;

    try {
      const imageUrl = URL.createObjectURL(file);
      const range = quillRef.current.getSelection(true);
      if (range) {
        quillRef.current.insertEmbed(range.index, 'image', imageUrl);
        quillRef.current.setSelection(range.index + 1, 0);
      }
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      toast.error('이미지 업로드에 실패했습니다.');
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleImageButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return {
    fileInputRef,
    handleFileInputChange,
    handleImageButtonClick,
  };
}
