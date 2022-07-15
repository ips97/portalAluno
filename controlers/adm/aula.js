const mongoose = require("mongoose");
require("../../models/Aula")
const Aula = mongoose.model("aulas");
require("../../models/Categoria")
const Categoria = mongoose.model("categorias");
require("../../models/Instrumento")
const Instrumento = mongoose.model("instrumentos");


const listarAulas = async (req, res)=>{

    const {categoria} = req.params

    Aula.find({categoria: categoria}).populate("instrumento").then((aula)=>{
        Categoria.find().then((categoria)=>{        
        res.render("admin/aula/index", {aula: aula, categoria: categoria});
      });       
    }).catch((err)=>{
        req.flash("error_msg", "Houve um erro ao listar as Aulas")
        res.redirect("/admin/index")
    })
}

const formAula = async (req, res)=>{
    Instrumento.find().then((instrumento) =>{
        Categoria.find().then((categoria)=>{
            res.render("admin/aula/formAula", {instrumentos: instrumento, categoria:categoria})
        })        
    }).catch((err)=>{
            req.flash("error_msg", "Houve um erro ao carregar o formulário");
            res.redirect("/admin/aula");
        })
}

const addNovaAula = async (req, res)=>{
    var erros = []

    if(!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null){
        erros.push({texto: "Título inválido"});
    };

    if(!req.body.categoria || typeof req.body.categoria == undefined || req.body.categoria == null){
        erros.push({texto: "Categoria inválido"});
    };
    
    if(!req.body.instrumento || typeof req.body.instrumento == undefined || req.body.instrumento == null){
        erros.push({texto: "Instrumento inválido"});
    };

    if(!req.body.link || typeof req.body.link == undefined || req.body.link == null){
        erros.push({texto: "URL inválido"});
    };

    if(erros.length > 0){
        res.render("admin/aula/a/formAula", {erros: erros});
    }else{
          // alinha os campos do form com o bd
          const novaAula = {
            titulo: req.body.titulo,
            categoria: req.body.categoria,
            instrumento: req.body.instrumento,
            link: req.body.link
        }
        // salva objeto no bd
        new Aula(novaAula).save().then(() =>{
        req.flash("success_msg", "Aula criada com sucesso!") 
        res.redirect("/admin/aula/index")
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao salvar a aula, tente novamente")
            res.render("admin/aula/a/add")
        })
        }
}

const listarAula_Por_Categoria = async (req, res)=>{
    Aula.find({categoria:req.params.categoria}).populate("instrumento").then((aula)=>{
        Categoria.find({_id:req.params.categoria}).then((categoria)=>{        
        res.render("admin/aula/instrumento", {aula:aula, categoria:categoria});
        })}).catch((err)=>{
        req.flash("error_msg", "Houve um erro ao listar os Instrumentos")
        res.redirect("/admin/a/aula")
    })
}

/*const aula = async (req, res) =>{
    
    var {id} = req.params
    
    Aula.findOne({_id: id}).then((aula)=>{
        res.render("admin/aula/aula", {aula: aula})
    }).catch((err)=>{
        req.flash("error_msg", "Esta aula não existe")
        res.redirect("/admin//instrumento");
    })
}*/

module.exports = {
    listarAulas, formAula, addNovaAula, listarAula_Por_Categoria//, aula
}