//UserRouter.js
const express = require("express");
const router =express.Router();

//insert Model
const modUser = require("../Model/UserModel")
//insert control
const UserController = require("../Controllers/UserControl")

router.get("/",UserController.getAllUsers);
router.post("/",UserController.addUser);
router.get('/:id', UserController.getById);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

//router.post("/:id",UserController.getById);
//router.post("/:id",UserController.updateUser);


//export
module.exports = router;