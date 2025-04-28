const { query } = require("../database");
const User = require("../models/User");

const usersController = {
  async index(req, res) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
      res.status(500).json({ message: "Erro interno" });
    }
  },

  async create(req, res) {
    try {
      const { name, matricula, senha, tipo, photo } = req.body;
      const newUser = await User.create({ name, matricula, senha, tipo, photo });
      res.status(201).json(newUser);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      res.status(500).json({ message: "Erro interno" });
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
      res.json(user);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      res.status(500).json({ message: "Erro interno" });
    }
  },

  async validarMatricula(req, res) {
    try {
      const { matricula } = req.params;
      const user = await User.findByMatricula(matricula);
      if (user) {
        res.status(409).json({ message: "Matrícula já cadastrada" });
      } else {
        res.status(200).json({ message: "Matrícula disponível" });
      }
    } catch (error) {
      console.error("Erro ao validar matrícula:", error);
      res.status(500).json({ message: "Erro interno" });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const attributes = req.body;
      const updatedUser = await User.update(id, attributes);
      if (!updatedUser) return res.status(404).json({ message: "Usuário não encontrado" });
      res.json(updatedUser);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      res.status(500).json({ message: "Erro interno" });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      await User.delete(id);
      res.json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      res.status(500).json({ message: "Erro interno" });
    }
  }
};

module.exports = usersController;
