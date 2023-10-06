let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let userSchema = new Schema({
    email: {
        type: String,
    },
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    matchPass: {
        type: String,
    },
    phone: {
        type: Number,
    }
});

module.exports = mongoose.model('employee', userSchema);