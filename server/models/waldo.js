// waldo stores all the potential characters that the user needs to find
import mongoose from "mongoose";
import { gameTypeEnum } from "../constants/enum";
const Schema = mongoose.Schema;

const WaldoModelSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: Buffer,
    required: true
  },
  pixelPositionRange: {
    minPixelX: {
      type: Number,
      required: true,
    },
    minPixelY: {
      type: Number,
      required: true
    },
    maxPixelX: {
      type: Number,
      required: true,
    },
    maxPixelY: {
      type: Number,
      required: true
    }
  },
  gameType: {
    type: String,
    required: true,
    enum: [gameTypeEnum.POKEMON, gameTypeEnum.SMASH, gameTypeEnum.WALDO]
  }
})

module.exports = mongoose.model("WaldoModel", WaldoModelSchema)