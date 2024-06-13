const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const thu_muc_cau_hoi = new Schema({
    name: { type: String },
    number_of_question: { type: Number },
    mon_hoc: { type: String },
    avt: { type: String },  
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('thu_muc_cau_hoi_s', thu_muc_cau_hoi); // tên collection, tên schema