var http = require("http");
var express = require ("express");
var bodyParser = require("body-parser")
var app = express();
app.use(express.static("./public"));
var server = http.createServer(app);
server.listen(80);
console.log("Servidor Rodando . . . ");
app.use(bodyParser.urlencoded({extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'ejs') // ejs na pasta views
app.set('views', './views'); // pode usar o body parser


//ROTAS 
app.get('/',(req,res) => {
    res.redirect("/Pagina_Inicial/project.html")
})




//ATV GET POST TEMPLATE

app.get('/login',(req,res) => {
    res.redirect("/Projetos_Passados/Get_Post_Template/login.html")
})

app.get('/cadastra',(req,res) => {
    res.redirect("/Projetos_Passados/Get_Post_Template/cadastro.html")
})

app.post('/resposta_ejs',(req,res) => {
    let login = req.body.login;
    let senha = req.body.senha;
    console.log(login, senha);
    res.redirect("/views/resposta.ejs")
})