const express = require("express");
const router = express.Router();
const staffController = require("../controllers/staff.controller");
const { protect, authorize } = require("../middleware/auth.middleware");

router.use(protect);

router.post("/create", authorize("admin"), staffController.createStaff);
router.get("/", authorize("admin"), staffController.getStaff);
router.delete("/:id", authorize("admin"), staffController.deleteStaff)

module.exports = router;