import { GameProps } from "../../interfaces/game_interface";
import { useGameContext } from "../Game/context/GameContext";
import styles from "./Leaderboard.module.css";
import { FC } from "react";

interface PlayerRowProps {
  playerName: string;
  indexPlayerRank: number;
  score: number;
  hasSubmittedName: boolean;
}

interface DefaultRowProps {
  gameInstance: GameProps;
  index: number;
}

interface DefaultLeaderboardRowsProps {
  gameInstances: Array<GameProps>;
  indexPlayerRank: number;
  playerName: string;
  hasSubmittedName: boolean;
}

interface InLeaderboardRowsProps {
  gameInstances: Array<GameProps>;
  indexPlayerRank: number;
  playerName: string;
  hasSubmittedName: boolean;
}

const DefaultRow: FC<DefaultRowProps> = ({ gameInstance, index }) => {
  return (
    <tr className={styles["leaderboard-row"]}>
      <td>{index + 1}</td>
      <td>{gameInstance.name}</td>
      <td>{gameInstance.score}</td>
    </tr>
  );
};

const PlayerRow: FC<PlayerRowProps> = ({
  indexPlayerRank,
  playerName,
  score,
  hasSubmittedName,
}) => {
  return (
    <tr>
      <td>{indexPlayerRank + 1}</td>
      <td>
        {!hasSubmittedName ? (
          <span className={styles["typing"]}>{playerName}</span>
        ) : (
          <span>{playerName}</span>
        )}
      </td>
      <td>{score}</td>
    </tr>
  );
};

// component for when the player is not in the leaderboard
const NotInLeaderboardRows: FC<DefaultLeaderboardRowsProps> = ({
  gameInstances,
  indexPlayerRank,
  playerName,
  hasSubmittedName,
}) => {
  const { score } = useGameContext();
  return (
    <>
      {gameInstances.map((gameInstance, index) => (
        <DefaultRow
          key={gameInstance._id}
          gameInstance={gameInstance}
          index={index}
        />
      ))}
      <PlayerRow
        indexPlayerRank={indexPlayerRank}
        playerName={playerName}
        score={score}
        hasSubmittedName={hasSubmittedName}
      />
    </>
  );
};

// component for when the player is in the leaderboard
const InLeaderboardRows: FC<InLeaderboardRowsProps> = ({
  gameInstances,
  indexPlayerRank,
  playerName,
  hasSubmittedName,
}) => {
  const { score } = useGameContext();
  return (
    <>
      {gameInstances.map((gameInstance, index) =>
        index === indexPlayerRank ? (
          <PlayerRow
            key={gameInstance._id}
            playerName={playerName}
            indexPlayerRank={indexPlayerRank}
            score={score}
            hasSubmittedName={hasSubmittedName}
          />
        ) : (
          <DefaultRow
            key={gameInstance._id}
            gameInstance={gameInstance}
            index={index}
          />
        ),
      )}
    </>
  );
};

export { NotInLeaderboardRows, InLeaderboardRows };
