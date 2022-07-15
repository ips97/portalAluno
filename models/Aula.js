const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Aula = new Schema({
    titulo:{
        type: String,
        require: true
    },
    categoria:{
        type: Schema.Types.ObjectId,
        ref:"categorias",
        required: true
    },
    instrumento:{
        type: Schema.Types.ObjectId,
        ref:"instrumentos",
        required: true
    },
    link:{
        type: String,
        required: true
    }
})


mongoose.model("aulas", Aula);
