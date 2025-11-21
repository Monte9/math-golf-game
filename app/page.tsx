"use client";

import Link from "next/link";
import { Flag } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";

export default function Home() {
  return (
    <AppLayout>
      <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] py-12 px-4 text-center gap-8">
        <div className="flex flex-col items-center gap-4 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-text-primary tracking-tight">
            Math Golf
          </h1>
          <p className="text-lg md:text-xl text-text-muted leading-relaxed">
            A puzzle game that combines golf scoring with mathematical
            operations. Use clubs to transform numbers and reach the target in
            par strokes or fewer.
          </p>
        </div>

        <div className="flex flex-col gap-6 items-center w-full max-w-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full text-left">
            <div className="bg-header-bg/50 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
              <h3 className="font-semibold text-text-primary mb-2">Plan</h3>
              <p className="text-sm text-text-muted">
                Analyze the target number and your available clubs.
              </p>
            </div>
            <div className="bg-header-bg/50 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
              <h3 className="font-semibold text-text-primary mb-2">
                Calculate
              </h3>
              <p className="text-sm text-text-muted">
                Apply operations to reach the goal efficiently.
              </p>
            </div>
            <div className="bg-header-bg/50 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
              <h3 className="font-semibold text-text-primary mb-2">Score</h3>
              <p className="text-sm text-text-muted">
                Complete holes under par to win.
              </p>
            </div>
          </div>

          <Link
            href="/play"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-bold text-black bg-white hover:bg-gray-100 rounded-full transition-all hover:scale-105 shadow-lg hover:shadow-white/25 w-full md:w-auto"
          >
            <Flag className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            Let&apos;s Play
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}
