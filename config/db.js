// para conexão com o bd
// código para diferenciar o link de produção ou de localhost

if(process.env.NODE_ENV == "production"){
    module.exports = {mongoURI: "mongodb+srv://italopinheiro:pinheiro97@blog-app.jb5ys.mongodb.net/portal-do-aluno"}
}else{
    module.exports = {mongoURI: "mongodb://localhost/portal-do-aluno"}
}