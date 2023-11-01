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
    type: Schema.Types.ObjectId,
    required: true
  },
  waldoToFindRemaining: {
    type: Array,
    required: true
  }
})

module.exports = mongoose.model("GameModel", GameInstanceSchema)