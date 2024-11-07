import { PostDto } from "@/lib/types/dto/PostDto";

export type GetPostByIdDto = {
  status: string;
  data: PostDto;
};
