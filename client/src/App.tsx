import styles from "./App.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import GamemodeOptions from "./components/GamemodeOptions";
import { GameTypeProps } from "./interfaces/game_type_interface";

const App = () => {
  const [gameTypes, setGameTypes] = useState([]);
  useEffect(() => {
    async function getGameTypes() {
      const data = (await axios.get("/api/game/gameTypes")).data;
      setGameTypes(data);
    }
    getGameTypes();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Select The Mode</h1>
      <div className={styles["gamemode-options-container"]}>
        {gameTypes.map((gameType: GameTypeProps) => (
          <GamemodeOptions key={gameType._id} gameType={gameType} />
        ))}
      </div>
    </div>
  );
};

export default App;
