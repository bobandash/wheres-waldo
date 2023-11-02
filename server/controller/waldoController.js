const asyncHandler = require('express-async-handler');
const WaldoModel = require('../models/waldo')
const GameTypeModel = require('../models/gameType');

exports.get_all_waldos = asyncHandler(async (req, res, next) => {
  const waldos = await WaldoModel.find().select('_id name image').exec();
  res.json(waldos);
})

exports.get_waldos = asyncHandler(async (req, res, next) => {
  const gameTypeText = req.params.gameType;
  const gameType = await GameTypeModel.findOne({
    gameType: gameTypeText
  })
  const waldos = await WaldoModel.find({
    gameType: gameType
  }).select('_id name image').lean();
  res.json(waldos);
})
