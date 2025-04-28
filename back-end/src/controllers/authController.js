const { query } = require("../database");

const authController = {
  async login(req, res) {
    try {
      const { matricula, senha } = req.body;

      if (!matricula || !senha) {
        return res.status(400).json({ error: "Matrícula e senha são obrigatórias." });
      }

      const result = await query(
        `SELECT id, name, matricula, photo, tipo FROM usuarios WHERE matricula = $1 AND senha = $2`,
        [matricula, senha]
      );

      if (result.rows.length === 0) {
        return res.status(401).json({ error: "Matrícula ou senha inválida." });
      }

      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error("Erro no login:", error);
      res.status(500).json({ error: "Erro interno no login." });
    }
  }
};

module.exports = authController;
