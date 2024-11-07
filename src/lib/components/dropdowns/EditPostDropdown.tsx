import { Edit2Icon, MoreVerticalIcon, Trash2Icon } from "lucide-react";
import { Link } from "next-view-transitions";
import React from "react";

import DeletePostDialogContent from "@/lib/components/dialogs/DeletePostDialogContent";
import { Dialog, DialogTrigger } from "@/lib/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/lib/components/ui/dropdown-menu";

export default function EditPostDropdown({
  postData: { editUrl, postIndex }
}: {
  postData: { editUrl: string; postIndex: number };
}) {
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-fit items-center rounded-full p-1 text-xl font-bold hover:bg-foreground hover:text-background focus:outline-none">
          <MoreVerticalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <DialogTrigger className="w-full">
                <Link
                  href={editUrl}
                  className="flex size-full items-center gap-3 rounded"
                >
                  <Edit2Icon width={18} /> Edit
                </Link>
              </DialogTrigger>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DialogTrigger className="flex size-full items-center gap-3 rounded">
                <Trash2Icon width={18} /> Delete
              </DialogTrigger>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeletePostDialogContent postIndex={postIndex} />
    </Dialog>
  );
}
