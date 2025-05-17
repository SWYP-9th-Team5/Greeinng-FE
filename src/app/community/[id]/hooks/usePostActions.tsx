import { toast } from 'react-toastify';

import { usePopupStore } from '@/stores/usePopupStore';
import { useQueryClient } from '@tanstack/react-query';

import useCommunityMutation from '@apis/mutations/community/useCommunityMutation';
import postKeys from '@apis/queryKeys/postKeys';

import { useLoginErrorPopup } from '@hooks/useLoginErrorPopup';

export default function usePostActions(userId: number, postId: number) {
  const queryClient = useQueryClient();
  const { postLikeMutation, deleteCommentMutation } = useCommunityMutation();

  const { handleLoginPopup } = useLoginErrorPopup();
  const openPopup = usePopupStore((state) => state.openPopup);
  const closePopup = usePopupStore((state) => state.closePopup);

  const handleToggleLike = () => {
    postLikeMutation.mutate(
      { userId, postId },
      {
        onSuccess: () =>
          queryClient.invalidateQueries({
            queryKey: postKeys.postDetail(postId),
          }),
        onError: (error) => {
          console.error(error);
          if (error.status === 401) {
            handleLoginPopup();
            return;
          }
          toast.error(error.response?.data.message);
        },
      },
    );
  };

  const handleDeleteComment = (commentId: number) => {
    openPopup({
      title: '삭제 하시겠습니까?',
      description: '삭제된 글은 복구할 수 없습니다',
      confirmText: '확인',
      cancelText: '아니요',
      mode: 'double',
      onConfirm: () => {
        deleteCommentMutation.mutate(
          { userId, commentId },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({
                queryKey: postKeys.postComments(postId),
              });
              queryClient.invalidateQueries({
                queryKey: postKeys.postDetail(postId),
              });
            },
          },
        );
      },
      onCancel: () => closePopup(),
    });
  };

  return { handleToggleLike, handleDeleteComment };
}
