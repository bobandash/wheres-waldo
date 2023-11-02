import styles from './Game.module.css';
import { useState, useEffect, useRef} from 'react';
import SelectCircle from './SelectCircle';
import Header from '../components/Header';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { GameTypeProps, exampleGameType } from '../interfaces/game_type_interface';

function App() {
  const {gameType} = useParams();
  const sampleCoordinate = {
    posX: 0,
    posY: 0
  }
  const [isActive, setIsActive] = useState(false);
  const [coordinates, setCoordinate] = useState(sampleCoordinate)
  const [waldos, setWaldos] = useState([]);
  const [currentGameType, setCurrentGameType] = useState<GameTypeProps>(exampleGameType);
  const [isLoading, setIsLoading] = useState(true);
  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  function handleClick(event : React.MouseEvent<HTMLElement>){
    setIsActive(prevActive => !prevActive);
    setCoordinate({
      posX: event.pageX,
      posY: event.pageY - headerHeight
    })
  }

  useEffect(() => {
    async function getWaldos(){
      const data = (await axios.get('/api/waldo/pokemon')).data;
      setWaldos(data);
    }
    async function getGameType(){
      const data = (await axios.get('/api/game/gameTypes', {
        params: {
          gameType: gameType
        }
      })).data
      setCurrentGameType(data);
    }

    Promise.all([
      getWaldos(),
      getGameType()
    ]).then(() => {
      setIsLoading(false);
      if(headerRef.current != null){
        setHeaderHeight(headerRef.current.clientHeight);
      }
    })

  }, [gameType])

  if(isLoading){
    return <div>Loading</div>
  }

  console.log(headerHeight);

  return (
    <>
      <Header ref = {headerRef} waldos = {waldos}/>
      <div onClick = {handleClick} className = {styles["img-container"]}>
        <img src = {`api/${currentGameType.image.path}`} />
        {isActive && <SelectCircle waldos = {waldos} posX = {coordinates.posX} posY = {coordinates.posY} />}
      </div>
    </>

  )
}

export default App
