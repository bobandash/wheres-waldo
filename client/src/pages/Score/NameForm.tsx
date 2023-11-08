import { useGameContext } from '../Game/context/GameContext';
import styles from './NameForm.module.css'
import axios from 'axios'
import {FC} from 'react';

interface ScoreFormProps {
  name: string,
  handleName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmittedName: () => void
}

const ScoreForm:FC<ScoreFormProps> = ({name, handleName, handleSubmittedName}) => {
  const {gameId} = useGameContext();

  async function postName(){
    const nameData = {
      gameId: gameId,
      name: name
    }
    await axios.put('/api/game/set-name', nameData);
  }

  return (
    <form onSubmit = {async (e) => {
      e.preventDefault();
      handleSubmittedName();
      await postName()}
    } className = {styles.form}>
      <input onChange = {handleName} required = {true} type = "text" value = {name} placeholder = "Username" />
      <button type = "submit">Submit</button>
    </form>
  )
}

export default ScoreForm;