import { useState } from "react";

export default function OnOffSwitch({ on = false }: { on?: boolean }) {
  const [isOn, setIsOn] = useState(on);

  return (
    <div className="flex items-center gap-3 text-sm">
      <p className={`${isOn ? "text-primary-foreground" : "text-muted-foreground"}`}>
        {isOn ? "Enabled" : "Disabled"}
      </p>
      <div className="switch-container h-8 w-[58px] items-center bg-base-background hover:bg-accent">
        <input
          id="autosave-switch"
          type="checkbox"
          className="peer absolute z-[1] size-full appearance-none rounded-full transition-transform hover:cursor-pointer"
          checked={isOn}
          onChange={(e) => setIsOn(e.target.checked)}
        />
        <span
          className={`switch-toggle peer-hover:neu-base p-1 text-xs text-base-background${
            isOn ? " translate-x-full" : " translate-x-0 !bg-accent"
          }`}
        >
          {isOn ? "On" : "Off"}
        </span>
      </div>
    </div>
  );
}
