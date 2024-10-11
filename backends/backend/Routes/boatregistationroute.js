const express = require("express");
const router = express.Router();

//insert user contraller
const boatregistationctrl = require("../Controllers/boatregistationctrl");

router.get("/",boatregistationctrl.getAllboats);
router.post("/",boatregistationctrl.addboats);
router.get("/:id",boatregistationctrl.getById);
router.put("/:id",boatregistationctrl.updateboats);
router.delete("/:id",boatregistationctrl.deleteboats);

//export
module.exports = router;