const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Instrumento = new Schema({
    name:{
        type: String,
        required: true
    }
});

mongoose.model("instrumentos", Instrumento);