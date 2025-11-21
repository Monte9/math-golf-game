"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSelector({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Canonical next-themes pattern; React 19 lints this as a false positive.
  // React team has already acknowledged this is overly strict and are tracking it as an issue
  // https://github.com/facebook/react/issues/34743
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Avoid hydration mismatch: don't read/use theme until we're on the client.
  if (!mounted) return null;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <select
        id="theme-select"
        className="themeSelect w-full"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
      >
        <option value="forest">Dark Forest</option>
        <option value="cyber">Cyber Night</option>
        <option value="midnight">Midnight Neon</option>
      </select>
    </div>
  );
}
