// stores the user's current game, their score, etc.
const mongoose = require("mongoose");
const { gameStatusEnum } = require("../constants/enum");
const Schema = mongoose.Schema;

const GameInstanceSchema = new Schema({
  _id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    default: 'ANONYMOUS'
  },
  status: {
    type: String,
    enum: [gameStatusEnum.IN_PROGRESS, gameStatusEnum.COMPLETED],
    default: gameStatusEnum.IN_PROGRESS
  },
  score: {
    type: Number,
    required: true,
    default: 0
  }, 
  gameType: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'GameType'
  },
  waldoToFindRemaining: {
    type: Array,
    required: true
  }
})

module.exports = mongoose.model("Game", GameInstanceSchema)