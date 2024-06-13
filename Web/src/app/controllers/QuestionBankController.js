const thu_muc_cau_hoi = require("../models/Thu_muc_cau_hoi");
const user = require("../models/User");

class QuestionBankController {

    // [GET] /
    // index(req, res, next) {
    //     thu_muc_cau_hoi.find({})
    //         .then(thu_muc_cau_hoi_s => {
    //             thu_muc_cau_hoi_s = thu_muc_cau_hoi_s.map(thu_muc_cau_hoi => thu_muc_cau_hoi.toObject())
    //             res.render('home', {thu_muc_cau_hoi_s})
    //         })
    //         .catch(next);
    // }

    // [GET] /thu-muc-cau-hoi/:slug
    show(req, res, next) {
        // res.send('Question Bank Detail');
        // res.render('user_profile');
        user.find({})
        .then(users => {
            users = users.map(user => user.toObject());
            res.render('user_profile', { users });
        })
        .catch(next);
    }
}

module.exports = new QuestionBankController();
