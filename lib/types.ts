export type Difficulty = "easy" | "medium" | "hard";

export type ClubTier = "basic" | "premium" | "elite";

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
