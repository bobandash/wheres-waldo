// stores the user's current game, their score, etc.
import mongoose from "mongoose";
import { gameStatusEnum, gameTypeEnum } from "../constants/enum";
const Schema = mongoose.Schema;

const GameInstanceSchema = new Schema({
  _id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    default: 'Undefined'
  },
  status: {
    type: String,
    required: true,
    enum: [gameStatusEnum.IN_PROGRESS, gameStatusEnum.COMPLETED]
  },
  score: {
    type: Number,
    required: true,
    default: 0
  }, 
  gameType: {
    type: String,
    required: true,
    enum: [gameTypeEnum.POKEMON, gameTypeEnum.SMASH, gameTypeEnum.WALDO]
  },
  waldoToFindRemaining: {
    type: Array,
    required: true
  }
})

module.exports = mongoose.model("GameModel", GameInstanceSchema)