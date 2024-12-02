import AccountSection from "@/lib/components/sections/settings/account/AccountSection";
import SocialsSection from "@/lib/components/sections/settings/account/SocialsSection";

export default function AccountPage() {
  return (
    <main
      className={`flex w-full max-w-screen-xl flex-col gap-8 px-6 py-4 lg:px-8`}
    >
      <AccountSection />
      <SocialsSection />
    </main>
  );
}
