"use client";

import { Moon, Info } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { ThemeSelector } from "@/components/ThemeSelector";

export default function SettingsPage() {
  return (
    <AppLayout>
      <div className="flex-1 flex flex-col gap-6 py-8 max-w-md mx-auto w-full">
        <h1 className="text-2xl font-bold text-text-primary px-2">Settings</h1>

        {/* Theme Section Card */}
        <div className="bg-header-bg/50 border border-white/10 rounded-xl p-6 flex flex-col gap-4 backdrop-blur-sm">
          <div className="flex items-center gap-3 text-text-primary">
            <Moon size={24} />
            <h2 className="text-lg font-semibold">Theme</h2>
          </div>

          <div className="w-full">
            <ThemeSelector className="w-full" />
          </div>
        </div>

        {/* About Section */}
        <div className="bg-header-bg/50 border border-white/10 rounded-xl p-6 flex flex-col gap-4 backdrop-blur-sm">
          <div className="flex items-center gap-3 text-text-primary">
            <Info size={24} />
            <h2 className="text-lg font-semibold">About</h2>
          </div>

          <p className="text-sm text-text-muted leading-relaxed">
            A puzzle game that combines golf scoring with mathematical
            operations. Use clubs to transform numbers and reach the target in
            par strokes or fewer.
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <span className="text-sm text-text-muted">
              Made by: Monte Thakkar
            </span>
            <a
              href="http://x.com/montethakkar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-primary hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-5 w-5 fill-current"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-auto pt-8 flex flex-col items-center justify-center gap-6 opacity-80">
          <a
            href="https://github.com/nexuslabsx/math-golf-game"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform hover:opacity-100"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-10 h-10"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} Math Golf Game
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
