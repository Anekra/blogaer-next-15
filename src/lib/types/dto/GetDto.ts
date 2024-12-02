import {
  PagedPostDto,
  PagedPostWithNoUserDto,
  TwoFADto,
  UserOauthDto
} from "./CommonDto";
import { PostDto } from "./PostDto";

export type GetPostByIdDto = {
  status: string;
  data: PostDto;
};

export type GetPostsByPageDto = {
  status: string;
  data: PagedPostDto;
};

export type GetPostsByUserIdDto = {
  status: string;
  data: PagedPostWithNoUserDto;
};

export type GetSocialsDto = {
  status: string;
  data: {
    github: string;
    instagram: string;
    x: string;
    youtube: string;
    facebook: string;
    gitlab: string;
  };
};

export type GetSecurityDto = {
  status: string;
  data: {
    userPassword?: boolean;
    userTwoFA: TwoFADto;
    userOauth: UserOauthDto;
  };
};
