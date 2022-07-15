// para conexão com o bd
// código para diferenciar o link de produção ou de localhost

if(process.env.NODE_ENV == "production"){
    module.exports = {mongoURI: ""}
}else{
    module.exports = {mongoURI: "mongodb://localhost/portal-do-aluno"}
}
