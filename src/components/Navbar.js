import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid px-4">
        <span className="navbar-brand mb-0 h1">Student Management System</span>
        <div className="navbar-nav ms-auto">
          <NavLink to="/dashboard" className="nav-link text-white">
            Dashboard
          </NavLink>
          <NavLink to="/students" className="nav-link text-white">
            Students
          </NavLink>
          <NavLink to="/" className="nav-link text-white">
            Logout
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
