const express = require("express");
const router = require("./router");
const { syncDatabase } = require("./database/sync-database.js"); 

const app = express();

app.use(express.json());
app.use("/api", router);

const PORT = 3000;

async function startServer() {
  try {
    await syncDatabase(); // Aguarda a sincronização antes de iniciar o servidor
    app.listen(PORT, () => {
      console.log(`Servidor rodando em:\n\x1b[41m http://localhost:${PORT}/\x1b[0m`);
    });
  } catch (error) {
    console.error("Erro ao inicializar o banco de dados. O servidor não será iniciado.");
    process.exit(1); // Sai do processo se houver erro no banco de dados
  }
}

startServer();
