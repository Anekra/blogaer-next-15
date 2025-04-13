import {
  EmailUsernameRequestDto,
  GetSocialsDto,
  PagedPostDto,
  PagedPostWithNoUserDto,
  SavedAccountsDto,
  TwoFADto,
  UserOauthDto,
  UserRequestDto
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

export type GetAccountSectionDto = {
  status: string;
  data: {
    userRequests: EmailUsernameRequestDto;
    socials: GetSocialsDto;
  };
};

export type GetSecuritySectionDto = {
  status: string;
  data: {
    userPassword?: boolean;
    userTwoFA: TwoFADto;
    userOauth: UserOauthDto;
    userRequest: UserRequestDto;
  };
};

export type GetSavedAccounts = {
  status: string;
  data: SavedAccountsDto[];
};

export type GetOtpTimeDto = {
  status: string;
  data: {
    time: string;
  };
};
