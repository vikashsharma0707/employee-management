


import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import '../styles/Attendance.css';

const Attendance = ({ user }) => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await api.get('/employee/attendance');
        setAttendanceRecords(response.data);
      } catch (error) {
        console.error('Error fetching attendance:', error);
        setError('Failed to fetch attendance records. Please try again.');
      }
    };
    fetchAttendance();
  }, []);

  return (
    <div className="attendance-container">
      <h2 className="attendance-title">Attendance Records</h2>
      {error && <div className="error-message">{error}</div>}
      {attendanceRecords.length === 0 ? (
        <p className="no-records">No attendance records found.</p>
      ) : (
        <div className="table-wrapper">
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Status</th>
                <th>Check-In</th>
                <th>Check-Out</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((record) => (
                <tr key={record._id}>
                  <td>{new Date(record.date).toLocaleDateString()}</td>
                  <td>{record.status}</td>
                  <td>{record.checkIn ? new Date(record.checkIn).toLocaleTimeString() : 'N/A'}</td>
                  <td>{record.checkOut ? new Date(record.checkOut).toLocaleTimeString() : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Attendance;