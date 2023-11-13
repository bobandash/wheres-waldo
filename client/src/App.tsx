import styles from "./App.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import GamemodeOptions from "./components/GamemodeOptions";
import { GameTypeProps } from "./interfaces/game_type_interface";
import LoadingScreen from "./pages/Loading/LoadingScreen";

const App = () => {
  const [gameTypes, setGameTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function getGameTypes() {
      const data = (await axios.get("/api/game/gameTypes")).data;
      setGameTypes(data);
    }
    getGameTypes();
    setIsLoading(false);
  }, []);

  if(isLoading){
    return <LoadingScreen />
  }

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
