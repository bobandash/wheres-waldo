const express = require('express');
const router = express.Router();
const gameController = require('../controller/gameController')

router.get("/gameTypes", gameController.game_types);
router.post('/start', gameController.create_game)
router.put('/update-score', gameController.update_score);
router.put('/choose-waldo', gameController.choose_waldo);

module.exports = router;