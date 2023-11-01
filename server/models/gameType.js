// stores the user's current game, their score, etc.
const mongoose = require("mongoose");
const { gameTypeEnum } = require("../constants/enum");
const Schema = mongoose.Schema;

const GameTypeSchema = new Schema({
  gameType: {
    type: String,
    required: true,
    enum: [gameTypeEnum.POKEMON, gameTypeEnum.SMASH, gameTypeEnum.WALDO]
  },
  image: {
    filename: {
      type: String,
      required: true,
    }, 
    path: {
      type: String,
      required: true
    }
  },
  dimensions: {
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    }
  }
})

module.exports = mongoose.model("GameType", GameTypeSchema)