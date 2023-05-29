import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const user = useSelector((state) => state.user);
    const location = useLocation();

    return user ? children : <Navigate to="/login" state={{ from: location }} />;
};

export default ProtectedRoute;