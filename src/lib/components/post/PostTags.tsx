import { usePathname } from "next/navigation";
import React, { useState } from "react";

import { Input } from "@/lib/components/ui/input";
import { useContent } from "@/lib/contexts/ContentContext";

export default function PostTags() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const currentPath = usePathname();
  const isEditPublished = currentPath.startsWith("/blog/post/edit/published/");
  const { tags, setTags } = useContent();
  const [tagsLength, setTagsLength] = useState(tags.length);
  const insertTagOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const inputEl = e.target as HTMLInputElement;
    const tag = inputEl.value.trim();
    const newTags = tag
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0 && t !== "" && !tags.includes(t));
    setTagsLength(tags.length + newTags.length);

    if (e.key === "Enter") {
      if (newTags.length > 0) setTags([...tags, ...newTags]);
      inputEl.value = "";
    }
  };
  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (tagsLength >= 10 && e.key === ",") {
      e.preventDefault();
    }
  };
  const clearTags = () => {
    setTags([]);
    setTagsLength(0);
  };
  const deleteTag = (i: number) => {
    setTags(tags.filter((_, index) => index !== i));
    setTagsLength((prevLength) => prevLength - 1);
  };

  return (
    <div
      className={`xl:static xl:translate-x-0${
        isCollapsed && isEditPublished
          ? " absolute right-0 flex translate-x-full"
          : ""
      }`}
    >
      {isEditPublished && (
        <button
          className={`vertical-text peer pointer-events-auto relative h-fit rounded-l-md border-2  bg-background py-2 font-bold after:absolute after:right-[-2px] after:top-0 after:h-full after:w-[3px] after:bg-background after:content-[''] hover:border-base-foreground xl:hidden${
            isCollapsed ? " -translate-x-full" : " translate-x-[2px]"
          }`}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          Tags
        </button>
      )}
      <div
        className={`flex w-full flex-col gap-2 rounded-bl-md  bg-background p-2 xl:border-none xl:p-0${
          isEditPublished
            ? " border-y-2 border-l-2 peer-hover:border-base-foreground"
            : ""
        }`}
      >
        <span>Add comma after each tag to insert multiple tags</span>
        <div className="flex flex-col gap-4 rounded border p-2">
          <div className="flex flex-col gap-2">
            <ul className="flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <li
                  key={i}
                  className="flex w-fit items-center justify-center gap-2 rounded bg-base-background px-2 py-1 text-primary-foreground"
                >
                  {tag}
                  <button
                    className="rounded-3xl text-foreground/50 hover:text-red-500"
                    onClick={() => deleteTag(i)}
                  >
                    🗙
                  </button>
                </li>
              ))}
            </ul>
            {tags.length < 10 && (
              <Input
                type="text"
                placeholder="Press enter to insert tags"
                className="w-fit rounded bg-input"
                onKeyUp={insertTagOnKeyUp}
                onKeyDown={handleOnKeyDown}
              />
            )}
          </div>
          <button
            className="self-end px-2 text-sm text-foreground/50 enabled:hover:text-red-700"
            disabled={tags.length === 0}
            onClick={clearTags}
          >
            Clear all
          </button>
        </div>
        <span>{10 - tagsLength} tags remaining</span>
      </div>
    </div>
  );
}
