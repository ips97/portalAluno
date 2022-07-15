const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/User");
const Usuario = mongoose.model("usuarios");
const passport = require("passport");
const {aluno} = require("../helpers/tipoUsuario");
const admin = require("../routes/admin");

 
router.post("/login", (req,res,next)=>{
    passport.authenticate("local",{
        successRedirect: "/usuario/",
        failureRedirect: "/",
        failureFlash: true
    })(req,res,next);
})

router.get("/logout", (req,res)=>{
    req.logout();
    req.flash("success_msg", "Deslogado com sucesso!");
    res.redirect("/")
})

router.get("/", aluno ,(req,res)=>{
    res.render("user/index")
});


router.use("/admin", admin)


// para exportar arquivo
module.exports = router;