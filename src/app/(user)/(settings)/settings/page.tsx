import AccountSection from "@/lib/components/sections/account/AccountSection";
import SocialSection from "@/lib/components/sections/account/SocialSection";

export default function AccountPage() {
  return (
    <main
      className={`flex w-full max-w-screen-2xl flex-col gap-8 px-6 py-4 lg:px-8`}
    >
      <AccountSection />
      <SocialSection />
    </main>
  );
}
