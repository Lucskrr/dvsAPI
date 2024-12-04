import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const isAuthenticated = localStorage.getItem('token');

    return (
        <div className="header">
            <nav className="navbar">
                <Link to="/" className="btn btn-info">Home</Link>
                {isAuthenticated ? (
                    <>
                        <Link to="/cart" className="btn btn-warning">Carrinho</Link>
                        <Link to="/manage-products" className="btn btn-secondary">Gerenciar Produtos</Link>
                        <button 
                            className="btn btn-danger" 
                            onClick={() => {
                                localStorage.removeItem('token');
                                window.location.reload(); // Força a atualização para esconder o botão de logout
                            }}
                        >
                            Sair
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="btn btn-primary">Entrar</Link>
                        <Link to="/newuser" className="btn btn-success">Criar Conta</Link>
                    </>
                )}
            </nav>
        </div>
    );
};

export default Header;
