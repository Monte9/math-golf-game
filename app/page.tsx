"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { holes, clubs } from "@/lib/constants";
import { ThemeSelector } from "@/components/ThemeSelector";

export default function Home() {
  // TODO: Wire up dynamic hole here
  const hole = holes[2];
  const [current, setCurrent] = useState(hole.current);
  const [strokes, setStrokes] = useState(0);

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

  const strokeColor = useMemo(() => {
    if (current === hole.yards && strokes <= hole.par) {
      return "greenStroke";
    }

    if (strokes > hole.par) {
      return "redStroke";
    }

    return "yellowStroke";
  }, [current, hole.yards, hole.par, strokes]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-[20vh] bg-header-bg text-text-primary flex flex-col justify-center items-center gap-3 px-10">
        <h2 className="text-text-primary text-center m-0 text-2xl font-semibold">
          Math Golf Game
        </h2>
        <p className="text-text-muted text-center m-0">
          Reach the target yards in as few strokes as possible using your clubs.
        </p>
      </header>
      <main className="flex-1 bg-main-bg flex justify-center items-center">
        <div className="holeContent">
          <div className="holeHeader">
            {/* <button className="holeNavButton">Prev</button> */}
            <h2 className="holeTitle">Hole 1</h2>
            {/* <button className="holeNavButton">Next</button> */}
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
        </div>
      </main>
      <footer className="h-[10vh] bg-footer-bg text-text-primary flex relative justify-center items-center">
        <a
          href="https://github.com/Monte9/math-golf-game"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/github-logo.png"
            alt="Github"
            width={44}
            height={44}
            className="githubIcon"
          />
        </a>
        <ThemeSelector />
      </footer>
    </div>
  );
}
