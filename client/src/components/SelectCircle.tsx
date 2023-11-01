import { FC } from "react"

interface SelectCircleProps {
  posX: number,
  posY: number
}

const SelectCircle: FC<SelectCircleProps> = ({posX, posY}) => {
  return (
    <div className = "circle" style={{
      position: "absolute",
      left: posX,
      top: posY,
      transform: "translate(-50%, -50%)"
    }}>
    </div>
  )
}

export default SelectCircle;