"use client";

import { clubs } from "@/lib/constants";
import { AppLayout } from "@/components/layout/AppLayout";
import { useHoleNavigation } from "./hook";
import { formatSolution } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PlayPage() {
  const {
    hole,
    current,
    setCurrent,
    strokes,
    setStrokes,
    strokeColor,
    goToNextHole,
    goToPrevHole,
    canGoNext,
    canGoPrev,
    solutionRevealed,
    revealSolution,
    retryHole,
    showRetryButtons,
  } = useHoleNavigation();

  const handleAction = (clubKey: string) => {
    // TODO: we default to basic clubs here
    // In the future we can add different tiers
    const club = clubs[clubKey as keyof typeof clubs]?.basic;
    if (!club) {
      console.warn("Invalid club:", clubKey);
      return;
    }

    setCurrent((prev) => club.formula(prev));
    setStrokes((prev) => prev + 1);
  };

  return (
    <AppLayout>
      <div className="flex-1 flex justify-center items-center min-h-[60vh] py-8">
        <div className="holeContent">
          <div className="holeHeader">
            <button
              className="holeNavButton"
              onClick={goToPrevHole}
              disabled={!canGoPrev}
              aria-label="Previous hole"
            >
              <ChevronLeft size={20} />
            </button>
            <h2 className="holeTitle">Hole {hole.id}</h2>
            <button
              className="holeNavButton"
              onClick={goToNextHole}
              disabled={!canGoNext}
              aria-label="Next hole"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="text-center mb-2">
            <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full bg-white/10 text-text-muted capitalize">
              Difficulty: {hole.difficulty}
            </span>
          </div>
          <div className="holeInfo">
            <div className="holeInfoRow">
              <p className="yardsTitle">Yards: {hole.yards}</p>
              <p className="parTitle">Par: {hole.par}</p>
            </div>
            <div className="holeInfoRow">
              <p className="currentTitle">Current: {current}</p>
              <p className={`strokeTitle ${strokeColor}`}>Strokes: {strokes}</p>
            </div>
          </div>
          <div className="clubsContainer">
            {Object.entries(clubs).map(([key, club]) => {
              return (
                <button
                  key={key}
                  className="clubButton"
                  onClick={() => handleAction(key)}
                >
                  {club.basic.title}
                </button>
              );
            })}
          </div>

          {/* Always render container to reserve space and prevent layout jump */}
          <div
            className="mt-6 flex flex-col gap-3"
            style={{ minHeight: "140px" }}
          >
            {/* Show message card when hole is completed or par is exceeded */}
            {((current === hole.yards && strokes > 0) || showRetryButtons) && (
              <>
                <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10 flex flex-col items-center gap-3">
                  {/* Success message when at or under par */}
                  {current === hole.yards && strokes <= hole.par && (
                    <p className="text-base text-text-accent-green font-semibold">
                      {strokes === hole.par
                        ? "You made par! ⛳"
                        : `${hole.par - strokes} under par! 🎉`}
                    </p>
                  )}

                  {/* Message and button when par is exceeded */}
                  {showRetryButtons && (
                    <>
                      <p className="text-base text-text-accent-red font-semibold">
                        You have exceeded par 🖍️
                      </p>

                      {/* Show Reveal Solution button if not yet revealed */}
                      {!solutionRevealed ? (
                        <button
                          onClick={revealSolution}
                          className="text-sm text-text-primary hover:text-text-muted transition-colors underline cursor-pointer"
                        >
                          Reveal Solution
                        </button>
                      ) : (
                        /* Show solution text when revealed */
                        hole.solution && (
                          <div className="flex flex-col gap-2">
                            <p className="text-sm text-text-muted font-medium">
                              {formatSolution(hole.solution)}
                            </p>
                          </div>
                        )
                      )}
                    </>
                  )}
                </div>

                {/* Retry button when par is exceeded */}
                {showRetryButtons && (
                  <div className="flex justify-center">
                    <button
                      onClick={retryHole}
                      className="holeNavButton px-6"
                      style={{ width: "auto" }}
                    >
                      Retry
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
