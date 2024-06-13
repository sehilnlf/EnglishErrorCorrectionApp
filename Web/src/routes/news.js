const express = require('express');
const router = express.Router();

const newController = require('../app/controllers/NewsController');

router.get('/:slug', newController.show); // nó sẽ match tuyến đường từ trên xuống theo thứ tự
router.get('/', newController.index);

module.exports = router;
