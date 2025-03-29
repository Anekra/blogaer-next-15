import { toast } from "sonner";

import patchClientFetch from "@/lib/actions/client/patchClientFetch";
import { useContent } from "@/lib/contexts/ContentContext";

export default function SaveAndPublishBtn({ slug }: { slug: string }) {
  const { content, tags } = useContent();
  const title = `${content[0].children[0].text}`;
  const handleEditPost = async () => {
    const response = await patchClientFetch(
      { title, content, tags },
      `/post/${slug}`
    );
    if (response.message) {
      toast.success(response.message, {
        position: "bottom-right",
        duration: 2000
      });
    }
  };
  return (
    <button className="btn-solid-p" onClick={handleEditPost}>
      Save & Publish
    </button>
  );
}
