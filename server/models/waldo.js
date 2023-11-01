// waldo stores all the potential characters that the user needs to find
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WaldoModelSchema = new Schema({
  name: {
    type: String,
    required: true,
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
    type: Schema.Types.ObjectId,
    required: true
  }
})

module.exports = mongoose.model("WaldoModel", WaldoModelSchema)