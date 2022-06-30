const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('user', schema)