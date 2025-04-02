const express = require("express");
const router = require("./router");

const app = express();

app.use(express.json());

app.use("/api", router);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em:\n\x1b[41m http://localhost:${PORT}/\x1b[0m`);
});
