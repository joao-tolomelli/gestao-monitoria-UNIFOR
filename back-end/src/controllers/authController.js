const db = require("../database");

const authController = {
  async login(req, res) {
    try {
      const { matricula, senha } = req.body;

      if (!matricula || !senha) {
        return res.status(400).json({ error: "Matrícula e senha são obrigatórias." });
      }

      const result = await db.query(
        `SELECT * FROM usuarios WHERE matricula = $1 AND senha = $2`,
        [matricula, senha]
      );

      const user = result.rows[0];

      if (!user) {
        return res.status(401).json({ error: "Matrícula ou senha incorretos." });
      }

      res.status(200).json({
        id: user.id,
        name: user.name,
        matricula: user.matricula,
        tipo: user.tipo,
        photo: user.photo
      });
    } catch (error) {
      console.error("Erro no login:", error);
      res.status(500).json({ error: "Erro interno no login." });
    }
  }
};

module.exports = authController;