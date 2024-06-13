const user = require("../models/User");

class UserController {

    // // [GET] /user-profile
    // index(req, res) {
    //     res.render('user_profile');
    // }

    index(req, res, next) {
        user.find({})
            .then(users => {
                users = users.map(user => user.toObject());
                res.render('user_profile', { users });
            })
            .catch(next);
    }
}

module.exports = new UserController();
