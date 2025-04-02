const User = require("../models/User");

const usersController = {
  // GET /users
  index: async (req, res) => {
    const users = await User.findAll();
    res.json(users);
  },

  // POST /users
  create: async (req, res) => {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  },

  // GET /users/:id
  show: async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user === null) return res.status(404).json({ message: "User not found!" });
    res.json(user);
  },

  // GET /users/validade_cpf/:cpf
  validadeCPF: async (req, res) => {
    const user = await User.findByCPF(req.params.cpf);
    if (user === null) return res.status(404).json({ message: "User not found!" });
    res.json(user);
  },

  // PUT /users/:id
  update: async (req, res) => {
    const updatedUser = await User.update(req.params.id, req.body);
    if (updatedUser === null) return res.status(404).json({ message: "User not found!" });
    res.json(updatedUser);
  },

  // DELETE /users/:id
  delete: async (req, res) => {
    const result = await User.delete(req.params.id);
    res.json(result);
  },
};

module.exports = usersController;
