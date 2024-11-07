import AppleIcon from "@/lib/components/icons/AppleIcon";
import FacebookIcon from "@/lib/components/icons/FacebookIcon";
import GithubIcon from "@/lib/components/icons/GithubIcon";
import GitlabIcon from "@/lib/components/icons/GitlabIcon";
import GoogleIcon from "@/lib/components/icons/GoogleIcon";
import InstagramIcon from "@/lib/components/icons/InstagramIcon";
import MicrosoftIcon from "@/lib/components/icons/MicrosoftIcon";
import XIcon from "@/lib/components/icons/XIcon";

export default function OauthSection() {
  return (
    <section className="flex flex-col gap-2 rounded-lg xxl:col-span-4">
      <h2 className="text-lg font-bold">Oauth Login</h2>
      <div className="glass-container grid grid-cols-1 justify-items-center gap-4 p-6 xxl:grid-cols-2 xxl:justify-items-stretch [&>*]:min-w-[270px]">
        <button className="btn-outline-base flex items-center gap-2">
          <span className="relative size-7 rounded-3xl bg-foreground text-2xl [&>*]:absolute [&>*]:inset-x-[8.2%] [&>*]:bottom-[-1.5px] [&>*]:fill-background [&>*]:stroke-background">
            <GithubIcon />
          </span>
          Add login with Github
        </button>
        <button className="btn-outline-google flex items-center gap-2">
          <span className="text-3xl">
            <GoogleIcon colored />
          </span>
          Add login with Google
        </button>
        <button className="btn-outline-base flex items-center gap-2">
          <span className="text-3xl">
            <AppleIcon />
          </span>
          Add login with Apple
        </button>
        <button className="btn-outline-gitlab flex items-center gap-2">
          <span className="text-3xl [&>*]:fill-[#E24329] [&>*]:stroke-none">
            <GitlabIcon />
          </span>
          Add login with Gitlab
        </button>
        <button className="btn-outline-base flex items-center gap-2">
          <span className="text-2xl">
            <XIcon />
          </span>
          Add login with X
        </button>
        <button className="btn-outline-instagram flex items-center gap-2">
          <span className="gradient-instagram rounded-lg text-3xl [&>*]:fill-custom-bg1 [&>*]:stroke-transparent">
            <InstagramIcon />
          </span>
          Add login with Instagram
        </button>
        <button className="btn-outline-facebook flex items-center gap-2">
          <span className="text-3xl [&>*]:fill-[#1877F2] [&>*]:stroke-transparent">
            <FacebookIcon />
          </span>
          Add login with Facebook
        </button>
        <button className="btn-outline-microsoft flex items-center gap-2">
          <span className="text-3xl">
            <MicrosoftIcon />
          </span>
          Add login with Microsoft
        </button>
      </div>
    </section>
  );
}
