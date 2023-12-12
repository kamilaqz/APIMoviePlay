const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contentSchema = new Schema({
    id: {type: String, required: true, unique: true},
    title: {type: String, required: true, unique: true},
    year: {type: Date, required: true},
    category: {type: String, required: true},
    synopsis: {type: String, required: true},
    price: {type: Number, required: true},
    coverUrl: {type: String, required: true}
})

module.exports = mongoose.model("Content", contentSchema)