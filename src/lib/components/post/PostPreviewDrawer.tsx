import Link from "next/link";
import { useRouter } from "next/navigation";
import { createEditor } from "slate";
import { Editable, Slate, withReact } from "slate-react";

import postClientFetch from "@/lib/actions/client/postClientFetch";
import FullPreviewDialog from "@/lib/components/dialogs/FullPreviewDialog";
import PreviewIcon from "@/lib/components/icons/PreviewIcon";
import TagsIcon from "@/lib/components/icons/TagsIcon";
import PostTags from "@/lib/components/post/PostTags";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger
} from "@/lib/components/ui/drawer";
import { useContent } from "@/lib/contexts/ContentContext";
import { useLoading } from "@/lib/contexts/LoadingContext";
import { useSession } from "@/lib/contexts/SessionContext";
import { useToast } from "@/lib/hooks/use-toast";
import useViewConfig from "@/lib/hooks/useViewConfig";
import { generateId, getTotalWords } from "@/lib/utils/helper";

export default function PostPreviewDrawer() {
  const editor = withReact(createEditor());
  const router = useRouter();
  const { renderElement, renderLeaf } = useViewConfig(editor);
  const { session } = useSession();
  const { content } = useContent();
  const { setLoading } = useLoading();
  const { tags } = useContent();
  const { toast } = useToast();
  const words = getTotalWords(content);
  const publishPost = async () => {
    const username = session?.username;
    if (!username) return;
    setLoading(true);
    const id = generateId();
    const title = `${content[0].children[0].text}`;
    const resOk = await postClientFetch({ id, title, content, tags }, "/post");
    if (resOk) {
      router.push(
        `/blog/${username.toLowerCase()}/${title
          .replace(/\s+/g, "-")
          .toLowerCase()}-${id}`
      );
      toast({
        title: "Adding post",
        duration: 3000,
        className: "toast-base"
      });
      setLoading(false);
    } else {
      toast({
        title: "Error occurred. please try again later",
        duration: 3000,
        className: "toast-base"
      });
      setLoading(false);
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="btn-solid-p">Preview</button>
      </DrawerTrigger>
      <DrawerContent className="focus:outline-none">
        <div className="flex h-3/4 max-h-[85vh] flex-col justify-center gap-6 overflow-y-auto px-12 pb-16 pt-8 md:flex-row">
          <div className="flex flex-1 flex-col gap-4">
            <div className="flex items-center gap-2 text-2xl font-bold">
              <PreviewIcon />
              <p>Preview</p>
            </div>
            <div className="flex max-h-[60vh] flex-col gap-4 overflow-y-auto">
              <div className="flex flex-col gap-2 overflow-y-auto rounded border">
                <Slate editor={editor} initialValue={content.slice(0, 3)}>
                  <Editable
                    readOnly
                    placeholder="Type something..."
                    renderElement={(props) => renderElement(props, editor)}
                    renderLeaf={renderLeaf}
                    className="pointer-events-none flex flex-col gap-2 p-1"
                  />
                </Slate>
                {content.length > 3 && (
                  <span className="text-foreground/50">
                    And
                    {content.length - 3 === 1
                      ? ` ${content.length - 3} element more`
                      : ` ${content.length - 3} elements more`}
                  </span>
                )}
              </div>
              <p className="text-sm">{`A total of ${words} words`}</p>
            </div>
            <hr />
            <div className="flex gap-2">
              <FullPreviewDialog
                content={content}
                renderElement={(props) => renderElement(props, editor)}
                renderLeaf={renderLeaf}
              />
              <Link
                href="/blog/post/preview"
                target="_blank"
                className="border-s-2 border-foreground/40 ps-2 text-primary-foreground"
              >
                Open in new tab
              </Link>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-4">
            <div className="flex items-center gap-2 text-2xl font-bold">
              <TagsIcon />
              <p>Tags</p>
            </div>
            <PostTags />
            <hr />
            <button
              className="flex w-fit gap-2 rounded-xl bg-primary-foreground px-4 py-2 font-bold text-primary"
              onClick={publishPost}
            >
              Publish
            </button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
