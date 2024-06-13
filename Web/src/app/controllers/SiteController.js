const thu_muc_cau_hoi = require("../models/Thu_muc_cau_hoi");

class SiteController {

    // [GET] /
    home(req, res, next) {
        // thu_muc_cau_hoi.find({})
        //     .then(thu_muc_cau_hoi_s => res.json(thu_muc_cau_hoi_s))
        //     .catch(next);
        thu_muc_cau_hoi.find({})
            .then(thu_muc_cau_hoi_s => {
                thu_muc_cau_hoi_s = thu_muc_cau_hoi_s.map(thu_muc_cau_hoi => thu_muc_cau_hoi.toObject())
                res.render('home', {thu_muc_cau_hoi_s})
            })
            .catch(next);
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
