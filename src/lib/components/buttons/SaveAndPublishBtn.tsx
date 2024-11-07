import patchClientFetch from "@/lib/actions/client/patchClientFetch";
import { useContent } from "@/lib/contexts/ContentContext";
import { useToast } from "@/lib/hooks/use-toast";

export default function SaveAndPublishBtn({ slug }: { slug: string }) {
  const { content, tags } = useContent();
  const title = `${content[0].children[0].text}`;
  const { toast } = useToast();
  const handleEditPost = async () => {
    const response = await patchClientFetch(
      { title, content, tags },
      `post/${slug}`
    );
    if (response.message) {
      toast({
        title: response.message,
        duration: 1500,
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
