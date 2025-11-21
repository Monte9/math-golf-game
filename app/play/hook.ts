"use client";

import { useState, useMemo } from "react";
import { holes } from "@/lib/constants";

export function useHoleNavigation() {
  const [currentHoleIndex, setCurrentHoleIndex] = useState(0);
  const [current, setCurrent] = useState(holes[0].current);
  const [strokes, setStrokes] = useState(0);
  const [solutionRevealed, setSolutionRevealed] = useState(false);

  const hole = holes[currentHoleIndex];

  const goToNextHole = () => {
    if (currentHoleIndex < holes.length - 1) {
      const nextIndex = currentHoleIndex + 1;
      setCurrentHoleIndex(nextIndex);
      setCurrent(holes[nextIndex].current);
      setStrokes(0);
      setSolutionRevealed(false);
    }
  };

  const goToPrevHole = () => {
    if (currentHoleIndex > 0) {
      const prevIndex = currentHoleIndex - 1;
      setCurrentHoleIndex(prevIndex);
      setCurrent(holes[prevIndex].current);
      setStrokes(0);
      setSolutionRevealed(false);
    }
  };

  const retryHole = () => {
    setCurrent(hole.current);
    setStrokes(0);
    setSolutionRevealed(false);
  };

  const revealSolution = () => {
    setSolutionRevealed(true);
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

  const showRetryButtons = strokes > hole.par;

  return {
    hole,
    current,
    setCurrent,
    strokes,
    setStrokes,
    strokeColor,
    goToNextHole,
    goToPrevHole,
    canGoNext: currentHoleIndex < holes.length - 1,
    canGoPrev: currentHoleIndex > 0,
    currentHoleIndex,
    solutionRevealed,
    revealSolution,
    retryHole,
    showRetryButtons,
  };
}
