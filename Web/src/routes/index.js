const newsRouter = require('./news');
const testRouter = require('./test');
const siteRouter = require('./site');
const userprofileRouter = require('./user_profile');
const questionBankRouter = require('./question_bank');

function route(app) {
    // app.get('/user-profile', (req, res) => {
    //     return res.render('user_profile');
    // })
    app.use('/test', testRouter);
    app.use('/news', newsRouter);
    app.use('/user-profile', userprofileRouter);
    app.use('/thu-muc-cau-hoi', questionBankRouter);
    app.use('/', siteRouter);
}

module.exports = route;
