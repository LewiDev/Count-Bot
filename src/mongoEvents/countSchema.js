const mongoose = require('mongoose')

const countSchema = new mongoose.Schema({
    num: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    channelId: {
        type: mongoose.SchemaTypes.String,
        required: true
    }, 
    guildId: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    resetOnFail: {
        type: mongoose.SchemaTypes.String,
        required: true   
    },




})

module.exports = mongoose.model('Count', countSchema);