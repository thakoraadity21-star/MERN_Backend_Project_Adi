const mongoose = require('mongoose');

//define schema for the user
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true, 
        // step1
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },//step2
    password: {
        type: String,
        required: true,
        //step3 
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;