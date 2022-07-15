const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
    nome:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    instrumento:{
        type: Schema.Types.ObjectId,
        ref:"instrumentos",
        required: true
    },
    type:{
        type: String,
        required: true
    },
    senha:{
        type: String,
        required: true
    }
})



mongoose.model("usuarios", User);
