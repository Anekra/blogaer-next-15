import { ReactNode, useEffect, useState } from "react";

import LoadingSpinnerIcon from "@/lib/components/icons/LoadingSpinnerIcon";

export default function CountdownTimer({
  children: dialog,
  timeLimit
}: {
  children: ReactNode;
  timeLimit: number;
}) {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const countdown = setInterval(() => {
      const now = Date.now();
      let remainingTime = timeLimit - now;
      if (remainingTime <= 0) {
        remainingTime = 0;
        clearInterval(countdown);
      }
      setTimer(remainingTime);
    }, 1000);
  }, [timeLimit, setTimer]);

  const displayTimer = (time: number) => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const days = Math.floor(time / (1000 * 60 * 60 * 24));

    return (
      <div className="flex flex-col gap-4">
        {timer === timeLimit && timer > 0 ? (
          <span className="text-4xl">
            <LoadingSpinnerIcon />
          </span>
        ) : (
          <div className="neu-base relative flex items-center justify-center gap-4 rounded-2xl p-4 font-bold">
            {timer <= 0 && (
              <div className="absolute flex size-full items-center justify-center rounded-2xl bg-secondary/90 py-4 text-center text-3xl">
                <p>Time Expired</p>
              </div>
            )}
            {days > 0 && (
              <div className="flex flex-col items-center gap-4">
                <div className="neu-base-inset flex size-24 flex-col flex-wrap items-center justify-center gap-2 rounded-2xl p-2">
                  <p className="text-5xl text-secondary-foreground">{days}</p>
                </div>
                <p>Days</p>
              </div>
            )}
            {hours > 0 && (
              <div className="flex flex-col items-center gap-4">
                <div className="neu-base-inset flex size-24 flex-col flex-wrap items-center justify-center gap-2 rounded-2xl p-2">
                  <p className="text-5xl text-secondary-foreground">{hours}</p>
                </div>
                <p>Hours</p>
              </div>
            )}
            <div className="flex flex-col items-center gap-4">
              <div className="neu-base-inset flex size-24 flex-col flex-wrap items-center justify-center gap-2 rounded-2xl p-2">
                <p className="text-5xl text-secondary-foreground">{minutes}</p>
              </div>
              <p>Min</p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="neu-base-inset flex size-24 flex-col flex-wrap items-center justify-center gap-2 rounded-2xl p-2">
                <p className="text-5xl text-secondary-foreground">{seconds}</p>
              </div>
              <p>Sec</p>
            </div>
          </div>
        )}
        {timer <= 0 && dialog}
      </div>
    );
  };

  return displayTimer(timer);
}
