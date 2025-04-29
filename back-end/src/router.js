const { Router } = require("express");
const usersController = require("./controllers/usersController");
const monitorsController = require("./controllers/monitorsController");
const disciplinasController = require("./controllers/disciplinasController");
const atendimentosController = require("./controllers/atendimentosController");
const authController = require("./controllers/authController");

const router = Router();

// Rotas para usuários
router.get("/usuarios", usersController.index);
router.post("/usuarios", usersController.create);
router.get("/usuarios/:id", usersController.show);
router.get("/usuarios/validar_matricula/:matricula", usersController.validarMatricula);
router.put("/usuarios/:id", usersController.update);
router.delete("/usuarios/:id", usersController.delete);

// Rotas para monitores
router.get("/monitores", monitorsController.index);
router.post("/monitores", monitorsController.create);
router.get("/monitores/:id", monitorsController.show);
router.put("/monitores/:id", monitorsController.update);
router.delete("/monitores/:id", monitorsController.delete);
router.get("/monitores/:id/home", monitorsController.getHomeInfo);

// Rotas para atendimentos
router.post("/atendimentos", atendimentosController.create);
router.get("/atendimentos", atendimentosController.index);
router.get("/atendimentos/monitor/:id_monitor", atendimentosController.findByMonitor);
router.put("/atendimentos/:id", atendimentosController.update);
router.delete("/atendimentos/:id", atendimentosController.delete);

// Rotas para disciplinas
router.get("/disciplinas", disciplinasController.index);
router.post("/disciplinas", disciplinasController.create);
router.get("/disciplinas/:id", disciplinasController.show);
router.put("/disciplinas/:id", disciplinasController.update);
router.delete("/disciplinas/:id", disciplinasController.delete);

router.post("/login", authController.login);

module.exports = router;
