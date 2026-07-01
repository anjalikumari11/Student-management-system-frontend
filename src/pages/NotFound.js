import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light text-center px-3">
      <h1 className="display-4 fw-bold text-primary">404</h1>
      <p className="text-muted mb-4">The page you are looking for does not exist.</p>
      <Link to="/dashboard" className="btn btn-primary">
        Go to Dashboard
      </Link>
    </div>
  );
}

export default NotFound;
