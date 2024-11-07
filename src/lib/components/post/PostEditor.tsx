"use client";
import isHotkey from "is-hotkey";
import { usePathname } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Descendant, createEditor } from "slate";
import { withHistory } from "slate-history";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";

import patchClientFetch from "@/lib/actions/client/patchClientFetch";
import postClientFetch from "@/lib/actions/client/postClientFetch";
import PostLinkEditor from "@/lib/components/post/PostLinkEditor";
import PostWysiwyg from "@/lib/components/post/PostWysiwyg";
import { useContent } from "@/lib/contexts/ContentContext";
import useEditorConfig from "@/lib/hooks/useEditorConfig";
import useSelection from "@/lib/hooks/useSelection";
import { PostDto } from "@/lib/types/dto/PostDto";
import { CustomElement } from "@/lib/types/slate";
import { INITIAL_VALUE, VOIDS } from "@/lib/utils/constants";
import { HotKeys } from "@/lib/utils/enums";
import {
  collapseSelection,
  generateId,
  getElementType,
  getSlugOrIdFromPath,
  toggleStyle
} from "@/lib/utils/helper";

export default function PostEditor({
  post,
  children
}: {
  post?: PostDto;
  children?: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const currentPath = usePathname();
  const { content, setContent, setIsDoneEditing, tags } = useContent();
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const { renderElement, renderLeaf } = useEditorConfig(editor);
  const [selection, setSelection] = useSelection(editor);
  const [showLinkEditor, setShowLinkEditor] = useState(false);
  const [timeout, setTimeoutId] = useState<any>(null);
  const elementType = getElementType(editor);
  const handleShowLinkEditor = (visible: boolean) => {
    setShowLinkEditor(visible);

    if (!visible) collapseSelection(editor);
  };
  const onChangeHandler = useCallback(
    async (value: Descendant[]) => {
      if (currentPath !== "/blog/post/create") {
        setContent(value as CustomElement[]);
        setSelection(editor.selection);
        const isASTChange = editor.operations.some(
          (op) => op.type !== "set_selection"
        );
        if (isASTChange) {
          const content = JSON.stringify(value);
          localStorage.setItem("content", content);
        }
      }
    },
    [editor, setContent, setSelection, currentPath]
  );
  const onValueChangeHandler = useCallback(
    async (value: Descendant[]) => {
      const title = `${value[0].children[0].text}`;
      if (currentPath === "/blog/post/create") {
        if (title) {
          const id = generateId();
          await postClientFetch(
            {
              id,
              title,
              content: value
            },
            "draft"
          );
          history.replaceState(null, "", `/blog/post/edit/draft/${id}`);
        }
      } else {
        if (currentPath.startsWith("/blog/post/edit/draft/")) {
          clearTimeout(timeout === null ? undefined : timeout);
          setIsDoneEditing(false);
          setTimeoutId(
            setTimeout(async () => {
              console.log(`${title}`);
              const id = getSlugOrIdFromPath(currentPath);
              try {
                await patchClientFetch(
                  {
                    slugOrId: id,
                    title: title || "Untitled post",
                    content: value,
                    tags
                  },
                  `draft/${id}`
                );
                setIsDoneEditing(true);
              } catch (_) {
                setIsDoneEditing(true);
              }
            }, 5000)
          );
        }
      }
    },
    [currentPath, timeout, setIsDoneEditing, tags]
  );

  useEffect(() => {
    if (
      typeof localStorage !== "undefined" &&
      localStorage.getItem("content") != null
    ) {
      setContent(post?.content || INITIAL_VALUE);
    }
    setIsMounted(true);
  }, [setContent, post]);

  if (isMounted) {
    return (
      <Slate
        editor={editor}
        initialValue={content}
        onChange={onChangeHandler}
        onValueChange={onValueChangeHandler}
      >
        <section className="flex flex-col gap-2" id="wysiwyg-toolbar">
          <PostWysiwyg
            isLinkEditorOpen={showLinkEditor}
            handleShowLinkEditor={handleShowLinkEditor}
          />
        </section>
        <article className="w-9/12 rounded px-4" id="story-form">
          <PostLinkEditor
            handleShowLinkEditor={handleShowLinkEditor}
            isVisible={showLinkEditor}
          />
          <Editable
            className="flex flex-col gap-6 outline-none"
            renderElement={(props) => renderElement(props, editor)}
            renderLeaf={renderLeaf}
            onFocus={() => setSelection(selection)}
            onKeyDown={(e) => {
              Object.keys(HotKeys).forEach((key) => {
                if (isHotkey(key, e)) {
                  e.preventDefault();
                  const style = HotKeys[key as keyof typeof HotKeys];
                  toggleStyle(editor, style);
                }
              });
              if (VOIDS.includes(`${elementType}`)) {
                if (e.key.match("Backspace")) {
                  e.preventDefault();
                  if (!editor.selection) return;
                  const previousPoint = editor.before(editor.selection);
                  if (!previousPoint) return;
                  editor.delete();
                  editor.select(previousPoint);
                  ReactEditor.focus(editor);
                }
              }
            }}
          />
        </article>
        {children != null &&
          currentPath.startsWith("/blog/post/edit/published/") && (
            <section>{children}</section>
          )}
      </Slate>
    );
  }
}
