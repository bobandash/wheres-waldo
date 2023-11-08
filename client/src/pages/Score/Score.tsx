import Leaderboard from "./Leaderboard"
import styles from './Score.module.css'

const Score = () => {
  return (
    <div className = {styles["absolute-container"]}>
      <Leaderboard />
    </div>
  )
}

export default Score;
