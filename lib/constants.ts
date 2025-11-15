import type { Clubs, Hole } from "./types";

export const clubs: Clubs = {
  driver: {
    basic: {
      title: "Driver (x2)",
      formula: (x: number) => x * 2,
    },
  },
  wood: {
    basic: {
      title: "Wood (/2)",
      formula: (x: number) => Math.floor(x / 2),
    },
  },
  wedge: {
    basic: {
      title: "Wedge (-5)",
      formula: (x: number) => x - 5,
    },
  },
  putter: {
    basic: {
      title: "Putter (+3)",
      formula: (x: number) => x + 3,
    },
  },
};

export const holes: Hole[] = [
  {
    id: 1,
    difficulty: "easy",
    yards: 23,
    par: 2,
    current: 10,
  },
  {
    id: 2,
    difficulty: "medium",
    yards: 38,
    par: 3,
    current: 20,
  },
  {
    id: 3,
    difficulty: "hard",
    yards: 78,
    par: 4,
    current: 20,
  },
];
