import styles from "./Game.module.css";
import { useState, useEffect, useRef, useCallback } from "react";
import SelectCircle from "./SelectCircle";
import Header from "../../components/Header";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  GameTypeProps,
  exampleGameType,
} from "../../interfaces/game_type_interface";
import { WaldoProps, sampleWaldo } from "../../interfaces/waldo_interface";
import { gameStatusEnum, statusMessageEnum } from "../../constants/enum";
import { GameContext } from "./context/GameContext";
import { GameProps } from "../../interfaces/game_interface";
import Score from "../Score/Score";
import LoadingScreen from "../Loading/LoadingScreen";

function App() {
  const { gameType } = useParams();
  const sampleCoordinate = {
    posX: 0,
    posY: 0,
  };
  const [isActive, setIsActive] = useState(false);
  const [coordinates, setCoordinate] = useState(sampleCoordinate);
  const [waldos, setWaldos] = useState([sampleWaldo]);
  const [currentGameType, setCurrentGameType] =
    useState<GameTypeProps>(exampleGameType);
  const [isLoading, setIsLoading] = useState(true);
  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [gameId, setGameId] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState(gameStatusEnum.NOT_STARTED);
  const [statusMessage, setStatusMessage] = useState(statusMessageEnum.BLANK);

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    setIsActive((prevActive) => !prevActive);
    setCoordinate({
      posX: event.pageX,
      posY: event.pageY - headerHeight,
    });
    // remove error message on wrong click if image is clicked
    handleSetMessage(statusMessageEnum.BLANK);
  }

  // creates the game and sets the params
  useEffect(() => {
    // starts the game
    async function startGame() {
      const gameTypeData = {
        gameType: gameType,
      };
      const game: GameProps = (
        await axios.post(
          "https://wheres-waldo-z5t3.onrender.com/game/start",
          gameTypeData,
        )
      ).data;
      // game object has all the data relevant to the game
      setGameId(game._id);
      setScore(game.score);
      setCurrentGameType(game.gameType);
      setWaldos(game.waldoToFindRemaining);
      setIsLoading(false);
      setGameStatus(game.status);
    }

    startGame();
  }, [gameType]);

  // get header height to ensure that clicks are placed correctly
  useEffect(() => {
    if (headerRef.current != null) {
      setHeaderHeight(headerRef.current.clientHeight);
    }
  }, [isLoading]);

  useEffect(() => {
    async function incrementScore() {
      const gameIdData = {
        gameId: gameId,
      };
      await axios.put(
        "https://wheres-waldo-z5t3.onrender.com/game/update-score",
        gameIdData,
      );
      setScore((prevState) => prevState + 1);
    }

    if (gameStatus === gameStatusEnum.IN_PROGRESS) {
      const interval = setInterval(() => {
        incrementScore();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameStatus, gameId]);

  // used to get window size to determine the image dimensions (image is always 100% window width)
  const handleWindowResize = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    if (headerRef.current != null) {
      setHeaderHeight(headerRef.current.clientHeight);
    }
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [handleWindowResize]);

  // helper functions for setting waldos and game status
  function handleWaldos(waldos: Array<WaldoProps>) {
    setWaldos(waldos);
  }

  function handleGameStatus(status: string) {
    setGameStatus(status);
  }

  function handleSetMessage(message: string) {
    setStatusMessage(message);
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (gameStatus === gameStatusEnum.COMPLETED) {
    return (
      <GameContext.Provider
        value={{
          coordinates: coordinates,
          imageDimensions: currentGameType.dimensions,
          windowWidth,
          handleWaldos,
          handleGameStatus,
          handleSetMessage,
          gameId,
          headerHeight,
          score,
          waldos,
          gameTypeName: currentGameType.gameType,
        }}
      >
        <div className={styles["screen-size"]}>
          <Header ref={headerRef} waldos={waldos} score={score} />
          <div className={styles["img-container"]}>
            <img
              src={`https://wheres-waldo-z5t3.onrender.com${currentGameType.image.path}`}
            />
            <Score />
          </div>
        </div>
      </GameContext.Provider>
    );
  }

  return (
    <GameContext.Provider
      value={{
        coordinates: coordinates,
        imageDimensions: currentGameType.dimensions,
        windowWidth,
        handleWaldos,
        handleGameStatus,
        handleSetMessage,
        gameId,
        headerHeight,
        score,
        waldos,
        gameTypeName: currentGameType.gameType,
      }}
    >
      <Header ref={headerRef} waldos={waldos} score={score} />
      <div onClick={handleClick} className={styles["img-container"]}>
        {statusMessage === statusMessageEnum.ERROR && (
          <span className={`${styles["error"]} ${styles.message}`}>
            {statusMessage}
          </span>
        )}
        {statusMessage === statusMessageEnum.SUCCESS && (
          <span className={`${styles["success"]} ${styles.message}`}>
            {statusMessage}
          </span>
        )}
        <img
          src={`https://wheres-waldo-z5t3.onrender.com${currentGameType.image.path}`}
        />
        {isActive && <SelectCircle />}
      </div>
    </GameContext.Provider>
  );
}

export default App;
