import styles from './LoadingScreen.module.css'
import ReactLoading from 'react-loading';

const LoadingScreen = () => {
  return (
    <div className = {styles.container}>
      <ReactLoading type={"spin"} color={"#FFF"} height={"20%"} width={"20%"} />
    </div>
  )
}

export default LoadingScreen
