const Complaint = require("../models/Complaint");

exports.addComplaint = async (req, res) => {
  try {
    const complaint = new Complaint(req.body);

    await complaint.save();

    res.status(201).json({
      message: "Complaint stored successfully",
      complaint,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

exports.getComplaints = async (req, res) => {
  try {
    const { category } = req.query;

    let filter = {};

    if (category) {
  filter.category = {
    $regex: category,
    $options: "i",
  };
}

    const complaints = await Complaint.find(filter);

    res.json(complaints);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.updateComplaintStatus = async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      {
        new: true,
      }
    );

    res.json(complaint);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.searchByLocation = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      location: {
  $regex: req.query.location,
  $options: "i",
},
    });

    res.json(complaints);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.deleteComplaint = async (req, res) => {
  try {
    await Complaint.findByIdAndDelete(req.params.id);

    res.json({
      message: "Complaint removed",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};