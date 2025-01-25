export default function ChangePassSection({ isPass }: { isPass?: boolean }) {
  return (
    <section className="col-span-12 flex min-w-[380px] flex-col gap-2 rounded-lg ql:col-span-6">
      <h2 className="text-lg font-bold">Change Password</h2>
      <form className="glass-container flex flex-1 flex-col gap-6 p-6">
        <p>
          An email will be sent to your registered email address. This email
          will contain a link to create a new password or update your existing
          one.
        </p>
        <div className="flex h-full items-center justify-center">
          <button type="submit" className="btn-solid-p-rounder ql:p-6">
            {isPass ? "Request change password" : "Request new password"}
          </button>
        </div>
      </form>
    </section>
  );
}
