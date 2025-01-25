"use client";
import { getBrowserFingerprint } from "fingerprint-browser";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

import getClientFetch from "@/lib/actions/client/getClientFetch";
import GoogleLoginBtn from "@/lib/components/buttons/GoogleLoginBtn";
import SavedAccountCard from "@/lib/components/cards/SavedAccountCard";
import LoginForm from "@/lib/components/forms/LoginForm";
import { SavedAccountsDto } from "@/lib/types/dto/CommonDto";
import { GetSavedAccounts } from "@/lib/types/dto/GetDto";

export default function SavedAccountCardsHolder() {
  const [isSavedAccounts, setIsSavedAccounts] = useState(true);
  const [currentData, setCurrentData] = useState<SavedAccountsDto[] | null>(
    null
  );
  const { data: res } = useSWR<GetSavedAccounts>(
    `/saved-accounts/`,
    async (url: string) => {
      const clientId = getBrowserFingerprint();
      return await getClientFetch(`${url}${clientId}`);
    }
  );
  const handleOnClick = () => setIsSavedAccounts(false);

  useEffect(() => {
    if (res?.data) setCurrentData(res.data);
  }, [setCurrentData, res]);

  return (
    <React.Fragment>
      {currentData && currentData?.length > 0 && isSavedAccounts ? (
        currentData.map((account, i) => (
          <SavedAccountCard
            index={i}
            account={account}
            savedAccounts={currentData}
            setSavedAccounts={setCurrentData}
            key={i}
          />
        ))
      ) : (
        <LoginForm />
      )}
      <div className="flex flex-col gap-4">
        <div className="mt-2 flex items-center">
          <hr className="h-1 w-full border-none bg-gradient-to-l from-foreground" />
          <p className="w-fit shrink-0 px-2 text-center text-sm">
            {currentData && currentData?.length > 0 && isSavedAccounts
              ? "Or"
              : "Or login with"}
          </p>
          <hr className="h-1 w-full border-none bg-gradient-to-r from-foreground" />
        </div>
        <div className="flex justify-center gap-6 p-4">
          {currentData && currentData?.length > 0 && isSavedAccounts ? (
            <button
              className="btn-outline-p bg-background/50"
              onClick={handleOnClick}
            >
              Login with different account
            </button>
          ) : (
            <GoogleLoginBtn />
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
