import { useGameContext } from "../Game/context/GameContext";
import styles from './RedirectButtons.module.css'

const RedirectButtons = () => {
  const {gameTypeName} = useGameContext();
  function redirectHome(){
    window.location.href = "/";
  }
  
  function playAgain(){
    window.location.href = "/" + gameTypeName; 
  }
  return (
    <div className = {styles['button-container']}>
      <button onClick = {redirectHome}>Home</button>
      <button onClick = {playAgain}>Play Again</button>
  </div>
  )
}

export default RedirectButtons
