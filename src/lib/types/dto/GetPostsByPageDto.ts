import { PagedPostDto } from "@/lib/types/dto/PagedPostDto";

export type GetPostsByPageDto = {
  status: string;
  data: PagedPostDto;
};
