// IMPORTAÇÕES E DEPENDENCIAS
const colors = require("colors");
var http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const mongodb = require("mongodb");

// COEXÃO COM O MONGODB
const MongoClient = mongodb.MongoClient;
const uri =
  "mongodb+srv://sophiataddeonasc:Stn15082006@mongodb.kfnurgf.mongodb.net/?retryWrites=true&w=majority&appName=MongoDB";
const client = new MongoClient(uri, { useNewUrlParser: true });
var dbo = client.db("exemplo_bd");
var posts = dbo.collection("posts");
var carros = dbo.collection("carros");
var usuarios = dbo.collection("usuarios");

// CONFIGURAÇÕES EXPRESS
var app = express();
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.set("views", "./views");

// CRIANDO SERVIDOR
var server = http.createServer(app);
server.listen(80);
console.log("Servidor rodando ...".rainbow);

// Página inicial
app.get("/", (req, res) => {
  res.redirect("/Pagina_Inicial/project.html");
});

// CREATE E READ

app.get("/blog", function (req, res) {
  //Quando acessar /blog, ele consulta todos os documentos na coleção posts,
  // Converte o resultado em um array e
  // Renderiza o template EJS chamado blog, enviando os posts recuperados para a página (variável posts).
  posts.find().toArray(function (err, items) {
    if (err) {
      res.render("resposta", { status: "Erro ao carregar posts" });
    } else {
      res.render("blog", { posts: items });
    }
  });
});

app.post("/cadastrar_post", function (req, res) {
  //Recebe os dados do formulário (título, resumo, conteúdo do post) enviados via método POST.
  // Cria um objeto novoPost com esses dados.
  // Insere esse post na coleção posts do MongoDB.
  // Se der erro, renderiza uma página resposta com mensagem de erro.
  // Se funcionar, redireciona para a página /blog, mostrando os posts atualizados.
  let titulo = req.body.titulo;
  let resumo = req.body.resumo;
  let conteudo = req.body.conteudo;

  let novoPost = { titulo, resumo, conteudo };

  posts.insertOne(novoPost, function (err) {
    if (err) {
      res.render("resposta", { status: "Erro ao cadastrar post" });
    } else {
      // Após salvar, redireciona de volta para o blog
      res.redirect("/blog");
    }
  });
});

//Quando acessar /cadastro_post, o servidor retorna a página com o formulário para cadastrar um post (template cadastrar_post.ejs).
app.get("/cadastro_post", function (req, res) {
  res.render("cadastrar_post");
});

// UPDATE E DELETE

app.post("/cadastrar_usuario", function (req, resp) {
  let data = {
    db_nome: req.body.nome,
    db_login: req.body.login,
    db_senha: req.body.senha,
  };

  // salva dados no banco
  usuarios.insertOne(data, function (err) {
    if (err) {
      resp.render("resposta_usuarios.ejs", {
        resposta: "Erro ao cadastrar usuário!",
      });
    } else {
      resp.render("resposta_usuarios.ejs", {
        resposta: "Usuário cadastrado com sucesso!",
      });
    }
  });
});

app.post("/logar_usuario", function (req, resp) {
  let data = { db_login: req.body.login, db_senha: req.body.senha };

  // busca um usuário no banco de dados
  usuarios.find(data).toArray(function (err, items) {
    console.log(items);
    if (items.length == 0) {
      resp.render("resposta_usuarios.ejs", {
        resposta: "Usuário/senha não encontrado!",
      });
    } else if (err) {
      resp.render("resposta_usuarios.ejs", {
        resposta: "Erro ao logar usuário!",
      });
    } else {
      resp.render("resposta_usuarios.ejs", {
        resposta: "Usuário logado com sucesso!",
      });
    }
  });
});

app.get("/listar_usuarios", function (req, resp) {
  // busca todos os usuarios no banco de dados
  usuarios.find().toArray(function (err, items) {
    // renderiza a resposta para o navegador
    resp.render("lista_usuarios.ejs", { usuarios: items });
  });
});

