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

app.get('/usuario',(requisicao,resposta) =>{ 
    resposta.redirect("/Projetos_Passados/Get_Post_Template/usuario.html")
})


app.post('/resposta_cadastro', (requisicao,resposta) =>{
    resposta.redirect("/Projetos_Passados/Get_Post_Template/login.html")
})


app.get("/cadastrar", function(requisicao, resposta){
    let nome = requisicao.query.nome;
    let login = requisicao.query.login;
    let senha = requisicao.query.senha;
    let nasc = requisicao.query.nascimento;

    console.log(nome, login, senha, nasc)
    resposta.redirect("/Projetos_Passados/Get_Post_Template/cadastro.html")
})


app.post('/logar', function(requisicao, resposta){
    let login = requisicao.body.login;
    let senha = requisicao.body.senha;
    console.log(login, senha);

    var data = {db_login: login, db_senha: senha}

    usuarios.find(data).toArray(function(err, items){
        console.log(items)
        if(items.length == 0){
            resposta.render("resposta_login",{status: "usuario/senha não encontrado"});
        }else if(err){
            resposta.render("resposta_login",{status: "erro ao logar"});
        }else{
            resposta.render("resposta_login",{status: "usuario "+login+" logado"});
        }
    })

})

app.post('/resposta_ejs', (requisicao,resposta) =>{
    resposta.redirect("/views/resposta.ejs")
})

app.get('/resposta_ejs', (requisicao,resposta) =>{
    resposta.redirect("/views/resposta.ejs")
})
