import {forwardRef, FC} from 'react'
import { WaldoProps } from '../interfaces/waldo_interface'
import styles from './Header.module.css'

interface HeaderProps {
  waldos: Array<WaldoProps>,
}

const Header:FC<HeaderProps> = forwardRef<HTMLElement, HeaderProps>(({waldos}, ref) => {
  return(
    <header ref = {ref} className = {styles.header}>
      <h1 className = {styles.logo}>Findus</h1>
      <div className = {styles["waldo-container"]}>
        {waldos.map(waldo => (
          <div className = {styles["find-elements"]} key = {waldo._id}>
            <div className = {styles["img-container"]}>
              <img src = {`/api${waldo.image.path}`} alt = {waldo.name}/>
            </div>
            <p>{waldo.name}</p>
          </div>
        ))}
      </div>
      <h1>SCORE:</h1>
    </header>
  )
});

export default Header;