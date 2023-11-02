const express = require('express');
const router = express.Router();
const gameController = require('../controller/gameController')

router.get("/gameTypes", gameController.game_types);

module.exports = router;