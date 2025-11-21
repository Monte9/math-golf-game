export type Difficulty = "easy" | "medium" | "hard" | "expert";

export type ClubTier = "basic" | "premium" | "elite";

export type ClubKey = "driver" | "wood" | "wedge" | "putter";

export type Club = {
  title: string;
  formula: (x: number) => number;
};

export type ClubConfig = {
  basic: Club;
  premium?: Club;
  elite?: Club;
};

export type Clubs = {
  driver: ClubConfig;
  wood: ClubConfig;
  wedge: ClubConfig;
  putter: ClubConfig;
};

export type Hole = {
  id: number;
  difficulty: Difficulty;
  yards: number;
  par: number;
  current: number;
  solution?: ClubKey[];
};

export type GameState = {
  currentHoleIndex: number;
  strokes: number;
  current: number;
  theme: string;
};

export type Course = {
  id: number;
  name: string;
  holes: Hole[];
  totalPar: number;
};
