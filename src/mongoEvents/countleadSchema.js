const mongoose = require('mongoose')

const countleadSchema = new mongoose.Schema({
    xp: {
        type: mongoose.SchemaTypes.Number,
        required: true
    }, 
    guildId: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    userId: {
        type: mongoose.SchemaTypes.String,
        required: true   
    },




})

module.exports = mongoose.model('CountLead', countleadSchema);