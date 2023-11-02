import { FC } from "react"
import { WaldoProps } from "../interfaces/waldo_interface"
import styles from './SelectOptions.module.css'


interface SelectOptionsProps {
  waldos: Array<WaldoProps>
}

interface SelectOptionProps {
  waldo: WaldoProps
}

const SelectOption:FC<SelectOptionProps> = ({waldo}) => {
  return (
    <div className = {styles.option}>
      <div className = {styles["image-container"]}>
        <img src = {`/api/${waldo.image.path}`} alt = {waldo.name}/>
      </div>
      <p>{waldo.name}</p>
    </div>
  )
}

const SelectOptions:FC<SelectOptionsProps> = ({waldos}) => {
  return (
    <div className = {styles["options-container"]}>
      {waldos.map(waldo => (
        <SelectOption waldo = {waldo} key = {waldo._id}/>
      ))}
    </div>
  )
}

export default SelectOptions;