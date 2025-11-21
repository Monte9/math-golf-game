"use client";

import { MessageCircle } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";

export default function ChatPage() {
  return (
    <AppLayout>
      <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] text-center gap-4">
        <div className="bg-header-bg/50 p-6 rounded-full border border-white/10 backdrop-blur-sm mb-4">
          <MessageCircle size={48} className="text-text-primary opacity-50" />
        </div>
        <h1 className="text-3xl font-bold text-text-primary">Chat</h1>
        <p className="text-text-muted text-lg">Coming soon</p>
      </div>
    </AppLayout>
  );
}
