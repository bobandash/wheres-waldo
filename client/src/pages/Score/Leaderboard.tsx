import { useState, useEffect } from "react";
import axios from "axios";
import { GameProps } from "../../interfaces/game_interface";
import styles from "./Leaderboard.module.css";
import NameForm from "./NameForm";
import { useGameContext } from "../Game/context/GameContext";
import { InLeaderboardRows, NotInLeaderboardRows } from "./LeaderboardRows";
import RedirectButtons from "./RedirectButtons";

const Leaderboard = () => {
  const { gameTypeName, gameId } = useGameContext();
  const [gameInstances, setGameInstances] = useState<Array<GameProps>>([]);
  // stores the player's rank on the leaderboard
  const [indexPlayerRank, setIndexPlayerRank] = useState(-1);
  const [isInLeaderboard, setIsInLeaderboard] = useState(false);
  const [name, setName] = useState("");
  const [hasSubmittedName, setHasSubmittedName] = useState(false);
  function handleName(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function handleSubmittedName() {
    setHasSubmittedName(true);
  }

  useEffect(() => {
    const MAX_RANK_TO_DISPLAY = 20;
    async function getLeaderboardRank() {
      const data: Array<GameProps> = (
        await axios.get("https://wheres-waldo-z5t3.onrender.com/game", {
          params: {
            completed: true,
            order: 1,
            gameTypeName: gameTypeName,
          },
        })
      ).data;
      const playerRank = data.map((data) => data._id).indexOf(gameId);
      if (playerRank >= 0 && playerRank < MAX_RANK_TO_DISPLAY) {
        setIndexPlayerRank(playerRank);
        setIsInLeaderboard(true);
      }
    }

    async function getCompletedGames() {
      const data = (
        await axios.get("https://wheres-waldo-z5t3.onrender.com/game", {
          params: {
            completed: true,
            limit: MAX_RANK_TO_DISPLAY,
            order: 1,
            gameTypeName: gameTypeName,
          },
        })
      ).data;
      setGameInstances(data);
    }

    async function getInitialStates() {
      await Promise.all([getLeaderboardRank(), getCompletedGames()]);
    }
    getInitialStates();
  }, [gameTypeName, gameId]);

  return (
    <>
      <div className={styles["leaderboard-container"]}>
        <h1>Leaderboard</h1>
        <table className={styles["table"]}>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {!isInLeaderboard ? (
              <NotInLeaderboardRows
                hasSubmittedName={hasSubmittedName}
                gameInstances={gameInstances}
                indexPlayerRank={indexPlayerRank}
                playerName={name}
              />
            ) : (
              <InLeaderboardRows
                hasSubmittedName={hasSubmittedName}
                gameInstances={gameInstances}
                indexPlayerRank={indexPlayerRank}
                playerName={name}
              />
            )}
          </tbody>
        </table>
        <NameForm
          name={name}
          handleName={handleName}
          handleSubmittedName={handleSubmittedName}
          hasSubmittedName={hasSubmittedName}
        />
      </div>
      {hasSubmittedName && <RedirectButtons />}
    </>
  );
};

export default Leaderboard;
