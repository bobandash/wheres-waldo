import { FC } from "react";
import SelectOptions from "./SelectOptions";
import { useGameContext } from "./context/GameContext";

const SelectCircle: FC = () => {
  const { coordinates } = useGameContext();
  const { posX, posY } = coordinates;
  return (
    <>
      <div
        className="circle"
        style={{
          position: "absolute",
          left: posX,
          top: posY,
          transform: "translate(-50%, -50%)",
        }}
      ></div>
      <SelectOptions />
    </>
  );
};

export default SelectCircle;
