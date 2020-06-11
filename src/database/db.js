// Importar a dependência do sqlite3:
const sqlite3 = require("sqlite3").verbose();

// Criar o objeto que vai fazer operações no banco de dados:
const db = new sqlite3.Database("./src/database/database.db");

module.exports = db;

// Utilizar o objeto de banco de dados para a operação:
db.serialize(function(){
       /* Criar uma tabela com comandos SQL: */
//     db.run(`
//         CREATE TABLE IF NOT EXISTS locais_coleta (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             imagem TEXT,
//             nome TEXT,
//             endereco TEXT,
//             endereco2 TEXT,
//             uf TEXT,
//             cidade TEXT,
//             itens TEXT
//         );
//     `)

//     // Inserir dados na tabela:
   //  const query = `
   //      INSERT INTO locais_coleta (
   //          imagem,
   //          nome,
   //          endereco,
   //          endereco2,
   //          uf,
   //          cidade,
   //          itens        
   //      ) VALUES (?, ?, ?, ?, ?, ?, ?);
   //  `

   //  const values = [
   //      "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=801&q=80",
   //      "Paper Sider",
   //      "Av. Presidente Vargas, São Cristóvão",
   //      "Nº 3791",
   //      "Rio Grande do Sul",
   //      "Passo Fundo",
   //      "Papéis e Papelão"
   //  ]

   //  function depoisInserir(erro){
   //      if (erro){
   //          return console.log(erro);
   //      }

   //      console.log("Cadastrado com sucesso");
   //      console.log(this)
   //  }

   //  db.run(query, values, depoisInserir)

       /* Consultar os dados da tabela: */
    db.all(`SELECT * FROM locais_coleta`, function(erro, rows){
        if (erro){
            return console.log(erro);
        }

        console.log("Aqui estão seus registros:");
        console.log(rows);
    })

       /* Deletar um dado da tabela: */
   //  db.run(`DELETE FROM locais_coleta WHERE id = ?`, [15], function(erro){
   //      if (erro){
   //          return console.log(erro);
   //      }
   //      console.log("Registro excluído com sucesso!");
   //  })

})