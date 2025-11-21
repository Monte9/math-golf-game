"use client";

import Link from "next/link";
import { Flag, MessageCircle, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

export function BottomTabBar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-header-bg/90 backdrop-blur-md border-t border-white/10 z-50 flex items-center justify-around px-2">
      <Link
        href="/play"
        className={`flex flex-col items-center justify-center gap-1 w-full h-full ${
          isActive("/play") ? "text-text-primary" : "text-text-muted"
        }`}
      >
        <Flag size={24} />
        <span className="text-xs">Play</span>
      </Link>
      <Link
        href="/chat"
        className={`flex flex-col items-center justify-center gap-1 w-full h-full ${
          isActive("/chat") ? "text-text-primary" : "text-text-muted"
        }`}
      >
        <MessageCircle size={24} />
        <span className="text-xs">Chat</span>
      </Link>
      <Link
        href="/settings"
        className={`flex flex-col items-center justify-center gap-1 w-full h-full ${
          isActive("/settings") ? "text-text-primary" : "text-text-muted"
        }`}
      >
        <Settings size={24} />
        <span className="text-xs">Settings</span>
      </Link>
    </nav>
  );
}
