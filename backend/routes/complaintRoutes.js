const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  addComplaint,
  getComplaints,
  updateComplaintStatus,
  searchByLocation,
  deleteComplaint,
} = require("../controllers/complaintController");

router.post("/", authMiddleware, addComplaint);

router.get("/", authMiddleware, getComplaints);

router.put("/:id", authMiddleware, updateComplaintStatus);

router.get(
  "/search/location",
  authMiddleware,
  searchByLocation
);

router.delete("/:id", authMiddleware, deleteComplaint);

module.exports = router;