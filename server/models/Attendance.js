const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['present', 'absent', 'leave', 'approved', 'rejected'], default: 'present' },
  checkIn: { type: Date },
  checkOut: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);