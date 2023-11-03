const asyncHandler = require('express-async-handler');
const GameType = require('../models/gameType')
const GameInstance = require('../models/gameInstance');
const Waldos = require('../models/waldo');
const {gameStatusEnum} = require('../constants/enum');


exports.game_instances = asyncHandler(async (req, res, next) => {
  const {completed, limit, order, gameTypeName} = req.query;
  const gameInstances = GameInstance.find({});
  
  if(gameTypeName){
    const GameType = await GameType.findOne({gameType: gameTypeName}).exec();
    gameInstances.find({gameType: GameType});
  }

  // checks null condition
  if(completed){
    if(completed === "true"){
      gameInstances.find({status: gameStatusEnum.COMPLETED});
    } else {
      gameInstances.find({status: {$not: gameStatusEnum.COMPLETED}});
    }
  }

  if(order){
    gameInstances.sort(order);
  }

  if(limit){
    gameInstances.limit(limit);
  }

  const data = await gameInstances.exec();
  res.json(data);
})


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
  const {gameType} = req.body;
  if(gameType !== ''){
    const currentGameType = await GameType.findOne({gameType: gameType}).exec();
    const currentGameNumber = (await GameInstance.countDocuments({}).exec()) + 1;
    const initialWaldoToFind = await Waldos.find({gameType: currentGameType});

    const newGameInstance = new GameInstance({
      _id: currentGameNumber,
      gameType: currentGameType,
      waldoToFindRemaining: initialWaldoToFind
    })
    await newGameInstance.save();
    await newGameInstance.populate('gameType');
    res.json(newGameInstance);
  } else {
    res.send(400).json("Bad data");
  }
})

exports.update_score = asyncHandler(async (req, res, next) => {
  // increment and return score
  const {gameId} = req.body;
  const game = await GameInstance.findByIdAndUpdate(gameId, {
    $inc: {score: 1}
  }).exec();
  res.json({score: game.score});
})

exports.choose_waldo = asyncHandler(async (req, res, next) => {
  const {gameId, waldo, posX, posY} = req.body;
  let hasMatch = false;
  
  const chosenWaldo = await Waldos.findOne({
    name: waldo
  }).exec();
  const {minPixelX, minPixelY, maxPixelX, maxPixelY} = chosenWaldo.pixelPositionRange;
  if(posX >= minPixelX && posX <= maxPixelX){
    if(posY >= minPixelY && posY <= maxPixelY){
      hasMatch = true;
    }
  }
  const currentGame = await GameInstance.findById(gameId);
  if(hasMatch){
    currentGame.waldoToFindRemaining = currentGame.waldoToFindRemaining.filter(currWaldo => currWaldo.name != waldo);
  }
  currentGame.save();
  res.json(currentGame);
})

exports.set_name = asyncHandler(async (req, res, next) => {
  const {gameId, name} = req.body;
  const game = await GameInstance.findByIdAndUpdate(gameId, {
    name: name
  }).exec();
  res.json(game);
})

exports.end_game = asyncHandler(async (req, res, next) => {
  const {gameId} = req.body;
  const game = await GameInstance.findByIdAndUpdate(gameId, {
    status: gameStatusEnum.COMPLETED
  }).exec();
  res.json(game);
})