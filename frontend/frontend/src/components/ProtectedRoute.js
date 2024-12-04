import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        // Se não houver token, redireciona para a página de login
        return <Navigate to="/login" />;
    }
    return element;
};

export default ProtectedRoute;
