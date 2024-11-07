import Form from "next/form";
import logout from "@/lib/actions/server/auth/logout";
import { redirect } from "next/navigation";

export default function LogoutPage() {
  const signOut = async () => {
    "use server";

    logout();
    redirect("/");
  };
  return (
    <Form
      action={signOut}
      className="flex justify-center items-center h-screen"
    >
      <button className="btn-solid-p">LogoutPage</button>
    </Form>
  );
}
