import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/api";

function AddStudent() {
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    address: "",
  });

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/students", student);
      alert("Student Added Successfully");
      navigate("/students");
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="container mt-4" style={{ maxWidth: "500px" }}>
        <h3>Add Student</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={student.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={student.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              className="form-control"
              value={student.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Course</label>
            <input
              type="text"
              name="course"
              className="form-control"
              value={student.course}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Address</label>
            <textarea
              name="address"
              className="form-control"
              value={student.address}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary">
            Save
          </button>

          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => navigate("/students")}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddStudent;