import { Link } from "next-view-transitions";

import { Session } from "@/lib/types/common";

export default function ViewPostBtn({
  session,
  slug
}: {
  session: Session;
  slug: string;
}) {
  const username = session?.username;
  return (
    <Link href={`/blog/${username}/${slug}`}>
      <button className="btn-outline-p">View Post</button>
    </Link>
  );
}
