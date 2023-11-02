import {createContext, useContext} from 'react';
import { WaldoProps } from '../../interfaces/waldo_interface';

interface GameContextProps {
  coordinates: {
    posX: number,
    posY: number
  }
  windowWidth: number,
  handleWaldos: (waldos: Array<WaldoProps>) => void,
  handleGameStatus: (status : string) => void,
  handleSetMessage: (message: string) => void,
  gameId: number,
  headerHeight: number,
  score: number,
  waldos: Array<WaldoProps>,
  imageDimensions: {
    width: number,
    height: number
  }
}

export const GameContext = createContext<GameContextProps | undefined>(undefined);

export function useGameContext() {
  const gameContext = useContext(GameContext);
  
  if(gameContext === undefined){
    throw new Error('Game context is undefined');
  }
  return gameContext;
}