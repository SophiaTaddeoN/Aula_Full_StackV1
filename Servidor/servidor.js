const colors = require("colors");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const uri =
  "mongodb+srv://sophiataddeonasc:Stn15082006@mongodb.kfnurgf.mongodb.net/CARROSDB?retryWrites=true&w=majority";

const app = express();

// Configurações iniciais
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("./public")); // Arquivos estáticos como CSS

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(
  session({
    secret: "chavesecreta123",
    resave: false,
    saveUninitialized: true,
  })
);

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client
  .connect()
  .then(() => {
    console.log("✅ Conectado ao MongoDB".green);
    const db = client.db("CARROSDB");

    // Página inicial
    app.get("/", (req, res) => {
      res.redirect("/Pagina_Inicial/project.html");
    });

    // Página de lista de carros
    app.get("/lista_carros", async (req, res) => {
      const carros = await db.collection("carros").find().toArray();
      res.render("lista_carros", { carros });
    });

    // Página para cadastrar novo carro
    app.get("/cadastrar_carro", (req, res) => {
      res.sendFile(
        __dirname + "/public/Projetos_Passados/Update_Delete/novo_carro.html"
      );
    });

    // Inserir carro
    app.post("/carros/inserir", async (req, res) => {
      try {
        const { Marca, Modelo, Ano, Qtde_disponivel } = req.body;

        await db.collection("carros").insertOne({
          marca: Marca,
          modelo: Modelo,
          ano: Number(Ano),
          qtde_disponivel: Number(Qtde_disponivel),
        });
        res.redirect("/lista_carros");
      } catch (erro) {
        res.status(500).send("Erro ao inserir carro: " + erro);
      }
    });

    // Página para editar carro
    app.get("/gerencia_carros/:id", async (req, res) => {
      try {
        const id = new mongodb.ObjectId(req.params.id);
        const carro = await db.collection("carros").findOne({ _id: id });

        if (!carro) return res.send("Carro não encontrado.");
        res.render("gerencia_carros", { carro });
      } catch (erro) {
        res.status(500).send("Erro ao buscar carro: " + erro);
      }
    });

    // Atualizar carro
    app.post("/atualizar_carro/:id", async (req, res) => {
      try {
        const id = new mongodb.ObjectId(req.params.id);
        const { Marca, Modelo, Ano, Qtde_disponivel } = req.body;

        await db.collection("carros").updateOne(
          { _id: id },
          {
            $set: {
              marca: Marca,
              modelo: Modelo,
              ano: Number(Ano),
              qtde_disponivel: Number(Qtde_disponivel),
            },
          }
        );

        res.redirect("/lista_carros");
      } catch (erro) {
        res.status(500).send("Erro ao atualizar carro: " + erro);
      }
    });

    // Vender carro (decrementar quantidade)
    app.post("/vender_carro/:id", async (req, res) => {
      try {
        const id = new mongodb.ObjectId(req.params.id);

        const carro = await db.collection("carros").findOne({ _id: id });
        if (!carro) return res.send("Carro não encontrado.");
        if (carro.qtde_disponivel <= 0) return res.send("Carro esgotado!");

        await db
          .collection("carros")
          .updateOne({ _id: id }, { $inc: { qtde_disponivel: -1 } });

        res.redirect("/lista_carros");
      } catch (erro) {
        res.status(500).send("Erro ao vender carro: " + erro);
      }
    });

    // Remover carro
    app.post("/remover_carro/:id", async (req, res) => {
      try {
        const id = new mongodb.ObjectId(req.params.id);
        await db.collection("carros").deleteOne({ _id: id });
        res.redirect("/lista_carros");
      } catch (erro) {
        res.status(500).send("Erro ao remover carro: " + erro);
      }
    });

    // Rota para exibir o formulário de cadastro de usuário
    app.get("/cadastro-usuario", (req, res) => {
      res.sendFile(
        __dirname +
          "/public/Projetos_Passados/Update_Delete/cadastro_usuario_c.html"
      );
    });

    // Rota para exibir o formulário de login
    app.get("/login-usuario", (req, res) => {
      res.sendFile(
        __dirname +
          "/public/Projetos_Passados/Update_Delete/login_usuario_c.html"
      );
    });

    // Rota para cadastrar usuário
    app.post("/usuarios/cadastrar", async (req, res) => {
      try {
        const { nome, login, senha } = req.body;
        const existe = await db.collection("usuarios").findOne({ login });
        if (existe) return res.send("Login já existe.");

        await db.collection("usuarios").insertOne({ nome, login, senha });

        // Redireciona para login com mensagem
        res.send(`
          <script>
            alert("Usuário cadastrado com sucesso!");
            window.location.href = "/login-usuario";
          </script>
        `);
      } catch (erro) {
        res.status(500).send("Erro ao cadastrar usuário: " + erro);
      }
    });

    // Rota para login de usuário
    app.post("/usuarios/login", async (req, res) => {
      try {
        const { login, senha } = req.body;
        const usuario = await db
          .collection("usuarios")
          .findOne({ login, senha });

        if (!usuario) {
          return res.send(`
            <script>
              alert("Login ou senha incorretos!");
              window.location.href = "/login-usuario";
            </script>
          `);
        }

        req.session.usuario = usuario;

        // Redireciona para lista de carros após login bem-sucedido
        res.send(`
          <script>
            alert("Login realizado com sucesso!");
            window.location.href = "/lista_carros";
          </script>
        `);
      } catch (erro) {
        res.status(500).send("Erro no login: " + erro);
      }
    });

    // Iniciar servidor
    app.listen(80, () => {
      console.log("Servidor rodando na porta 80...".rainbow);
    });
  })
  .catch((erro) => {
    console.error("Erro ao conectar ao MongoDB: ".red, erro);
  });
