"use client";
import { ShieldAlertIcon, SmartphoneIcon } from "lucide-react";
import { useEffect, useState } from "react";

import UserTwoFADialog from "@/lib/components/dialogs/UserTwoFADialog";
import WebAuthnAddForm from "@/lib/components/forms/settings/two-fa/WebAuthnAddForm";
import WebAuthnDeleteForm from "@/lib/components/forms/settings/two-fa/WebAuthnDeleteForm";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/lib/components/ui/select";
import OnOffSwitch from "@/lib/components/widgets/OnOffSwitch";
import { TwoFADto } from "@/lib/types/dto/CommonDto";

export default function TwoFASection({ data }: { data?: TwoFADto }) {
  const [currentData, setCurrentData] = useState(data);
  const handleDataChange = (updatedData: Partial<TwoFADto>) => {
    setCurrentData((prevData) => ({ ...prevData, ...updatedData }));
  };
  const setIsPasskey = (value: boolean) => {
    handleDataChange({ isPasskey: value });
  };
  const handleTwoFAMethodChange = (value: string) => {
    handleDataChange({ twoFAMethod: value });
  };

  useEffect(() => {
    setCurrentData(data);
  }, [data]);

  return (
    <section className="col-span-9 flex min-w-[420px] flex-col gap-2 rounded-lg ql:col-span-5">
      <h2 className="text-lg font-bold">Two Factor Authentications</h2>
      <div className="glass-container flex flex-col items-center gap-6 p-6 [&>*]:w-full [&>*]:max-w-[538px]">
        <div className="neu-base flex flex-col rounded">
          <h3 className="rounded-t-sm bg-base-foreground/10 px-4 py-2 text-center font-semibold">
            Overview
          </h3>
          <div className="flex flex-col gap-4 p-4">
            <div className="flex items-center justify-between gap-2">
              <p>2 FA status</p>
              {currentData?.isPasskey ? (
                <OnOffSwitch on={currentData.isPasskey} />
              ) : (
                <div className="group cursor-default">
                  <span className="flex gap-2 py-2 text-muted-foreground group-hover:hidden">
                    No methods have been added
                    <ShieldAlertIcon />
                  </span>
                  <UserTwoFADialog setIsPasskey={setIsPasskey} />
                </div>
              )}
            </div>
            <div className="flex items-center justify-between gap-2">
              <p>Preferred 2 FA method</p>
              <Select
                value={currentData?.twoFAMethod || "passkey"}
                onValueChange={handleTwoFAMethodChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Passkey" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="passkey">Passkey</SelectItem>
                    <SelectItem value="authApp">Auth app</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="neu-base flex flex-col rounded">
          <h3 className="rounded-t-sm bg-base-foreground/10 px-4 py-2 text-center font-semibold">
            Methods
          </h3>
          <div className="flex flex-col gap-4 p-4">
            {currentData?.isPasskey ? (
              <WebAuthnDeleteForm setIsPasskey={setIsPasskey} />
            ) : (
              <WebAuthnAddForm setIsPasskey={setIsPasskey} />
            )}
            {/* to be continued... */}
            <form
              method="post"
              onSubmit={() => {}}
              className="flex items-center justify-between gap-2"
            >
              <span className="flex gap-2">
                <SmartphoneIcon />
                <label>Authenticator app</label>
              </span>
              <button type="submit" className="btn-solid-base-round">
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
