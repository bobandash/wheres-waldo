import { FC } from "react"
import DuskSkull from '../assets/Pokemon Assets/duskskull.png';
import Hitmonchan from '../assets/Pokemon Assets/hitmonchan.png';
import Solrock from '../assets/Pokemon Assets/solrock.png'
import styles from './SelectOptions.module.css'


const SelectOptions = () => {
  return (
    <div className = {styles["options-container"]}>
      <div className = {styles.option}>
        <div className = {styles["image-container"]}>
          <img src = {DuskSkull}/>
        </div>
        <p>Duskskull</p>
      </div>
      <div className = {styles.option}>
        <div className = {styles["image-container"]}>
          <img src = {Hitmonchan}/>
        </div>
        <p>Hitmonchan</p>
      </div>
      <div className = {styles.option}>
        <div className = {styles["image-container"]}>
          <img src = {Solrock}/>
        </div>
        <p>Solrock</p>
      </div>
    </div>
  )
}

export default SelectOptions;