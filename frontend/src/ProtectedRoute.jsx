import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { isAuth } = useAuth();
  return isAuth ? children : <Navigate to="/" />;
};
