import { Input } from "@/lib/components/ui/input";

export default function ChangePassSection({ isPass }: { isPass?: boolean }) {
  return (
    <section className="col-span-9 flex min-w-[380px] flex-col gap-2 rounded-lg ql:col-span-4">
      <h2 className="text-lg font-bold">Change Password</h2>
      <div className="glass-container flex flex-col gap-6 p-6">
        <p>
          If you use oauth provider account, you can add your new password here.
          Otherwise, if you want to change your password regardless, you can
          also do it here.
        </p>
        <form className="neu-base flex w-full max-w-[428px] flex-col gap-4 self-center rounded p-4">
          {isPass && (
            <div className="flex flex-col items-start gap-2 [:first-child_&]:font-bold">
              <label htmlFor="current-password">Current password</label>
              <Input
                id="current-password"
                className="focus:border-transparent focus:bg-base-background/70"
              />
            </div>
          )}
          <div className="flex flex-col items-start gap-2 [:first-child_&]:font-bold">
            <label htmlFor="new-password">New password</label>
            <Input
              id="new-password"
              className="focus:border-transparent focus:bg-base-background/70"
            />
          </div>
          <div className="flex flex-col items-start gap-2 [:first-child_&]:font-bold">
            <label htmlFor="confirm-new-password">Confirm new password</label>
            <Input
              id="confirm-new-password"
              className="focus:border-transparent focus:bg-base-background/70"
            />
          </div>
          <button className="btn-solid-p-round mt-4 self-end">
            {isPass ? "Change password" : "Set new password"}
          </button>
        </form>
      </div>
    </section>
  );
}
