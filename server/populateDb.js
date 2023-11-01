const mongoose = require('mongoose');
require('./config/database.config')
const {gameTypeEnum} = require('./constants/enum')
const gameType = require('./models/gameType')
const WaldoModel = require('./models/waldo');
main();

async function main(){
  await createPokemonGame();
  await mongoose.connection.close();
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