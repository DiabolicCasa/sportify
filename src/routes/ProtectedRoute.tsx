import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ISLOGGED } from '../config/constants';

interface ProtectedRouteProps {
  component: React.FC; // Specify a component that does not expect any props
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLogged = localStorage.getItem(ISLOGGED);

    if (!isLogged) {
      navigate("/signin");
    }
  }, [navigate]);

  return <Component />;
};

export default ProtectedRoute;
