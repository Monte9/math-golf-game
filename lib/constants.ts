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
  // Easy Holes (Par 2)
  {
    id: 1,
    difficulty: "easy",
    yards: 23,
    par: 2,
    current: 10, // Solution: 10 x2=20, 20 +3=23
    solution: ["driver", "putter"],
  },
  {
    id: 2,
    difficulty: "easy",
    yards: 13,
    par: 2,
    current: 9, // Solution: 9 x2=18, 18 -5=13
    solution: ["driver", "wedge"],
  },
  {
    id: 3,
    difficulty: "easy",
    yards: 9,
    par: 2,
    current: 12, // Solution: 12 /2=6, 6 +3=9
    solution: ["wood", "putter"],
  },

  // Medium Holes (Par 3)
  {
    id: 4,
    difficulty: "medium",
    yards: 38,
    par: 3,
    current: 20, // Solution: 20 x2=40, 40 -5=35, 35 +3=38
    solution: ["driver", "wedge", "putter"],
  },
  {
    id: 5,
    difficulty: "medium",
    yards: 11,
    par: 3,
    current: 18, // Solution: 18 -5=13, 13 -5=8, 8 +3=11
    solution: ["wedge", "wedge", "putter"],
  },

  // Hard Holes (Par 4)
  {
    id: 6,
    difficulty: "hard",
    yards: 67,
    par: 4,
    current: 34, // Solution: 34 -5=29, 29 +3=32, 32 x2=64, 64 +3=67
    solution: ["wedge", "putter", "driver", "putter"],
  },
  {
    id: 7,
    difficulty: "hard",
    yards: 91,
    par: 4,
    current: 50, // Solution: 50 -5=45, 45 +3=48, 48 x2=96, 96 -5=91
    solution: ["wedge", "putter", "driver", "wedge"],
  },

  // Expert Holes (Par 5-6) - Super Challenging!
  {
    id: 8,
    difficulty: "expert",
    yards: 147,
    par: 5,
    current: 38, // Solution: 38 -5=33, 33 +3=36, 36 x2=72, 72 x2=144, 144 +3=147
    solution: ["wedge", "putter", "driver", "driver", "putter"],
  },
  {
    id: 9,
    difficulty: "expert",
    yards: 130,
    par: 6,
    current: 11, // Solution: 11 +3=14, 14 x2=28, 28 +3=31, 31 x2=62, 62 +3=65, 65 x2=130
    solution: ["putter", "driver", "putter", "driver", "putter", "driver"],
  },
  {
    id: 10,
    difficulty: "expert",
    yards: 189,
    par: 6,
    current: 21, // Solution: 21 x2=42, 42 +3=45, 45 x2=90, 90 +3=93, 93 x2=186, 186 +3=189
    solution: ["driver", "putter", "driver", "putter", "driver", "putter"],
  },
];
