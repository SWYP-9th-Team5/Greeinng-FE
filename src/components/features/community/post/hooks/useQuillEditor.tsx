import { useEffect, useRef } from 'react';

import useScript from '@hooks/useScript';

// 너가 작성한 useScript 훅

interface UseQuillEditorProps {
  editorRef: React.RefObject<HTMLDivElement | null>;
}

export default function useQuillEditor({ editorRef }: UseQuillEditorProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const quillInstanceRef = useRef<any>(null);

  const [loading, error] = useScript({
    src: 'https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.min.js',
    checkForExisting: true,
  });

  useEffect(() => {
    if (loading || error || !editorRef.current || typeof window === 'undefined')
      return;

    // Quill CSS 로드
    const existingLink = document.querySelector(
      'link[href="https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.bubble.css"]',
    );

    if (!existingLink) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href =
        'https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.bubble.css';
      document.head.appendChild(link);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Quill = (window as any).Quill;
    if (!Quill) return;

    // 이미지 포맷 블롯 커스터마이징
    const ImageBlot = Quill.import('formats/image');
    const ATTRIBUTES = ['alt', 'height', 'width', 'style'];
    class CustomImageBlot extends ImageBlot {
      static create(value: string) {
        const node = super.create(value);
        if (typeof value === 'string') {
          node.setAttribute('src', value);
          node.setAttribute('class', 'quill-image');
          node.setAttribute('style', 'max-width: 100%;');
        }
        return node;
      }

      static formats(domNode: HTMLElement) {
        return ATTRIBUTES.reduce(
          (formats, attr) => {
            if (domNode.hasAttribute(attr)) {
              formats[attr] = domNode.getAttribute(attr);
            }
            return formats;
          },
          {} as Record<string, string | null>,
        );
      }
    }

    CustomImageBlot.blotName = 'image';
    CustomImageBlot.tagName = 'img';
    Quill.register(CustomImageBlot, true);

    // 에디터 초기화
    quillInstanceRef.current = new Quill(editorRef.current, {
      placeholder: '내용을 입력하세요',
      theme: 'bubble',
      modules: {
        toolbar: false,
      },
    });

    editorRef.current.addEventListener('keydown', (e) => {
      if (['Escape', 'Tab'].includes(e.key)) {
        (e.target as HTMLElement).blur(); // 에디터에서 포커스 제거
      }
    });

    // 클릭 시 포커스
    const container = editorRef.current.parentElement;
    if (container) {
      const handleClick = () => quillInstanceRef.current?.focus();
      container.addEventListener('click', handleClick);

      return () => {
        container.removeEventListener('click', handleClick);
      };
    }

    // 클린업
    return () => {
      quillInstanceRef.current = null;
    };
  }, [loading, error, editorRef]);

  return {
    quillInstanceRef,
    loading,
    error,
  };
}
