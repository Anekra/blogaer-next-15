type CommentDto = {
  commentId: string;
  commentText: string;
};
type ReactionDto = {
  reactionId: string;
  reactionList: string[];
};
export type PostDto = {
  id: string;
  username: string;
  userImg?: string;
  title: string;
  content: any[];
  categories: string[];
  tags: string[];
  comments: CommentDto[];
  reactions: ReactionDto[];
  createdAt: string;
  updatedAt: string;
};
export type PostWithNoUserDto = {
  id: string;
  title: string;
  content: any[];
  categories: string[];
  tags: string[];
  comments: CommentDto[];
  reactions: ReactionDto[];
  createdAt: string;
  updatedAt: string;
};
