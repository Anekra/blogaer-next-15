import { PostDto, PostWithNoUserDto } from "./PostDto";

export type CommonResponseDto = {
  status: string;
  data?: string;
  message?: string;
  error?: string;
};

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

export type UserOauthDto = {
  github: string;
  google: string;
  apple: string;
  gitlab: string;
  x: string;
  instagram: string;
  facebook: string;
  microsoft: string;
};

export type TwoFADto = {
  twoFAMethod?: string;
  isTwoFAEnabled?: boolean;
  isPasskey?: boolean;
};
