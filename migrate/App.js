import { useState, useMemo } from "react";
import { holes, clubs } from "./constants";
import "./styles.css";

export default function App() {
  const [theme, setTheme] = useState("forest");

  // TODO: Wire up dynamic hole here
  const hole = holes[2];
  const [current, setCurrent] = useState(hole.current);
  const [strokes, setStrokes] = useState(0);

  const handleAction = (clubKey) => {
    // TODO: we default to basic clubs here
    // In the future we can add different tiers
    const club = clubs[clubKey]?.basic;
    if (!club) {
      console.warn("Invalid club:", clubKey);
      return;
    }

    setCurrent((prev) => club.formula(prev));
    setStrokes((prev) => prev + 1);
  };

  const strokeColor = useMemo(() => {
    let color = "yellowStroke";

    if (current === hole.yards && strokes <= hole.par) {
      color = "greenStroke";
    } else if (strokes > hole.par) {
      color = "redStroke";
    }

    return color;
  }, [strokes, hole.par]);

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  return (
    <div className={`app theme-${theme}`}>
      <header className="headerBar">
        <h2 className="appTitle">Math Golf Game</h2>
        <p className="appSubtitle">
          Reach the target yards in as few strokes as possible using your clubs.
        </p>
      </header>
      <main className="mainArea">
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
      <footer className="footerBar">
        <a
          href="https://github.com/monte9"
          target="_blank"
          rel="noopener noreferre"
        >
          <img src="/github-logo.png" alt="Github" className="githubIcon" />
        </a>
        <div className="themeDropdown">
          <select
            id="theme-select"
            className="themeSelect"
            value={theme}
            onChange={handleThemeChange}
          >
            <option value="forest">Dark Forest</option>
            <option value="cyber">Cyber Night</option>
            <option value="midnight">Midnight Neon</option>
          </select>
        </div>
      </footer>
    </div>
  );
}
