import { FC } from "react"
import { WaldoProps } from "../interfaces/waldo_interface"
import styles from './SelectOptions.module.css'
import { useGameContext } from "./context/GameContext"
import axios from "axios"
import { GameProps } from "../interfaces/game_interface"
import { gameStatusEnum } from "../constants/enum"

interface SelectOptionsProps {
  waldos: Array<WaldoProps>
  posX: number,
  posY: number
}

interface SelectOptionProps {
  waldo: WaldoProps
  posX: number,
  posY: number
}

interface standardizeDimensionsProps {
  windowWidth: number,
  imageDimensions: {
    width: number,
    height: number
  },
  coordinates: {
    posX: number,
    posY: number,
  }
  headerHeight: number
}

const SelectOption:FC<SelectOptionProps> = ({waldo}) => {
  // TO-DO: need to pass by setWaldo
  const {
    windowWidth, 
    imageDimensions, 
    coordinates, 
    headerHeight, 
    gameId, 
    waldos, 
    handleErrorDisplayed, 
    handleWaldos, 
    handleGameStatus
  } = useGameContext();
  
  // converts coordinates and values of the current window and transform it to the pixels in the database
  const standardizeDimensions = ({windowWidth, imageDimensions, coordinates} : standardizeDimensionsProps) => {
    const imageScale = imageDimensions.width / windowWidth;
    const {posX, posY} = coordinates;

    const standardizedX = imageScale * posX;
    const standardizedY = imageScale * posY;
    return {standardizedX, standardizedY};
  }
  const {standardizedX, standardizedY} = standardizeDimensions({windowWidth, imageDimensions, coordinates, headerHeight})
  const data = {
    gameId: gameId,
    waldo: waldo.name,
    posX: standardizedX,
    posY: standardizedY 
  }

  async function handleOptionClick(){
    const currentGameInstance : GameProps = (await axios.put('/api/game/choose-waldo', data)).data;
    if(waldos.length === currentGameInstance.waldoToFindRemaining.length){
      handleErrorDisplayed(true);
    } else {
      handleWaldos(currentGameInstance.waldoToFindRemaining);
      handleErrorDisplayed(false);
      if(currentGameInstance.waldoToFindRemaining.length === 0){
        handleGameStatus(gameStatusEnum.COMPLETED);
      }
    }
  }


  return (
    <div onClick = {async () => {await handleOptionClick()}} className = {styles.option}>
      <div className = {styles["image-container"]}>
        <img src = {`/api/${waldo.image.path}`} alt = {waldo.name}/>
      </div>
      <p>{waldo.name}</p>
    </div>
  )
}

const SelectOptions:FC<SelectOptionsProps> = ({waldos, posX, posY}) => {
  return (
    <div style={{
      position: "absolute",
      left: posX,
      top: posY,
      transform: "translate(40px, -20px)"
      }}
      className = {styles["options-container"]}
    >
        {waldos.map(waldo => (
          <SelectOption waldo = {waldo} key = {waldo._id} posX = {posX} posY = {posY}/>
        ))}
    </div>
  )
}

export default SelectOptions;