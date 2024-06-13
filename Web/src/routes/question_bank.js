const express = require('express');
const router = express.Router();

const questionBankController = require('../app/controllers/QuestionBankController');

router.get('/:slug', questionBankController.show); // nó sẽ match tuyến đường từ trên xuống theo thứ tự

module.exports = router;
