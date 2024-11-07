import { PostDto, PostWithNoUserDto } from "@/lib/types/dto/PostDto";

export type PagedPostDto = {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  posts: PostDto[];
};
export type PagedPostWithNoUserDto = {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  posts: PostWithNoUserDto[];
};
