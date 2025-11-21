"use client";

import { useState, useMemo } from "react";
import { holes, clubs } from "@/lib/constants";
import { AppLayout } from "@/components/layout/AppLayout";

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
    <AppLayout>
      <div className="flex-1 flex justify-center items-center min-h-[60vh] py-8">
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
      </div>
    </AppLayout>
  );
}
