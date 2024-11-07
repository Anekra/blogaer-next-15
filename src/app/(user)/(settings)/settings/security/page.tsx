import ChangePassSection from "@/lib/components/sections/security/ChangePassSection";
import OauthSection from "@/lib/components/sections/security/OauthSection";

export default function SecurityPage() {
  return (
    <main className="grid max-w-screen-2xl grid-cols-2 gap-8 px-6 py-4 lg:px-8 xxl:grid-cols-7">
      <ChangePassSection />
      <OauthSection />
    </main>
  );
}
