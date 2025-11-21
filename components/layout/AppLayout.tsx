import { ReactNode } from "react";
import { TopNavbar } from "./TopNavbar";
import { BottomTabBar } from "./BottomTabBar";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-main-bg font-sans text-text-primary">
      <TopNavbar />

      {/* Main Content Area - Scrollable */}
      {/* pt-16 for top navbar, pb-20 for bottom tab bar (mobile) */}
      <main className="flex-1 w-full max-w-5xl mx-auto pt-16 pb-20 md:pb-8 px-4 flex flex-col">
        <div className="flex-1 flex flex-col">{children}</div>
      </main>

      <BottomTabBar />
    </div>
  );
}
