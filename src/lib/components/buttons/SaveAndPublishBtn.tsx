import patchFetch from "@/lib/actions/client/patchFetch";
import { useContent } from "@/lib/contexts/ContentContext";
import { useToast } from "@/lib/hooks/use-toast";

export default function SaveAndPublishBtn({ slug }: { slug: string }) {
  const { content, tags } = useContent();
  const title = `${content[0].children[0].text}`;
  const { toast } = useToast();
  const handleEditPost = async () => {
    const response = await patchFetch(
      { slugOrId: slug, title, content, tags },
      "post"
    );
    if (response.message) {
      toast({
        title: response.message,
        duration: 3000,
        className: "toast-base"
      });
    }
  };
  return (
    <button className="btn-solid-p" onClick={handleEditPost}>
      Save & Publish
    </button>
  );
}
