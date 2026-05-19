const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  analyzeComplaint,
} = require("../controllers/aiController");

router.post(
  "/analyze",
  authMiddleware,
  analyzeComplaint
);

module.exports = router;