import allPokemon from './assets/pokemon.jpg'
import styles from './Game.module.css';
import { useState } from 'react';
import SelectCircle from './components/SelectCircle';

function App() {
  const sampleCoordinate = {
    posX: 0,
    posY: 0
  }

  const [isActive, setIsActive] = useState(false);
  const [coordinates, setCoordinate] = useState(sampleCoordinate)
  const [pokemon, setPokemon] = useState({});

  function handleClick(event : React.MouseEvent<HTMLElement>){
    setIsActive(prevActive => !prevActive);
    setCoordinate({
      posX: event.pageX,
      posY: event.pageY
    })
  }

  return (
    <div onClick = {handleClick} className = {styles["img-container"]}>
      <img src = {allPokemon} />
      {isActive && <SelectCircle posX = {coordinates.posX} posY = {coordinates.posY} />}
    </div>
  )
}

export default App
