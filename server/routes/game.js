const express = require('express');
const router = express.Router();
const gameController = require('../controller/gameController')

router.get('/', gameController.game_instances)
router.get("/gameTypes", gameController.game_types);
router.post('/start', gameController.create_game)
router.put('/set-name', gameController.set_name);
router.put('/update-score', gameController.update_score);
router.put('/choose-waldo', gameController.choose_waldo);
router.put('/end-game', gameController.end_game)


module.exports = router;