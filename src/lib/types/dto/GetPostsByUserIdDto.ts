import { PagedPostWithNoUserDto } from "@/lib/types/dto/PagedPostDto";

export type GetPostsByUserIdDto = {
  status: string;
  data: PagedPostWithNoUserDto;
};
