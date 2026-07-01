import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';
import api from '../api/api';
import { emptyStudent, validateStudentForm, isFormValid } from '../utils/validate';

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(emptyStudent);
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const errors = validateStudentForm(formData);
  const valid = isFormValid(formData);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true);
        
        const res = await api.get(`/students/${id}`);
        const { name, email, phone, course, address } = res.data;
        setFormData({ name, email, phone, course, address });
      } catch (err) {
        setServerError('Failed to load student details.');
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({
      name: true,
      email: true,
      phone: true,
      course: true,
      address: true,
    });
    if (!valid) return;

    try {
      setSubmitting(true);
      setServerError('');
      console.log(formData);
      
      await api.put(`/students/${id}`, formData);
      navigate('/students');
    } catch (err) {
      setServerError(
        err.response?.data?.message || 'Failed to update student. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const fields = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'phone', label: 'Phone Number', type: 'text' },
    { name: 'course', label: 'Course', type: 'text' },
    { name: 'address', label: 'Address', type: 'text' },
  ];

  return (
    <div>
      <Navbar />
      <div className="page-container" style={{ maxWidth: '600px' }}>
        <h4 className="mb-4">Edit Student</h4>

        {loading ? (
          <Spinner />
        ) : (
          <>
            {serverError && <div className="alert alert-danger">{serverError}</div>}

            <form onSubmit={handleSubmit} noValidate>
              {fields.map((field) => (
                <div className="mb-3" key={field.name}>
                  <label className="form-label">{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    className={`form-control ${
                      touched[field.name] && errors[field.name] ? 'is-invalid' : ''
                    }`}
                    value={formData[field.name]}
                    onChange={handleChange}
                   
                  />
                  {touched[field.name] && errors[field.name] && (
                    <div className="invalid-feedback">{errors[field.name]}</div>
                  )}
                </div>
              ))}

              <button
                type="submit"
                className="btn btn-primary"
                // disabled={!valid || submitting}
              >
                {submitting ? 'Saving...' : 'Save'}
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary ms-2"
                onClick={() => navigate('/students')}
              >
                Cancel
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default EditStudent;
