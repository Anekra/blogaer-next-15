import { Input } from "@/lib/components/ui/input";

export default function ChangePassSection() {
  return (
    <section className="flex flex-col gap-2 rounded-lg xxl:col-span-3 xxl:max-w-[464px]">
      <h2 className="text-lg font-bold">Change Password</h2>
      <div className="glass-container p-6">
        <p>
          If you use oauth provider account please set your new password here.
          Otherwise, if you want to change your password regardless, you can
          also do it here.
        </p>
        <form className="neu-base mt-4 flex flex-col gap-4 rounded p-4">
          <div className="flex flex-col gap-2 [:first-child_&]:font-bold">
            <label htmlFor="current-password">Current password</label>
            <Input id="current-password" />
          </div>
          <div className="flex flex-col gap-2 [:first-child_&]:font-bold">
            <label htmlFor="new-password">New password</label>
            <Input id="new-password" />
          </div>
          <div className="flex flex-col gap-2 [:first-child_&]:font-bold">
            <label htmlFor="confirm-new-password">Confirm new password</label>
            <Input id="confirm-new-password" />
          </div>
          <button className="btn-solid-p self-start">Set new password</button>
        </form>
      </div>
    </section>
  );
}
