const express = require("express");
const router = require("./router");
const cors = require("cors");
const { syncDatabase } = require("./database/sync-database");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await syncDatabase();
    app.listen(PORT, () => {
      console.log(`Servidor rodando em:\n http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
    process.exit(1);
  }
}

startServer();