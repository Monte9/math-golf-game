"use client";

import Link from "next/link";
import { Flag, MessageCircle, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

export function TopNavbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-header-bg/80 backdrop-blur-md border-b border-white/10 z-50 flex items-center justify-center md:justify-between px-4 md:px-8">
      <div className="flex items-center gap-2">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <h1 className="text-xl font-bold text-text-primary">Math Golf</h1>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6">
        <Link
          href="/play"
          className={`flex items-center gap-2 transition-colors ${
            isActive("/play")
              ? "text-text-primary"
              : "text-text-muted hover:text-text-primary"
          }`}
        >
          <Flag size={20} />
          <span>Play</span>
        </Link>
        <Link
          href="/chat"
          className={`flex items-center gap-2 transition-colors ${
            isActive("/chat")
              ? "text-text-primary"
              : "text-text-muted hover:text-text-primary"
          }`}
        >
          <MessageCircle size={20} />
          <span>Chat</span>
        </Link>
        <Link
          href="/settings"
          className={`flex items-center gap-2 transition-colors ${
            isActive("/settings")
              ? "text-text-primary"
              : "text-text-muted hover:text-text-primary"
          }`}
        >
          <Settings size={20} />
          <span>Settings</span>
        </Link>
      </div>
    </nav>
  );
}
