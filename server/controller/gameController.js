const asyncHandler = require('express-async-handler');
const GameType = require('../models/gameType')

exports.game_types = asyncHandler(async (req, res, next) => {
  const {gameType} = req.query;
  if(gameType){
    const gameTypes = await GameType.findOne({gameType: gameType}).exec();
    res.json(gameTypes);
  } else {
    const gameTypes = await GameType.find({}).lean();
    res.json(gameTypes);
  }

})

exports.create_game = asyncHandler(async (req, res, next) => {
  
})