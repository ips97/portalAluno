const adm = (req, res, next)=>{

    if(req.isAuthenticated() && req.user.type == "Administrador"){
        return next();
    }
    req.flash("error_msg", "Você precisa ser um Admin!");
    res.redirect("/")
}

const aluno = (req, res, next)=>{
    if(req.isAuthenticated() && req.user.type == "Aluno"){
        return next();
    }
    req.flash("error_msg", "Você precisa ser um Aluno!");
    res.redirect("/")
}

module.exports ={adm, aluno
}

