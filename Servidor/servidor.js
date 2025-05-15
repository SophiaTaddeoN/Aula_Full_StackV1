var http = require("http"); // SERVIDOR WEB BASICO
require("colors"); // ADICIONA COR AO TERMINAL
var express = require("express"); // FRAMEWORK PARA LIDAR COM ROTAS E REQUISIÇÕES
var bodyParser = require("body-parser"); // ANALISA O CORPO DAS REQUISIÇÕES POST
var mongodb = require("mongodb"); // CONECTA AO BANCO MONGODB
const MongoClient = mongodb.MongoClient;
const uri = `mongodb+srv://sophiataddeonasc:<Stn15082006>@mongodb.kfnurgf.mongodb.net/?retryWrites=true&w=majority&appName=MongoDB`;
const client = new MongoClient(uri, { useNewUrlParser: true });

var app = express();
app.use(express.static("./public"));
var server = http.createServer(app);
server.listen(80);
console.log("Servidor Rodando . . . ".rainbow);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "ejs"); // ejs na pasta views
app.set("views", "./views"); // pode usar o body parser

//ROTAS
app.get("/", (req, resposta) => {
  resposta.redirect("/Pagina_Inicial/project.html");
});

//ATV GET POST TEMPLATE
// let usuario = [];

// app.get("/usuario", (requisicao, resposta) => {
//   resposta.redirect("/Projetos_Passados/Get_Post_Template/usuario.html");
// });
// app.get("/cadastrar", (requisicao, resposta) => {
//   resposta.redirect("/Projetos_Passados/Get_Post_Template/cadastro.html");
// });
// app.get("/logar", function (requisicao, resposta) {
//   resposta.redirect("/Projetos_Passados/Get_Post_Template/login.html");
// });

// app.post("/cadastrar", function (requisicao, resposta) {
//   let nome = requisicao.query.nome;
//   let login = requisicao.query.login;
//   let senha = requisicao.query.senha;
//   let nasc = requisicao.query.nascimento;
//   usuario.push({ nome, login, senha, nasc });
//   console.log("Cadastro:", nome, login, senha, nasc);
//   resposta.render("resposta.ejs", {
//     mensagem: "Usuario cadastrado com sucesso!",
//     usuario: nome,
//     login: email,
//   });
//   resposta.redirect("/logar");
// });

// app.post("/logar", function (requisicao, resposta) {
//   let login = requisicao.body.login;
//   let senha = requisicao.body.senha;
//   console.log("Logar:", login, senha);
//   let encontrado = usuario.find((u) => u.login === login && u.senha === senha);
// });

// app.post("resposta_ejs", function (requisicao, resposta) {
//   resposta.render("/views/resposta.ejs");
// });
