const mongoose = require("mongoose");
require("../../models/Instrumento");
const Instrumento = mongoose.model("instrumentos");



const listarInstrumentos = async (req,res) =>{

    Instrumento.find().sort({name:"asc"}).then((instrumento) =>{
        res.render("admin/instrumento/instrumento", {instrumentos: instrumento});
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao listar instrumentos")
        res.redirect("/admin/index")
    });   
};

const addInstrumento = async (req, res)=>{

    var erros = []
    const {nome} = req.body

    // testa se o campo do form está vazio, indefinido ou nulo
    if(!nome || typeof nome == undefined || nome == null){
        erros.push({texto: "Nome inválido"})
    }
    // testa se o campo do form está vazio
    if(nome.length < 2){
        erros.push({texto: "O nome do Instrumento é muito pequeno"})
    }

    if(erros.length > 0){
        res.render("admin/instrumento/addinstrumento", {erros: erros})
    }else{
        Instrumento.findOne({name: nome}).then((instrumento)=>{
            if(instrumento){
                req.flash("error_msg", "Já existe um instrumento com este nome no sistema");
                res.redirect("/admin/instrumento");
            }else{ 
                // alinha os campos do form com o bd
                const novoInstrumento = {
                    name: nome,
                }
                // salva objeto no bd
                new Instrumento(novoInstrumento).save().then(() =>{
                req.flash("success_msg", "Instrumento criado com sucesso!") 
                res.redirect("/admin/instrumento/")
                }).catch((err) => {
                    req.flash("error_msg", "Houve um erro ao salvar o instrumento, tente novamente")
                    res.render("/admin/instrumento/addinstrumento")
                })
                }
            })
        }

};

const formInstrumento = async (req, res)=>{
    res.render("admin/instrumento/addinstrumento");
}

const buscarInstrumento = async (req,res)=>{

    const {id} = req.params

       // para selecionar objeto where(id==id)
       Instrumento.findOne({_id: id}).then((instrumento) =>{
        res.render("admin/instrumento/editinstrumento", {instrumento: instrumento})
        
    }).catch((err) =>{
            req.flash("error_msg", "Esta categoria não existe")
            res.redirect("/admin/instrunento/instrumento");
        });
};

const atualizarInstrumento = async (req,res)=>{

    const {id, nome}= req.body;

      // para selecionar o objeto onde id == id
      Instrumento.findOne({_id: id}).then((instrumento) =>{
        instrumento.name = nome;

        // salva o objeto no bd
        instrumento.save().then(() =>{
            req.flash("success_msg", "Instrumento editado com sucesso!");
            res.redirect("/admin/instrumento");
        }).catch((err) =>{
            req.flash("error_msg", "Houve um erro interno ao salvar a edição do instrumento");
            res.redirect("/admin/instrumento")
        });
    }).catch((err) =>{
        req.flash("error_msg", "Houve um erro ao editar o instrumento");
        res.redirect("/admin/instrumento");
    })
}

const excluirInstrumento = async (req,res) =>{

    const {id} = req.params;

  // para deletar objeto do bd
    Instrumento.remove({_id: id}).then((instrumento)=>{
        req.flash("success_msg", "Instrumento deletado com sucesso!");
        res.redirect("/admin/instrumento")
        console.log(instrumento);
    }).catch((err) =>{
        req.flash("error_msg", "Houve um erro ao deletar o instrumento");
        res.redirect("/admin/instrumento");
    })

}


module.exports = {
    listarInstrumentos, formInstrumento, addInstrumento, buscarInstrumento, atualizarInstrumento, excluirInstrumento
};