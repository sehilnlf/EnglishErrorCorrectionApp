class TestController {
    // [GET]/news
    index(req, res) {
        res.send('TEST');
    }

}

module.exports = new TestController();
