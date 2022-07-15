const mongoose = require("mongoose");
require("../../models/User");
const Usuario = mongoose.model("usuarios")
const Instrumento = mongoose.model("instrumentos");
require("../../models/Instrumento")
const bcrypt = require("bcryptjs");

const listarUsuarios = async (req,res)=>{
    Usuario.find().then((usuario) =>{
        res.render("admin/usuario/ListaUsuario",{usuarios: usuario});
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao listar usuários")
        res.redirect("/admin")
    });
}

const formUsuario = async (req,res)=>{
    Instrumento.find().then((instrumento) =>{
        res.render("admin/usuario/cadastro", {instrumentos: instrumento})
    }).catch((err)=>{
            req.flash("error_msg", "Houve um erro ao carregar o formulário");
            res.redirect("/admin");
        })
}

const cadastrarUsuario = async (req,res)=>{
    const {nome, email, senha, senha2, instrumento, tipo} = req.body;

    var erros = []

    if(!nome || typeof nome == undefined || nome == null){
        erros.push({texto: "Nome inválido"});
    };

    if(!email || typeof email == undefined || email == null){
        erros.push({texto: "E-mail inválido"});
    };
    if(!senha || typeof senha == undefined || senha == null){
        erros.push({texto: "Senha inválida"});
    }; 

    if(senha.length < 4){
        erros.push({texto: "Senha muito curta"});
    };
    if(senha != senha2){
        erros.push({texto: "As senhas são diferentes, tente novamente"});
    };


    if(erros.length > 0){
            res.render("admin/usuario/cadastro", {erros: erros});
    }
    else{
        Usuario.findOne({email: email}).then((usuario)=>{
            if(usuario){
                req.flash("error_msg", "Já existe uma conta com este e-mail no sistema");
                res.redirect("/admin/usuario/cadastro");
            }else{
                const novoUsuario = new Usuario({
                    nome: nome,
                    email: email,
                    senha: senha,
                    instrumento: instrumento,
                    type: tipo
                })
                bcrypt.genSalt(10, (erro,salt) =>{
                    bcrypt.hash(novoUsuario.senha, salt,(erro, hash)=>{
                        if(erro){
                            req.flash("error_msg", "Houve um erro durante o salvamento do usuário");
                            res.redirect("/admin/usuario/cadastro");
                        }else{
                            novoUsuario.senha = hash;

                            novoUsuario.save().then(()=>{
                                req.flash("success_msg", "Usuário criado com sucesso!");
                                res.redirect("/admin/usuario/cadastro");
                            }).catch((err)=>{
                                req.flash("error_msg", "Houve um erro ao criar o usuario, tente novamente!");
                                res.redirect("/admin/usuario/cadastro/add");
                            })
                        }
                    })
                })
            }
        }).catch((err)=>{
            req.flash("error_msg", "houve um erro interno");
            res.redirect("/admin");
        })    
    }
}

module.exports = {
    listarUsuarios, formUsuario, cadastrarUsuario
}