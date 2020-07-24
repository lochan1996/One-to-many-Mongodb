var express = require("express");
var router = express.Router();
const { signout, signup, signin, isSignedIn, getTodos, getUsertodos, addUsertodos, updateTodos } = require("../controllers/todos");
const { getUserById, getUser, UpdateUser, getAllUsers, getToDos, addToDoUser } = require("../controllers/user");

router.param("userId", getUserById);


router.get("/", getTodos)
router.get("/:id", getUsertodos);
router.post("/user/:userId/add", addUsertodos, addToDoUser);
router.put("/user/:userId/update/:id", updateTodos);


module.exports = router;