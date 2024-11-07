"use client";
import { createContext, ReactNode, useContext, useState } from "react";

import LoadingSpinnerIcon from "@/lib/components/icons/LoadingSpinnerIcon";

const LoadingContext = createContext({
  isLoading: false,
  setLoading: (_: boolean) => {}
});

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {isLoading && (
        <div className="absolute z-10 flex size-full cursor-progress items-center justify-center bg-black/25 text-9xl backdrop-blur-[2px]">
          <LoadingSpinnerIcon />
        </div>
      )}
      {children}
    </LoadingContext.Provider>
  );
}

export const useLoading = () => useContext(LoadingContext);
