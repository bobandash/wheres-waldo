import allPokemon from './assets/pokemon.jpg'
import styles from './Game.module.css';
import { useState, useEffect } from 'react';
import SelectCircle from './components/SelectCircle';
import Header from './components/Header';
import axios from 'axios';

function App() {
  const sampleCoordinate = {
    posX: 0,
    posY: 0
  }
  const [isActive, setIsActive] = useState(false);
  const [coordinates, setCoordinate] = useState(sampleCoordinate)
  const [waldos, setWaldos] = useState([]);

  function handleClick(event : React.MouseEvent<HTMLElement>){
    setIsActive(prevActive => !prevActive);
    setCoordinate({
      posX: event.pageX,
      posY: event.pageY
    })
  }

  useEffect(() => {
    async function getWaldos(){
      const data = (await axios.get('/api/waldo/pokemon')).data;
      setWaldos(data);
    }
    getWaldos();
  }, [])

  return (
    <>
      <Header waldos = {waldos}/>
      <div onClick = {handleClick} className = {styles["img-container"]}>
        <img src = {allPokemon} />
        {isActive && <SelectCircle posX = {coordinates.posX} posY = {coordinates.posY} />}
      </div>
    </>

  )
}

export default App
