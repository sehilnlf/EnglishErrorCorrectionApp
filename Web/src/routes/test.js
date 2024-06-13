const express = require('express');
const router = express.Router();

const testController = require('../app/controllers/TestController');

// router.get('/:slug', newController.show); // nó sẽ match tuyến đường từ trên xuống theo thứ tự
router.get('/test', testController.index);

module.exports = router;
