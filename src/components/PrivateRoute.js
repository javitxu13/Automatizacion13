import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from './backend/firebase/firebaseConfig';

const PrivateRoute = ({ children }) => {
    if (!auth.currentUser) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default PrivateRoute;
