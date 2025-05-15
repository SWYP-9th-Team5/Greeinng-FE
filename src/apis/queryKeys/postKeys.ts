/* eslint-disable import/no-anonymous-default-export */
export default {
  postDetail: (postId: number) => ['/posts', postId],
  postComments: (postId: number) => ['/posts/comments/posts', postId],
};
