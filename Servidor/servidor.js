//IMPORTAÇÕES INICIAIS
require("colors"); // ADICIONA COR AO TERMINAL
var http = require("http"); // SERVIDOR WEB BASICO
var express = require("express"); // FRAMEWORK PARA LIDAR COM ROTAS E REQUISIÇÕES
var bodyParser = require("body-parser"); // ANALISA O CORPO DAS REQUISIÇÕES POST

//CONEXÃO COM MONGODV=B
var mongodb = require("mongodb"); // CONECTA AO BANCO MONGODB
const MongoClient = mongodb.MongoClient;
const uri = `mongodb+srv://sophiataddeonasc:<Stn15082006>@mongodb.kfnurgf.mongodb.net/?retryWrites=true&w=majority&appName=MongoDB`;
const client = new MongoClient(uri, { useNewUrlParser: true });

var dbo = client.db("exemplo_bd"); //DEFINE O BANCO DE DADOS
var usuarios = dbo.collection("usuarios"); //DEFINE A COLEÇÃO

//EXPRESS E CONFIGURAÇÃO DO SERVIDOR
var app = express(); //CRIA O APP EXPRESS
app.use(express.static("./public")); //USA A PASTA PUBLIC PARA ARQUIVOS ESTATICOS

var server = http.createServer(app); // CRIA O SERVIDOR EXECUTANDO NA PORTA 80
server.listen(80);
console.log("Servidor Rodando . . . ".rainbow); //EXIBE MENSAGEM NO TERMINAL COLORIDO

app.use(bodyParser.urlencoded({ extended: false })); // CONFIGURA O BODYPARSER PARA LER FORMULÁRIOS
app.use(bodyParser.json());

app.set("view engine", "ejs"); // EJS NA PASTA VIEWS
app.set("views", "./views"); // PODE USAR O BODYPARSER

// GET É USADO QUANDO VOCÊ QUER PEGAR INFORMAÇÕES DO SERVIDOR
// POST É USADO PARA ENVIAR DADOS PARA O SERVIDOR

//ROTAS
app.get("/", (req, resposta) => {
  resposta.redirect("/Pagina_Inicial/project.html");
});

//GET POST E TEMPLATE
// Exibe o formulário de cadastro (redirect para o HTML estático)
app.get("/cadastra", (req, res) => {
  res.redirect("/Projetos_Passados/Get_Post_Template/cadastro.html");
});

// Exibe o formulário de login
app.get("/login", (req, res) => {
  res.redirect("/Projetos_Passados/Get_Post_Template/login.html");
});

// Recebe o POST de cadastro, renderiza resposta.ejs
app.post("/cadastrado", (req, res) => {
  const { nome, login, senha, nascimento } = req.body;
  res.render("resposta.ejs", {
    nome: nome,
    login: login,
    senha: "",
    nasc: nascimento,
  });
});

// Recebe o POST de login, renderiza resposta.ejs
app.post("/login", function (req, res) {
  let login = req.body.login;
  let senha = req.body.senha;

  console.log(login, senha);

  // resposta usando EJS com mensagem de sucesso
  res.render("resposta.ejs", {
    mensagem: "Login recebido com sucesso!",
    nome: "",
    login: login,
    senha: "",
    nasc: "",
  });
});

//UPDATE E DELETE

// Exibe o formulário de cadastro (redirect para o HTML estático)
app.get("/cadastrado_c", (req, res) => {
  res.redirect("/Projetos_Passados/Update_Delete/cadastro_usuario_c.html");
});

// Exibe o formulário de login
app.get("/logado_c", (req, res) => {
  res.redirect("/Projetos_Passados/Update_Delete/login_usuario_c.html");
});

// Recebe o POST de cadastro, renderiza resposta.ejs
app.post("/cadastra_c", (req, res) => {
  const { nome, login, senha, nascimento } = req.body;
  res.render("resposta_usuario.ejs", {
    nome: nome,
    login: login,
    senha: "",
    nasc: nascimento,
  });
});

// Recebe o POST de login, renderiza resposta.ejs
app.post("/logar_c", function (req, res) {
  let login = req.body.login;
  let senha = req.body.senha;

  console.log(login, senha);

  // resposta usando EJS com mensagem de sucesso
  res.render("resposta_usuario.ejs", {
    mensagem: "Login recebido com sucesso!",
    nome: "",
    login: login,
    senha: "",
    nasc: "",
  });
});
