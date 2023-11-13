import { GameTypeProps } from "../interfaces/game_type_interface";
import { FC } from "react";
import styles from "./GamemodeOptions.module.css";

interface GamemodeOptionsProps {
  gameType: GameTypeProps;
}

const GamemodeOptions: FC<GamemodeOptionsProps> = ({ gameType }) => {
  function redirectGame() {
    window.location.href = `/${gameType.gameType}`;
  }

  return (
    <div onClick={redirectGame} className={styles["gamemode-option"]}>
      <img
        src={`https://wheres-waldo-z5t3.onrender.com${gameType.image.path}`}
        alt={gameType.gameType}
      />
      <p>{gameType.gameType}</p>
    </div>
  );
};

export default GamemodeOptions;
