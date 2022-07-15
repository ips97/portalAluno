const mongoose = require("mongoose");
require("../../models/Categoria");
const Categoria = mongoose.model("categorias");
require("../../models/Aula");
const Aula = mongoose.model("aulas");




const listarCategorias = async (req, res) =>{
    Categoria.find().then((categoria)=>{
            res.render("admin/categoria/index", {categoria: categoria});
        }).catch((err)=>{
        req.flash("error_msg", "Houve um erro ao listar as Categorias")
        res.redirect("/admin/")
    });
}

const listarInstrumentoPorCategoria = async (req, res)=>{
    
    const {categoria} = req.params;
    var instrumento = [], quantidade, i;
    

    Aula.find({categoria: categoria}).populate("instrumento").then((aula)=>{
        Categoria.find({_id: categoria}).then((categoria)=>{ 

            // loop p/ verificar a quantidade de aula com determinado instrumento
            // e insere num array instrumento, caso ele não esteja lá
            for(i = 0; i < aula.length; i++){

                var nomeInstrumento = aula[i].instrumento.name, idInstrumento = aula[i].instrumento._id;

                // verificar se o instrumento está dentro do array, se não tiver
                // é inserido e verificado a quantidade de aulas com o instrumento
                if(instrumento.find(nome => nome.nome == nomeInstrumento)){
                    
                }else{
                    quantidade = aula.filter(instrumento => instrumento.instrumento.name == aula[i].instrumento.name).length

                    instrumento.push({id: idInstrumento, nome: nomeInstrumento, quantidade: quantidade})                
                }
            }
                      
                res.render("admin/categoria/instrumento", {instrumento: instrumento, categoria: categoria});
            
            })               
        }).catch((err)=>{
        req.flash("error_msg", "Houve um erro ao listar os Instrumentos")
        res.redirect("/admin/categoria")
        })
}

const listarAulaPorCategoria_e_Instrumento = async (req, res)=>{

    const {categoria, instrumento} = req.params

    Aula.find({categoria: categoria, instrumento: instrumento}).populate("instrumento").then((aulas)=>{
        
        Categoria.find({_id: categoria}).then((categoria)=>{

        res.render("admin/categoria/aula", {aulas:aulas, categoria:categoria})

        })}).catch((err)=>{

        req.flash("error_msg", "Houve um erro ao listar as aulas");
        res.redirect("/admin/categoria")

    })

}

const formCategoria = async (req, res)=>{
    res.render("admin/categoria/formCategoria")
}

const addNovaCategoria = async (req, res)=>{

    var erros = [], {nome} = req.body;
    
    // testa se o campo do form está vazio, indefinido ou nulo
    if(!nome || typeof nome == undefined || nome == null){
        erros.push({texto: "Nome inválido"})
    }
         // testa se o campo do form está vazio
    if(req.body.nome.length < 2){
        erros.push({texto: "O nome da Categoria é muito pequena"})
    }

    if(erros.length > 0){
        res.render("admin/categoria/formCategoria", {erros: erros})
    }else{
        Categoria.findOne({nome: nome}).then((categoria)=>{
            if(categoria){
                req.flash("error_msg", "Já existe uma categoria com este nome no sistema");
                res.redirect("/admin/categoria");
            }else{ 
                // alinha os campos do form com o bd
                const novaCategoria = {
                    nome: nome
                }
                // salva objeto no bd
                new Categoria(novaCategoria).save().then(() =>{
                req.flash("success_msg", "Categoria criada com sucesso!") 
                res.redirect("/admin/categoria/")
                }).catch((err) => {
                    req.flash("error_msg", "Houve um erro ao salvar a categoria, tente novamente")
                    res.render("/admin/categoria/add")
                })
                }
            })
        }
}

const buscarAula = async (req, res)=>{

    const {aula} = req.params;
    
    Aula.findOne({_id: aula}).populate("instrumento").then((aula)=>{
        Categoria.find({_id: aula.categoria}).then((categoria)=>{
        res.render("admin/aula/aula", {aula: aula, categoria: categoria[0].nome})        
    })}).catch((err)=>{
        req.flash("error_msg", "Esta aula não existe")
        res.redirect("/admin/categoria/");
    });
};


module.exports = {
    listarCategorias, listarInstrumentoPorCategoria, listarAulaPorCategoria_e_Instrumento, formCategoria, addNovaCategoria, buscarAula
}