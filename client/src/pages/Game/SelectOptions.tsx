import { FC } from "react";
import { WaldoProps } from "../../interfaces/waldo_interface";
import styles from "./SelectOptions.module.css";
import { useGameContext } from "./context/GameContext";
import axios from "axios";
import { GameProps } from "../../interfaces/game_interface";
import { gameStatusEnum, statusMessageEnum } from "../../constants/enum";

interface SelectOptionProps {
  waldo: WaldoProps;
}

interface standardizeDimensionsProps {
  windowWidth: number;
  imageDimensions: {
    width: number;
    height: number;
  };
  coordinates: {
    posX: number;
    posY: number;
  };
  headerHeight: number;
}

const SelectOption: FC<SelectOptionProps> = ({ waldo }) => {
  // TO-DO: need to pass by setWaldo
  const {
    windowWidth,
    imageDimensions,
    coordinates,
    headerHeight,
    gameId,
    waldos,
    handleSetMessage,
    handleWaldos,
    handleGameStatus,
  } = useGameContext();

  // converts coordinates and values of the current window and transform it to the pixels in the database
  const standardizeDimensions = ({
    windowWidth,
    imageDimensions,
    coordinates,
  }: standardizeDimensionsProps) => {
    const imageScale = imageDimensions.width / windowWidth;
    const { posX, posY } = coordinates;

    const standardizedX = imageScale * posX;
    const standardizedY = imageScale * posY;
    return { standardizedX, standardizedY };
  };
  const { standardizedX, standardizedY } = standardizeDimensions({
    windowWidth,
    imageDimensions,
    coordinates,
    headerHeight,
  });
  const data = {
    gameId: gameId,
    waldo: waldo.name,
    posX: standardizedX,
    posY: standardizedY,
  };

  async function handleOptionClick() {
    const currentGameInstance: GameProps = (
      await axios.put(
        "https://wheres-waldo-z5t3.onrender.com/game/choose-waldo",
        data,
      )
    ).data;
    if (waldos.length === currentGameInstance.waldoToFindRemaining.length) {
      handleSetMessage(statusMessageEnum.ERROR);
    } else {
      handleWaldos(currentGameInstance.waldoToFindRemaining);
      handleSetMessage(statusMessageEnum.SUCCESS);
      if (currentGameInstance.waldoToFindRemaining.length === 0) {
        const data = {
          gameId: gameId,
        };
        await axios.put(
          "https://wheres-waldo-z5t3.onrender.com/game/end-game",
          data,
        );
        handleGameStatus(gameStatusEnum.COMPLETED);
      }
    }
  }

  return (
    <div
      onClick={async () => {
        await handleOptionClick();
      }}
      className={styles.option}
    >
      <div className={styles["image-container"]}>
        <img
          src={`https://wheres-waldo-z5t3.onrender.com${waldo.image.path}`}
          alt={waldo.name}
        />
      </div>
      <p>{waldo.name}</p>
    </div>
  );
};

const SelectOptions: FC = () => {
  const { waldos, coordinates, windowWidth } = useGameContext();
  const { posX, posY } = coordinates;
  let atLeftSide = true;
  if (posX >= windowWidth / 2) {
    atLeftSide = false;
  }
  return (
    <div
      style={{
        position: "absolute",
        left: posX,
        top: posY,
      }}
      className={
        atLeftSide
          ? `${styles["options-container"]} ${styles.right}`
          : `${styles["options-container"]} ${styles.left}`
      }
    >
      {waldos.map((waldo) => (
        <SelectOption waldo={waldo} key={waldo._id} />
      ))}
    </div>
  );
};

export default SelectOptions;
