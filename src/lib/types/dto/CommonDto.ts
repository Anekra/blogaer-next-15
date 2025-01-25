import { AnyObj, Auth } from "../common";
import { PostDto, PostWithNoUserDto } from "./PostDto";

export type AuthDto = {
  status: string;
  data?: Auth;
  message?: string;
  error?: string;
};

export type CommonDto = {
  status: string;
  data?: AnyObj;
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
  isAuthApp?: boolean;
};

export type SavedAccountsDto = {
  username: string;
  email: string;
  img: string;
};
