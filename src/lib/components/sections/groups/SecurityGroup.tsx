"use client";
import React from "react";
import useSWRImmutable from "swr/immutable";

import getClientFetch from "@/lib/actions/client/getClientFetch";
import ChangePassSection from "@/lib/components/sections/settings/security/ChangePassSection";
import OauthSection from "@/lib/components/sections/settings/security/OauthSection";
import TwoFASection from "@/lib/components/sections/settings/security/TwoFASection";
import { GetSecurityDto } from "@/lib/types/dto/GetDto";

export default function SecurityGroup() {
  const { data: res } = useSWRImmutable<GetSecurityDto>(
    "/user/security",
    getClientFetch
  );

  return (
    <main className="grid w-full max-w-screen-2xl grid-cols-9 gap-8 px-6 py-4 lg:px-8">
      <React.Fragment>
        <ChangePassSection isPass={res?.data.userPassword} />
        <TwoFASection data={res?.data.userTwoFA} />
        <OauthSection data={res?.data.userOauth} />
      </React.Fragment>
    </main>
  );
}
