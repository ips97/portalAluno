const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const db = require("./config/db");
const path = require("path");
const usuario = require("./routes/usuario");
const admin = require("./routes/admin");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
require("./config/auth")(passport);


// Configurações
     // Sessão
        app.use(session({
            secret: "portal-do-aluno",
            resave: true,
            saveUninitialized: true
        }));
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(flash());
    // Middleware
        app.use((req, res, next) => {
        res.locals.success_msg = req.flash("success_msg");
        res.locals.error_msg = req.flash("error_msg");
        res.locals.error = req.flash("error");
        res.locals.user = req.user || null;
        next();
        });
    // Body Parser
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false}));
    // Public
        // Indica onde está os arquivos staticos (css, js)
        app.use(express.static(path.join(__dirname, '/public')));
    // Handlebars
        app.engine('handlebars', handlebars.engine({defaultLayout: 'main',
        runtimeOptions:{
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,}
        }));
        app.set('view engine', 'handlebars');
    // Mongoose
        mongoose.Promise = global.Promise;
        mongoose.connect(db.mongoURI).then(() =>{
            console.log("Conectado ao mongo");
        }).catch((err) =>{
            console.log("Erro ao se conectar: " +err);
        });  
// Rotas

app.get("/", (req, res)=>{
    res.render("user/login");
})

app.get("/admin", (req, res)=>{
    res.render("admin/login")
})

app.get("/404", (req,res) =>{
    res.send("Erro 404!")
});

app.use("/admin", admin)
app.use("/usuario", usuario);

// Outros
const PORT = process.env.PORT || 8081
    app.listen(PORT,()=>{
        console.log("Servidor Rodando")
    });