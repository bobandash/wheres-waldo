import { FC } from "react"
import SelectOptions from "./SelectOptions";
import { WaldoProps } from "../interfaces/waldo_interface";

interface SelectCircleProps {
  posX: number,
  posY: number
  waldos: Array<WaldoProps>
}

const SelectCircle: FC<SelectCircleProps> = ({waldos, posX, posY}) => {
  return (
    <>
      <div className = "circle" style={{
        position: "absolute",
        left: posX,
        top: posY,
        transform: "translate(-50%, -50%)"
      }}>
        <SelectOptions waldos = {waldos}/>
      </div>
    </>
  )
}

export default SelectCircle;