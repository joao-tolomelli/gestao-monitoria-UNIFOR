const db = require("../database");

const disciplinasController = {
  async index(req, res) {
    try {
      const result = await db.query("SELECT * FROM disciplinas");
      res.json(result.rows);
    } catch (error) {
      console.error("Erro ao listar disciplinas:", error);
      res.status(500).json({ message: "Erro interno" });
    }
  },

  async create(req, res) {
    try {
      const { nome } = req.body;
      const result = await db.query(
        "INSERT INTO disciplinas (nome) VALUES ($1) RETURNING *",
        [nome]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error("Erro ao criar disciplina:", error);
      res.status(500).json({ message: "Erro interno" });
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params;
      const result = await db.query(
        "SELECT * FROM disciplinas WHERE id = $1",
        [id]
      );
      if (!result.rows[0]) {
        return res.status(404).json({ message: "Disciplina não encontrada" });
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error("Erro ao buscar disciplina:", error);
      res.status(500).json({ message: "Erro interno" });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome } = req.body;
      const result = await db.query(
        "UPDATE disciplinas SET nome = $1 WHERE id = $2 RETURNING *",
        [nome, id]
      );
      if (!result.rows[0]) {
        return res.status(404).json({ message: "Disciplina não encontrada" });
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error("Erro ao atualizar disciplina:", error);
      res.status(500).json({ message: "Erro interno" });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      await db.query("DELETE FROM disciplinas WHERE id = $1", [id]);
      res.json({ message: "Disciplina deletada com sucesso" });
    } catch (error) {
      console.error("Erro ao deletar disciplina:", error);
      res.status(500).json({ message: "Erro interno" });
    }
  }
};

module.exports = disciplinasController;