app.post("/atualizar_usuario", function (req, resp) {
  let data = { db_login: req.body.login, db_senha: req.body.senha };
  let newData = { $set: { db_senha: req.body.novasenha } };

  // atualiza senha do usuário
  usuarios.updateOne(data, newData, function (err, result) {
    console.log(result);
    if (result.modifiedCount == 0) {
      resp.render("resposta_usuarios.ejs", {
        resposta: "Usuário/senha não encontrado!",
      });
    } else if (err) {
      resp.render("resposta_usuarios.ejs", {
        resposta: "Erro ao atualizar usuário!",
      });
    } else {
      resp.render("resposta_usuarios.ejs", {
        resposta: "Usuário atualizado com sucesso!",
      });
    }
  });
});

app.post("/remover_usuario", function (req, resp) {
  let data = { db_login: req.body.login, db_senha: req.body.senha };

  // remove do usuário
  usuarios.deleteOne(data, function (err, result) {
    console.log(result);
    if (result.deletedCount == 0) {
      resp.render("resposta_usuarios.ejs", {
        resposta: "Usuário/senha não encontrado!",
      });
    } else if (err) {
      resp.render("resposta_usuarios.ejs", {
        resposta: "Erro ao remover usuário!",
      });
    } else {
      resp.render("resposta_usuarios.ejs", {
        resposta: "Usuário removido com sucesso!",
      });
    }
  });
});

//CARROS
// Criar carro
app.post("/cadastrar_carro", function (req, resp) {
  let data = {
    db_marca: req.body.marca,
    db_modelo: req.body.modelo,
    db_ano: parseInt(req.body.ano),
    db_qtde_disponivel: parseInt(req.body.qtde_disponivel),
  };

  carros.insertOne(data, function (err) {
    if (err) {
      resp.render("resposta_carros.ejs", {
        resposta: "Erro ao cadastrar carro!",
      });
    } else {
      resp.render("resposta_carros.ejs", {
        resposta: "Carro cadastrado com sucesso!",
      });
    }
  });
});

// Logicamente você pode ter um login de carro? Normalmente não, então vamos pular.

// Listar carros
app.get("/listar_carros", function (req, resp) {
  carros.find().toArray(function (err, items) {
    if (err) {
      resp.render("resposta_carros.ejs", {
        resposta: "Erro ao listar carros!",
      });
    } else {
      resp.render("lista_carros.ejs", { carros: items });
    }
  });
});

// Atualizar carro - por exemplo, atualizar quantidade disponível
app.post("/atualizar_carro", function (req, resp) {
  let filtro = {
    db_marca: req.body.marca,
    db_modelo: req.body.modelo,
  };

  let atualizacao = {
    $set: {
      db_ano: parseInt(req.body.ano),
      db_qtde_disponivel: parseInt(req.body.qtde_disponivel),
    },
  };

  carros.updateOne(filtro, atualizacao, function (err, result) {
    if (result.modifiedCount == 0) {
      resp.render("resposta_carros.ejs", {
        resposta: "Carro não encontrado!",
      });
    } else if (err) {
      resp.render("resposta_carros.ejs", {
        resposta: "Erro ao atualizar carro!",
      });
    } else {
      resp.render("resposta_carros.ejs", {
        resposta: "Carro atualizado com sucesso!",
      });
    }
  });
});

// Remover carro
app.post("/remover_carro", function (req, resp) {
  let filtro = {
    db_marca: req.body.marca,
    db_modelo: req.body.modelo,
  };

  carros.deleteOne(filtro, function (err, result) {
    if (result.deletedCount == 0) {
      resp.render("resposta_carros.ejs", {
        resposta: "Carro não encontrado!",
      });
    } else if (err) {
      resp.render("resposta_carros.ejs", {
        resposta: "Erro ao remover carro!",
      });
    } else {
      resp.render("resposta_carros.ejs", {
        resposta: "Carro removido com sucesso!",
      });
    }
  });
});

//botao vender
const { ObjectId } = require("mongodb");

app.post("/vender_carro", function (req, resp) {
  const id = req.body.id;

  carros.updateOne(
    { _id: ObjectId(id), db_qtde_disponivel: { $gt: 0 } }, // só atualiza se qtde > 0
    { $inc: { db_qtde_disponivel: -1 } },
    function (err, result) {
      if (err) {
        resp.render("resposta_carro.ejs", {
          resposta: "Erro ao vender carro!",
        });
      } else if (result.matchedCount === 0) {
        // não achou carro com estoque
        resp.render("resposta_carro.ejs", {
          resposta: "Carro esgotado ou não encontrado!",
        });
      } else {
        resp.redirect("/listar_carros");
      }
    }
  );
});
