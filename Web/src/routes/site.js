// site: home, contact, search, ...
const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

router.get('/search', siteController.search);
router.get('/', siteController.home); // nó sẽ match tuyến đường từ trên xuống theo thứ tự

module.exports = router;
