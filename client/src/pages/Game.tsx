import styles from './Game.module.css';
import { useState, useEffect, useRef} from 'react';
import SelectCircle from './SelectCircle';
import Header from '../components/Header';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { GameTypeProps, exampleGameType } from '../interfaces/game_type_interface';
import { WaldoProps, sampleWaldo } from '../interfaces/waldo_interface';
import { gameStatusEnum } from '../constants/enum';

interface GameProps {
  gameType: GameTypeProps,
  name: string,
  score: number,
  status: string,
  waldoToFindRemaining: Array<WaldoProps>,
  _id: number
}

function App() {
  const {gameType} = useParams();
  const sampleCoordinate = {
    posX: 0,
    posY: 0
  }
  const [isActive, setIsActive] = useState(false);
  const [coordinates, setCoordinate] = useState(sampleCoordinate)
  const [waldos, setWaldos] = useState([sampleWaldo]);
  const [currentGameType, setCurrentGameType] = useState<GameTypeProps>(exampleGameType);
  const [isLoading, setIsLoading] = useState(true);
  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [gameId, setGameId] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState(gameStatusEnum.NOT_STARTED);

  function handleClick(event : React.MouseEvent<HTMLElement>){
    setIsActive(prevActive => !prevActive);
    setCoordinate({
      posX: event.pageX,
      posY: event.pageY - headerHeight
    })
  }

  // creates the game and sets the params
  useEffect(() => {
    // starts the game
    async function startGame(){
      const gameTypeData = {
        gameType: gameType
      };
      const game : GameProps = (await axios.post('/api/game/start', gameTypeData)).data;
      // game object has all the data relevant to the game
      setGameId(game._id);
      setScore(game.score);
      setCurrentGameType(game.gameType);
      setWaldos(game.waldoToFindRemaining);
      setIsLoading(false);
      setGameStatus(game.status);
    }

    startGame();
  }, [gameType])

  // get header height to ensure that clicks are placed correctly
  useEffect(() => {
    if(headerRef.current != null){
      setHeaderHeight(headerRef.current.clientHeight);
    }
  }, [isLoading])

  useEffect(() => {
    async function incrementScore(){
      const gameIdData = {
        gameId: gameId
      }
      const newScoreData = (await axios.put('/api/game/update-score', gameIdData)).data;
      setScore(newScoreData.score);
    }

    if(gameStatus === gameStatusEnum.IN_PROGRESS){
      const interval = setInterval(() => {
        incrementScore();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameStatus, gameId])

  if(isLoading){
    return <div>Loading</div>
  }

  return (
    <>
      <Header ref = {headerRef} waldos = {waldos} score = {score}/>
      <div onClick = {handleClick} className = {styles["img-container"]}>
        <img src = {`api/${currentGameType.image.path}`} />
        {isActive && <SelectCircle waldos = {waldos} posX = {coordinates.posX} posY = {coordinates.posY} />}
      </div>
    </>

  )
}

export default App
