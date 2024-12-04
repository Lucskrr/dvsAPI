import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = ({ isAuthenticated, userEmail }) => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        window.location.reload(); // Força a atualização da página
    };

    return (
        <div className="home-page">
            <div className="welcome-section">
                <h1>Bem-vindo ao Sistema de Compras!</h1>
                {isAuthenticated ? (
                    <div className="user-info">
                        <p>Olá, <strong>{userEmail}</strong></p> {/* Exibindo o email do usuário */}
                        <div className="buttons">
                            <Link to="/cart" className="btn btn-info">Ver Carrinho</Link>
                            <Link to="/manage-products" className="btn btn-warning">Gerenciar Produtos</Link>
                            <button 
                                className="btn btn-danger" 
                                onClick={handleLogout}
                            >
                                Sair
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="auth-buttons">
                        <Link to="/login" className="btn btn-primary">Entrar</Link>
                        <Link to="/newuser" className="btn btn-success">Criar Conta</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
