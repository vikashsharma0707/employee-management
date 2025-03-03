






import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import '../styles/Base.css'; // Shared styles
import '../styles/Hr.css'; // HR-specific styles

const HRDashboard = ({ user }) => {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState({ employeeId: '', date: '', status: '' });
  const [payroll, setPayroll] = useState({ employeeId: '', month: '', year: '', basicSalary: '', bonuses: '', deductions: '' });
  const [training, setTraining] = useState({ title: '', description: '', date: '', employees: [] });
  const [task, setTask] = useState({ title: '', description: '', assignedTo: '', dueDate: '' });
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [salaryData, setSalaryData] = useState({ employeeId: '', salary: '' });
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [error, setError] = useState(null);
  const [taskStatusUpdates, setTaskStatusUpdates] = useState({});
  const [isDeleting, setIsDeleting] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await api.get('/hr/employees');
        console.log('Employees fetched:', response.data);
        if (response.data.length === 0) {
          setError('No employees found. Please register employees first.');
        }
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error.response ? error.response.data : error.message);
        setError(error.response?.data?.message || 'Failed to fetch employees. Please try again later.');
      }
    };

    const fetchLeaveRequests = async () => {
      try {
        const response = await api.get('/hr/leave-requests');
        console.log('Leave requests fetched:', response.data);
        setLeaveRequests(response.data);
      } catch (error) {
        console.error('Error fetching leave requests:', error.response ? error.response.data : error.message);
        setError(error.response?.data?.message || 'Failed to fetch leave requests. Please try again later.');
      }
    };

    const fetchAssignedTasks = async () => {
      try {
        const response = await api.get('/hr/assigned-tasks');
        console.log('Assigned tasks fetched:', response.data);
        setAssignedTasks(response.data);
      } catch (error) {
        console.error('Error fetching assigned tasks:', error.response ? error.response.data : error.message);
        if (error.response?.status === 404) {
          setError('Assigned tasks endpoint not found. Please check the backend server.');
        } else {
          setError(error.response?.data?.message || 'Failed to fetch assigned tasks. Please try again later.');
        }
      }
    };

    fetchEmployees();
    fetchLeaveRequests();
    fetchAssignedTasks();
  }, []);

  const handleDeleteEmployee = async (employeeId) => {
    setIsDeleting(employeeId);
    setError(null);
    try {
      console.log('Attempting to delete employee with ID:', employeeId);
      const response = await api.delete(`/hr/employee/${employeeId}`);
      console.log('Delete response:', response.data);
      const updatedEmployees = employees.filter((emp) => emp._id !== employeeId);
      console.log('Updated employees:', updatedEmployees);
      setEmployees(updatedEmployees);
      const updatedTasks = assignedTasks.filter((task) => {
        const taskAssignedToId = task.assignedTo?._id;
        console.log(`Task ${task._id} assignedTo ID:`, taskAssignedToId);
        return taskAssignedToId !== employeeId;
      });
      console.log('Updated tasks:', updatedTasks);
      setAssignedTasks(updatedTasks);
      const updatedTaskStatusUpdates = { ...taskStatusUpdates };
      Object.keys(updatedTaskStatusUpdates).forEach((taskId) => {
        const task = assignedTasks.find((t) => t._id === taskId);
        if (task && task.assignedTo?._id === employeeId) {
          delete updatedTaskStatusUpdates[taskId];
        }
      });
      setTaskStatusUpdates(updatedTaskStatusUpdates);
    } catch (error) {
      console.error('Error deleting employee:', error);
      console.log('Error details:', error.response ? error.response.data : error.message);
      setError(error.response?.data?.message || 'Failed to delete employee. Please try again.');
    } finally {
      setIsDeleting(null);
    }
  };

  const handleMarkAttendance = async (e) => {
    e.preventDefault();
    try {
      await api.post('/hr/attendance', attendance);
      alert('Attendance marked successfully');
      setAttendance({ employeeId: '', date: '', status: '' });
    } catch (error) {
      console.error('Error marking attendance:', error);
      setError(error.response?.data?.message || 'Failed to mark attendance. Please try again.');
    }
  };

  const handleProcessPayroll = async (e) => {
    e.preventDefault();
    try {
      await api.post('/hr/payroll', payroll);
      alert('Payroll processed successfully');
      setPayroll({ employeeId: '', month: '', year: '', basicSalary: '', bonuses: '', deductions: '' });
    } catch (error) {
      console.error('Error processing payroll:', error);
      setError(error.response?.data?.message || 'Failed to process payroll. Please try again.');
    }
  };

  const handleScheduleTraining = async (e) => {
    e.preventDefault();
    try {
      await api.post('/hr/training', training);
      alert('Training scheduled successfully');
      setTraining({ title: '', description: '', date: '', employees: [] });
    } catch (error) {
      console.error('Error scheduling training:', error);
      setError(error.response?.data?.message || 'Failed to schedule training. Please try again.');
    }
  };

  const handleAssignTask = async (e) => {
    e.preventDefault();
    try {
      if (!task.title || !task.description || !task.assignedTo || !task.dueDate) {
        setError('All fields (title, description, assigned to, due date) are required to assign a task.');
        return;
      }
      await api.post('/hr/task', task);
      alert('Task assigned successfully');
      setTask({ title: '', description: '', assignedTo: '', dueDate: '' });
      const response = await api.get('/hr/assigned-tasks');
      setAssignedTasks(response.data);
    } catch (error) {
      console.error('Error assigning task:', error);
      setError(error.response?.data?.message || 'Failed to assign task. Please try again.');
    }
  };

  const handleSetSalary = async (e) => {
    e.preventDefault();
    try {
      await api.put('/hr/set-salary', salaryData);
      alert('Salary set successfully');
      setEmployees(employees.map((emp) =>
        emp._id === salaryData.employeeId ? { ...emp, salary: salaryData.salary } : emp
      ));
      setSalaryData({ employeeId: '', salary: '' });
    } catch (error) {
      console.error('Error setting salary:', error);
      setError(error.response?.data?.message || 'Failed to set salary. Please try again.');
    }
  };

  const handleLeaveAction = async (attendanceId, status) => {
    try {
      await api.put('/hr/leave', { attendanceId, status });
      alert(`Leave ${status} successfully`);
      setLeaveRequests(leaveRequests.map((req) =>
        req._id === attendanceId ? { ...req, status } : req
      ));
    } catch (error) {
      console.error(`Error ${status} leave:`, error);
      setError(error.response?.data?.message || `Failed to ${status} leave. Please try again.`);
    }
  };

  const handleStatusChange = (taskId, status) => {
    setTaskStatusUpdates((prev) => ({
      ...prev,
      [taskId]: status,
    }));
  };

  const handleUpdateTaskStatus = async (taskId) => {
    const status = taskStatusUpdates[taskId];
    if (!status) {
      setError('Please select a status to update.');
      return;
    }

    try {
      await api.put('/hr/task/status', { taskId, status });
      alert('Task status updated successfully');
      setAssignedTasks(assignedTasks.map((task) =>
        task._id === taskId ? { ...task, status } : task
      ));
      setTaskStatusUpdates((prev) => {
        const updated = { ...prev };
        delete updated[taskId];
        return updated;
      });
    } catch (error) {
      console.error('Error updating task status:', error);
      setError(error.response?.data?.message || 'Failed to update task status. Please try again.');
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">HR Dashboard</h2>

      {error && <div className="error-message">{error}</div>}

      <section className="dashboard-section">
        <h3>Employee List</h3>
        {employees.length === 0 ? (
          <p className="no-records">No employees found.</p>
        ) : (
          <div className="hr-table-wrapper">
            <table className="hr-dashboard-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Designation</th>
                  <th>Salary</th>
                  <th>Department</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Update Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => {
                  const employeeTasks = assignedTasks.filter(task => task.assignedTo?._id === emp._id);
                  return employeeTasks.length > 0 ? (
                    employeeTasks.map((task, index) => (
                      <tr key={`${emp._id}-${task._id}`}>
                        {index === 0 ? (
                          <>
                            <td rowSpan={employeeTasks.length}>
                              {emp.image ? (
                                <img
                                  src={`http://localhost:5000/${emp.image}`}
                                  alt={emp.user?.name || 'Employee'}
                                  className="employee-image"
                                  onError={(e) => { e.target.src = 'https://via.placeholder.com/50'; }}
                                />
                              ) : (
                                'No Image'
                              )}
                            </td>
                            <td rowSpan={employeeTasks.length}>{emp.user?.name || 'Unknown'}</td>
                            <td rowSpan={employeeTasks.length}>{emp.user?.email || 'Unknown'}</td>
                            <td rowSpan={employeeTasks.length}>{emp.designation}</td>
                            <td rowSpan={employeeTasks.length}>{emp.salary}</td>
                            <td rowSpan={employeeTasks.length}>{emp.department}</td>
                          </>
                        ) : null}
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                        <td>{task.status}</td>
                        <td>
                          <select
                            value={taskStatusUpdates[task._id] || task.status}
                            onChange={(e) => handleStatusChange(task._id, e.target.value)}
                            className="input-field"
                          >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                          </select>
                        </td>
                        <td>
                          {index === 0 && (
                            <button
                              className="delete-btn"
                              onClick={() => handleDeleteEmployee(emp._id)}
                              disabled={isDeleting === emp._id}
                            >
                              {isDeleting === emp._id ? 'Deleting...' : 'Delete'}
                            </button>
                          )}
                          <button
                            className="submit-btn"
                            onClick={() => handleUpdateTaskStatus(task._id)}
                            disabled={taskStatusUpdates[task._id] === undefined || taskStatusUpdates[task._id] === task.status}
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr key={emp._id}>
                      <td>
                        {emp.image ? (
                          <img
                            src={`http://localhost:5000/${emp.image}`}
                            alt={emp.user?.name || 'Employee'}
                            className="employee-image"
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/50'; }}
                          />
                        ) : (
                          'No Image'
                        )}
                      </td>
                      <td>{emp.user?.name || 'Unknown'}</td>
                      <td>{emp.user?.email || 'Unknown'}</td>
                      <td>{emp.designation}</td>
                      <td>{emp.salary}</td>
                      <td>{emp.department}</td>
                      <td colSpan="4">No tasks assigned</td>
                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteEmployee(emp._id)}
                          disabled={isDeleting === emp._id}
                        >
                          {isDeleting === emp._id ? 'Deleting...' : 'Delete'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="dashboard-section">
        <h3>Set Employee Salary</h3>
        {employees.length === 0 ? (
          <p className="no-records">No employees available to set salary.</p>
        ) : (
          <form className="salary-form" onSubmit={handleSetSalary}>
            <select
              value={salaryData.employeeId}
              onChange={(e) => setSalaryData({ ...salaryData, employeeId: e.target.value })}
              className="input-field"
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.user?.name || 'Unknown'}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Salary"
              value={salaryData.salary}
              onChange={(e) => setSalaryData({ ...salaryData, salary: e.target.value })}
              className="input-field"
            />
            <button type="submit" className="submit-btn">Set Salary</button>
          </form>
        )}
      </section>

      <section className="dashboard-section">
        <h3>Mark Attendance</h3>
        {employees.length === 0 ? (
          <p className="no-records">No employees available to mark attendance.</p>
        ) : (
          <form className="attendance-form" onSubmit={handleMarkAttendance}>
            <select
              value={attendance.employeeId}
              onChange={(e) => setAttendance({ ...attendance, employeeId: e.target.value })}
              className="input-field"
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.user?.name || 'Unknown'}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={attendance.date}
              onChange={(e) => setAttendance({ ...attendance, date: e.target.value })}
              className="input-field"
            />
            <select
              value={attendance.status}
              onChange={(e) => setAttendance({ ...attendance, status: e.target.value })}
              className="input-field"
            >
              <option value="">Select Status</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="leave">Leave</option>
            </select>
            <button type="submit" className="submit-btn">Mark Attendance</button>
          </form>
        )}
      </section>

      <section className="dashboard-section">
        <h3>Process Payroll</h3>
        {employees.length === 0 ? (
          <p className="no-records">No employees available to process payroll.</p>
        ) : (
          <form className="payroll-form" onSubmit={handleProcessPayroll}>
            <select
              value={payroll.employeeId}
              onChange={(e) => setPayroll({ ...payroll, employeeId: e.target.value })}
              className="input-field"
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.user?.name || 'Unknown'}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Month (e.g., January)"
              value={payroll.month}
              onChange={(e) => setPayroll({ ...payroll, month: e.target.value })}
              className="input-field"
            />
            <input
              type="number"
              placeholder="Year (e.g., 2025)"
              value={payroll.year}
              onChange={(e) => setPayroll({ ...payroll, year: e.target.value })}
              className="input-field"
            />
            <input
              type="number"
              placeholder="Basic Salary"
              value={payroll.basicSalary}
              onChange={(e) => setPayroll({ ...payroll, basicSalary: e.target.value })}
              className="input-field"
            />
            <input
              type="number"
              placeholder="Bonuses"
              value={payroll.bonuses}
              onChange={(e) => setPayroll({ ...payroll, bonuses: e.target.value })}
              className="input-field"
            />
            <input
              type="number"
              placeholder="Deductions"
              value={payroll.deductions}
              onChange={(e) => setPayroll({ ...payroll, deductions: e.target.value })}
              className="input-field"
            />
            <button type="submit" className="submit-btn">Process Payroll</button>
          </form>
        )}
      </section>

      <section className="dashboard-section">
        <h3>Schedule Training</h3>
        {employees.length === 0 ? (
          <p className="no-records">No employees available to schedule training.</p>
        ) : (
          <form className="training-form" onSubmit={handleScheduleTraining}>
            <input
              type="text"
              placeholder="Training Title"
              value={training.title}
              onChange={(e) => setTraining({ ...training, title: e.target.value })}
              className="input-field"
            />
            <textarea
              placeholder="Description"
              value={training.description}
              onChange={(e) => setTraining({ ...training, description: e.target.value })}
              className="textarea-field"
            />
            <input
              type="date"
              value={training.date}
              onChange={(e) => setTraining({ ...training, date: e.target.value })}
              className="input-field"
            />
            <select
              multiple
              value={training.employees}
              onChange={(e) =>
                setTraining({
                  ...training,
                  employees: Array.from(e.target.selectedOptions, (option) => option.value),
                })
              }
              className="input-field"
            >
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.user?.name || 'Unknown'}
                </option>
              ))}
            </select>
            <button type="submit" className="submit-btn">Schedule Training</button>
          </form>
        )}
      </section>

      <section className="dashboard-section">
        <h3>Assign Task</h3>
        {employees.length === 0 ? (
          <p className="no-records">No employees available to assign tasks.</p>
        ) : (
          <form className="task-form" onSubmit={handleAssignTask}>
            <input
              type="text"
              placeholder="Task Title"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              className="input-field"
            />
            <textarea
              placeholder="Description"
              value={task.description}
              onChange={(e) => setTask({ ...task, description: e.target.value })}
              className="textarea-field"
            />
            <select
              value={task.assignedTo}
              onChange={(e) => setTask({ ...task, assignedTo: e.target.value })}
              className="input-field"
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.user?.name || 'Unknown'}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={task.dueDate}
              onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
              className="input-field"
            />
            <button type="submit" className="submit-btn">Assign Task</button>
          </form>
        )}
      </section>

      <section className="dashboard-section">
        <h3>Leave Requests</h3>
        {leaveRequests.length === 0 ? (
          <p className="no-records">No leave requests found.</p>
        ) : (
          <div className="hr-table-wrapper">
            <table className="hr-dashboard-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.map((req) => (
                  <tr key={req._id}>
                    <td>{req.employee && req.employee.user ? req.employee.user.name : 'Unknown'}</td>
                    <td>{new Date(req.date).toLocaleDateString()}</td>
                    <td>{req.status}</td>
                    <td>
                      {req.status === 'leave' && (
                        <>
                          <button className="approve-btn" onClick={() => handleLeaveAction(req._id, 'approved')}>
                            Approve
                          </button>
                          <button className="reject-btn" onClick={() => handleLeaveAction(req._id, 'rejected')}>
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default HRDashboard;