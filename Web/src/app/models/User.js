const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    name: { type: String },
    gioi_tinh: { type: String },
    dob: { type: String },
    email: { type: String },  
    pw: { type: String }, 
    role: { type: String }, 
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('users', user); // tên collection, tên schema