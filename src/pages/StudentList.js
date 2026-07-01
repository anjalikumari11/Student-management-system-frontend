import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';
import ConfirmModal from '../components/ConfirmModal';
import api from '../api/api';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await api.get('/students');
      setStudents(res.data);
      setError('');
    } catch (err) {
      setError('Failed to load students. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents = students.filter((s) => {
    const term = search.toLowerCase();
    return (
      s.name.toLowerCase().includes(term) ||
      s.email.toLowerCase().includes(term) ||
      s.course.toLowerCase().includes(term)
    );
  });

  const handleDelete = async () => {
    try {
      await api.delete(`/students/${deleteId}`);
      setStudents((prev) => prev.filter((s) => s._id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      setError('Failed to delete student. Please try again.');
      setDeleteId(null);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="page-container">
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
          <h4 className="mb-0">Students</h4>
          <Link to="/students/add" className="btn btn-primary">
            + Add Student
          </Link>
        </div>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name, email or course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {loading ? (
          <Spinner />
        ) : filteredStudents.length === 0 ? (
          <div className="alert alert-secondary text-center">No Students Found</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover bg-white">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Course</th>
                  <th>Address</th>
                  <th style={{ width: '140px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student._id}>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.phone}</td>
                    <td>{student.course}</td>
                    <td>{student.address}</td>
                    <td>
                      <Link
                        to={`/students/edit/${student._id}`}
                        className="btn btn-sm btn-outline-primary me-2"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => setDeleteId(student._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ConfirmModal
        show={!!deleteId}
        title="Delete Student"
        message="Are you sure you want to delete this student? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}

export default StudentList;
