import { Link2 } from 'lucide-react';
import React, { useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { setImageElement } from '@/lib/utils/helper';
import { useSlate } from 'slate-react';

export default function ImgLinkBtn() {
  const editor = useSlate();
  const linkRef = useRef<HTMLInputElement>(null);
  const captionRef = useRef<HTMLInputElement>(null);
  const altRef = useRef<HTMLInputElement>(null);
  return (
    <Dialog>
      <DialogTrigger>
        <button className="flex h-[200px] w-[200px] flex-col items-center justify-center rounded border hover:border-primary-foreground hover:text-primary-foreground">
          <input type="file" name="image" className="hidden" />
          <Link2 className="h-auto w-20" />
          <label>Insert Image Link</label>
        </button>
      </DialogTrigger>
      <DialogContent className="bg-base-background">
        <DialogHeader>
          <DialogTitle>Add image link</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-6 items-center gap-4">
            <Label htmlFor="imgLink" className="text-left">
              Link
            </Label>
            <Input
              ref={linkRef}
              id="imgLink"
              placeholder="Image link"
              className="col-span-5"
            />
          </div>
          <div className="grid grid-cols-6 items-center gap-4">
            <Label htmlFor="imgCaption" className="text-left">
              Caption
            </Label>
            <Input
              ref={captionRef}
              id="imgCaption"
              placeholder="Image caption"
              className="col-span-5"
            />
          </div>
          <div className="grid grid-cols-6 items-center gap-4">
            <Label htmlFor="imgAlt" className="text-left">
              Name
            </Label>
            <Input
              ref={altRef}
              id="imgAlt"
              placeholder="Image alt name"
              className="col-span-5"
            />
          </div>
        </div>
        <DialogFooter>
          <button
            className="btn-p-solid-a"
            onClick={() => {
              const link = linkRef.current?.value || ''
              const caption = captionRef.current?.value || ''
              const alt = altRef.current?.value || ''
              setImageElement(editor, link, caption, alt);
            }}
          >
            Add image
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
