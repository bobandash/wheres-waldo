import { GameTypeProps } from "./game_type_interface";
import { WaldoProps } from "./waldo_interface";

export interface GameProps {
  gameType: GameTypeProps;
  name: string;
  score: number;
  status: string;
  waldoToFindRemaining: Array<WaldoProps>;
  _id: number;
}
