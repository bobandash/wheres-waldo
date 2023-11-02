const express = require('express');
const router = express.Router();
const WaldoController = require('../controller/waldoController')

router.get('/', WaldoController.get_all_waldos);
router.get('/:gameType', WaldoController.get_waldos);


module.exports = router;