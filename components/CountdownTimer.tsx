"use client";

import { useEffect, useState } from "react";

export const OFFER_END_DATE = "2026-08-31T23:59:59+05:30";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
}

function computeTimeLeft(endDate: string): TimeLeft {
  const diff = new Date(endDate).getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, expired: false };
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export default function CountdownTimer({
  endDate = OFFER_END_DATE,
}: {
  endDate?: string;
}) {
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial tick must run client-side only, to avoid a server/client mismatch on the live clock
    setTime(computeTimeLeft(endDate));
    const interval = setInterval(() => {
      setTime(computeTimeLeft(endDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [endDate]);

  if (!time) {
    return <div className="h-[76px]" aria-hidden />;
  }

  if (time.expired) {
    return (
      <div className="border border-line px-5 py-4">
        <p className="font-display text-sm font-medium tracking-wide text-muted">
          OFFER ENDED
        </p>
      </div>
    );
  }

  const units: { label: string; value: number }[] = [
    { label: "DAYS", value: time.days },
    { label: "HRS", value: time.hours },
    { label: "MINS", value: time.minutes },
    { label: "SECS", value: time.seconds },
  ];

  return (
    <div className="border border-line px-5 py-4" role="timer" aria-live="off">
      <p className="mb-3 font-display text-[11px] font-medium tracking-[0.18em] text-muted">
        OFFER ENDS IN
      </p>
      <div className="flex items-stretch gap-0">
        {units.map((u, idx) => (
          <div key={u.label} className="flex items-stretch">
            <div className="flex flex-col items-center px-3 first:pl-0 last:pr-0">
              <span className="font-mono text-2xl font-medium tnum md:text-3xl">
                {pad(u.value)}
              </span>
              <span className="mt-1 font-mono text-[10px] tracking-widest text-muted">
                {u.label}
              </span>
            </div>
            {idx < units.length - 1 && (
              <span className="self-center font-mono text-xl text-line-strong">
                :
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
