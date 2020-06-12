const express = require("express");
const server = express();

// Pegar o banco de dados e guardá-lo em uma constante:
const db = require("./database/db.js")

// Configurar pasta pública:
server.use(express.static("public"));

// Habilitar o uso do req.body na aplicação:
server.use(express.urlencoded({ extended: true }));

// Utilizando templates engine:
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
    express: server,
    noCache: true
});


// Configurar os caminhos da aplicação:
    // > Página Inicial
server.get("/", function(req, res){
    return res.render("index.html", {title: "Título"});
});

    // > Página Cadastrar ponto
server.get("/create-point", function(req, res){              
    return res.render("create-point.html");    
});

server.post("/savepoint", function(req, res){
   
    // req.body: O corpo do formulário
    // console.log(req.body);

    // Inserir dados no banco de dados:

    const query = `
        INSERT INTO locais_coleta (
            imagem,
            nome,
            endereco,
            endereco2,
            uf,
            cidade,
            itens        
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        req.body.imagem,
        req.body.nome,
        req.body.endereco,
        req.body.endereco2,
        req.body.uf,
        req.body.cidade,
        req.body.itens
    ]

    function depoisInserir(erro){
        if (erro){
            console.log(erro);
            return res.send("Erro no cadastro!");
        }

        console.log("Cadastrado com sucesso!");
        console.log(this);

        return res.render("create-point.html", { saved: true });
    }

    db.run(query, values, depoisInserir);
       
});

    // Página Lista de Pontos Encontrados
    server.get("/search", function(req, res){

        const search = req.query.search;

        if (search == ""){
            return res.render("search-results.html", { total: 0 })
        }        

    // Pegar os dados do Banco de Dados:
        db.all(`SELECT * FROM locais_coleta WHERE cidade LIKE '%${search}%'`, function(erro, rows){
            if (erro){
                return console.log(erro);
            }

            const total = rows.length;

            // Mostrar a página html com os dados do banco:
            return res.render("search-results.html", {locais_coleta: rows, total: total});
    });    
});

// Ligar o servidor:
server.listen(3000);