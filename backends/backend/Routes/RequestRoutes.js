const express = require("express");
const router = express.Router();
//Insert model
const Request = require("../Model/RequestModel");
//Insert controllers
const requestController = require("../Controllers/RequestControllers");

router.get("/", requestController.getAllRequests);
router.post("/", requestController.addRequests);
router.get("/:id", requestController.getRequestById);
router.put("/:id", requestController.updateRequest);
router.delete("/:id", requestController.deleteRequest);

//export
module.exports = router;