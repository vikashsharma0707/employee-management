const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  designation: { type: String, required: true },
  salary: { type: Number, required: true, default: 0 },
  joiningDate: { type: Date, default: Date.now },
  emergencyContact: { type: String },
  image: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);