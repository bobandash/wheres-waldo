const mongoose = require('mongoose');
require('./config/database.config')
const {gameTypeEnum} = require('./constants/enum')
const gameType = require('./models/gameType')
const WaldoModel = require('./models/waldo');
main();

async function main(){
  await Promise.all([
    createPokemonGame(),
    createWaldoGame(),
    createSuperSmashGame()
  ]);
  await mongoose.connection.close();
}

async function createWaldoGame(){
  const waldoGameType = new gameType({
    gameType: gameTypeEnum.WALDO,
    image: {
      filename: 'waldo.jpg',
      path: '/uploads/backgrounds/waldo.jpg'
    },
    dimensions: {
      width: 1280,
      height: 2272
    }
  });
  await waldoGameType.save();

  const Waldo = new WaldoModel({
    name: "Waldo",
    image: {
      filename: 'waldo.png',
      path: '/uploads/waldos/waldo.png'
    },
    pixelPositionRange: {
      minPixelX: 1035,
      minPixelY: 827,
      maxPixelX: 1104,
      maxPixelY: 958
    },
    gameType: waldoGameType
  })

  await Promise.all([
    Waldo.save(),
  ])
}

async function createSuperSmashGame(){
  // create game type
  // contains background image and dimensions
  const superSmashGameType = new gameType({
    gameType: gameTypeEnum.SMASH,
    image: {
      filename: 'super smash.jpg',
      path: '/uploads/backgrounds/super smash.jpg'
    },
    dimensions: {
      width: 1350,
      height: 2508
    }
  });
  await superSmashGameType.save();

  const JigglypuffModel = new WaldoModel({
    name: "Jigglypuff",
    image: {
      filename: 'jigglypuff.png',
      path: '/uploads/waldos/jigglypuff.png'
    },
    pixelPositionRange: {
      minPixelX: 944,
      minPixelY: 1862,
      maxPixelX: 1153,
      maxPixelY: 2080
    },
    gameType: superSmashGameType
  })

  const KirbyModel = new WaldoModel({
    name: "kirby",
    image: {
      filename: 'kirby.png',
      path: '/uploads/waldos/kirby.png'
    },
    pixelPositionRange: {
      minPixelX: 250,
      minPixelY: 1200,
      maxPixelX: 488,
      maxPixelY: 1403
    },
    gameType: superSmashGameType
  })

  const DonkeyKongModel = new WaldoModel({
    name: "Donkey Kong",
    image: {
      filename: 'donkey kong.png',
      path: '/uploads/waldos/donkey kong.png'
    },
    pixelPositionRange: {
      minPixelX: 61,
      minPixelY: 674,
      maxPixelX: 352,
      maxPixelY: 905
    },
    gameType: superSmashGameType
  })

  await Promise.all([
    JigglypuffModel.save(),
    KirbyModel.save(),
    DonkeyKongModel.save()
  ])
}

async function createPokemonGame(){
  // create game type
  // contains background image and dimensions
  const pokemonGameType = new gameType({
    gameType: gameTypeEnum.POKEMON,
    image: {
      filename: 'pokemon.jpg',
      path: '/uploads/backgrounds/pokemon.jpg'
    },
    dimensions: {
      width: 1596,
      height: 2000
    }
  });
  await pokemonGameType.save();

  const DuskskullModel = new WaldoModel({
    name: "Duskskull",
    image: {
      filename: 'duskskull.png',
      path: '/uploads/waldos/duskskull.png'
    },
    pixelPositionRange: {
      minPixelX: 1080,
      minPixelY: 420,
      maxPixelX: 1155,
      maxPixelY: 490
    },
    gameType: pokemonGameType
  })

  const HitmonchanModel = new WaldoModel({
    name: "Hitmonchan",
    image: {
      filename: 'hitmonchan.png',
      path: '/uploads/waldos/hitmonchan.png'
    },
    pixelPositionRange: {
      minPixelX: 1300,
      minPixelY: 1600,
      maxPixelX: 1390,
      maxPixelY: 1700
    },
    gameType: pokemonGameType
  })

  const SolrockModel = new WaldoModel({
    name: "Solrock",
    image: {
      filename: 'solrock.png',
      path: '/uploads/waldos/solrock.png'
    },
    pixelPositionRange: {
      minPixelX: 125,
      minPixelY: 740,
      maxPixelX: 230,
      maxPixelY: 850
    },
    gameType: pokemonGameType
  })

  await Promise.all([
    DuskskullModel.save(),
    HitmonchanModel.save(),
    SolrockModel.save()
  ])
}