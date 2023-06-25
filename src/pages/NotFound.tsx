import React from 'react';
import { Link } from 'react-router-dom';
/**
 * NotFound page.
 * @returns {React.FC} Page 404 error message and back to Home page button.
 */
const NotFound: React.FC = () => {
  return (
    <div className="error-page vh-100 d-flex justify-content-center text-center" data-testid="error-page">
      <div className="my-auto">
        <h2>404</h2>
        <p>Oops something went wrong</p>
        <Link to="/" className="btn">
          Back to Home <i className="icon ion-md-home"></i>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
