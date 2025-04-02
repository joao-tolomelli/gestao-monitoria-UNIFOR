const { Router } = require("express");
const usersController = require("./controllers/users-controller");

const router = Router();

router.get("/users", usersController.index);
router.post("/users", usersController.create);
router.get("/users/:id", usersController.show);
router.get("/users/validate_cpf/:cpf", usersController.validadeCPF);
router.put("/users/:id", usersController.update);
router.delete("/users/:id", usersController.delete);

module.exports = router;
