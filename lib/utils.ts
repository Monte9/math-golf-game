import type { ClubKey } from "./types";

export function formatSolution(solution: ClubKey[]): string {
  if (solution.length === 0) return "";
  if (solution.length === 1) return capitalize(solution[0]);

  // Format all but the last item
  const allButLast = solution.slice(0, -1).map((club, index) => {
    if (index === 0) {
      return `First ${capitalize(club)}`;
    }
    return `then ${capitalize(club)}`;
  });

  // Format the last item
  const last = `and finish with ${capitalize(solution[solution.length - 1])}`;

  return `${allButLast.join(", ")} ${last}`;
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
