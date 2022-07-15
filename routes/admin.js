const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/User");
const Usuario = mongoose.model("usuarios");
const passport = require("passport");
const {adm} = require("../helpers/tipoUsuario");

// Controladores
const instrumento = require("../controlers/adm/instrumento");
const usuario = require("../controlers/adm/usuario");
const categoria = require("../controlers/adm/categoria");
const aula = require("../controlers/adm/aula");


router.post("/login", (req,res,next)=>{
    passport.authenticate("local",{
        successRedirect: "/admin/index",
        failureRedirect: "/admin/login",
        failureFlash: true
    })(req,res,next);
});

router.get("/login", (req, res)=>{
    res.render("admin/login")
});

router.get("/index", adm, (req,res)=>{
    res.render("admin/index", {usuarios: Usuario})
});

// Rotas do Model Instrumento
router.get("/instrumento", adm, instrumento.listarInstrumentos);
router.get("/instrumento/add", adm, instrumento.formInstrumento);
router.post("/instrumento/novo", adm , instrumento.addInstrumento);
router.get("/instrumento/edit/:id", adm, instrumento.buscarInstrumento);
router.post("/instrumento/edit", adm, instrumento.atualizarInstrumento);
router.get("/instrumento/deletar/:id", adm, instrumento.excluirInstrumento);

// Rotas do Model Usuário
router.get("/usuario/cadastro", adm, usuario.listarUsuarios);
router.get("/usuario/cadastro/add", adm, usuario.formUsuario);
router.post("/cadastro/novo",  adm , usuario.cadastrarUsuario);

// Rotas do Model Categoria
router.get("/categoria", adm, categoria.listarCategorias);
router.get("/:categoria", adm, categoria.listarInstrumentoPorCategoria);
router.get("/:categoria/:instrumento", adm, categoria.listarAulaPorCategoria_e_Instrumento);
router.get("/categoria/add", adm, categoria.formCategoria);
router.post("/categoria/add", adm, categoria.addNovaCategoria);
router.get("/categoria/a/:aula", adm, categoria.buscarAula);

// Rotas do Model Aula
router.get("/aula/a/index", adm , aula.listarAulas);
router.get("/aula/a/add", adm, aula.formAula);
router.post("/aula/a/add", adm, aula.addNovaAula);
router.get("/aula/a/:categoria", adm, aula.listarAula_Por_Categoria);
//router.get("/aula/:aula", adm, aula.aula);



// para exportar arquivo
module.exports = router;