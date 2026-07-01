import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';
import api from '../api/api';

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const res = await api.get('/students');
        setStudents(res.data);
        setError('');
      } catch (err) {
        setError('Failed to load dashboard data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const total = students.length;
  const countByCourse = (course) =>
    students.filter((s) => s.course.toLowerCase().includes(course)).length;

  const stats = [
    { label: 'Total Students', value: total, color: 'primary' },
    { label: 'Computer Science', value: countByCourse('computer'), color: 'success' },
    { label: 'Mechanical', value: countByCourse('mechanical'), color: 'warning' },
    { label: 'Electrical', value: countByCourse('electrical'), color: 'info' },
  ];

  return (
    <div>
      <Navbar />
      <div className="page-container">
        <h4 className="mb-4">Dashboard</h4>

        {error && <div className="alert alert-danger">{error}</div>}

        {loading ? (
          <Spinner />
        ) : (
          <div className="row g-3">
            {stats.map((stat) => (
              <div className="col-6 col-md-3" key={stat.label}>
                <div className={`card card-stat border-${stat.color} h-100`}>
                  <div className="card-body text-center">
                    <h2 className={`text-${stat.color}`}>{stat.value}</h2>
                    <p className="mb-0 text-muted">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
