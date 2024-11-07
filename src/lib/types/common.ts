import type { BaseEditor } from "slate";
import type { HistoryEditor } from "slate-history";
import type { ReactEditor } from "slate-react";

import { PostDto, PostWithNoUserDto } from "@/lib/types/dto/PostDto";

export type Session = {
  username: string;
  email: string;
  role: string;
  exp: number;
  name?: string;
  desc?: string;
  img?: string;
} | null;

export type SessionCookie = {
  username: string;
  email: string;
  role: string;
  img?: string;
} | null;

export type Auth = {
  access: string;
  refresh: string;
  username: string;
  email: string;
  role: string;
  name?: string;
  desc?: string;
  img?: string;
};

export type AuthJson = {
  status: string;
  message: string;
  data: Auth;
};

export type RefreshToken = {
  username: string;
  access: string;
  refresh: string;
};

export type RefreshTokenJson = {
  status: string;
  message: string;
  data: RefreshToken;
};

export type Draft = {
  id: string;
  title: string;
  content?: any;
  tags?: string[];
};

export type EditPost = {
  slugOrId: string;
  title: string;
  content: any;
  tags: string[];
};

export type SearchParams = { param: string; value: string }[];

export type CurrentPost = PostDto | PostWithNoUserDto;

export type SlateEditor = BaseEditor & ReactEditor & HistoryEditor;
