import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/main.css';
import HomePage from './components/HomePage';
import LoginForm from './components/LoginForm';
import UserAccountForm from './components/UserAccountForm';
import Cart from './components/Cart';
import ProductManager from './components/ProductManager';
import FornecedorList from './components/FornecedorList';  // Importando o componente
import FornecedorForm from './components/FornecedorForm';  // Importando o componente

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('token') ? true : false);
    const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsAuthenticated(true);
            setUserEmail(localStorage.getItem('userEmail') || '');
        }
    }, []);

    return (
        <Router>
            <div className="container">
                <Routes>
                    <Route path="/" element={<HomePage isAuthenticated={isAuthenticated} userEmail={userEmail} />} />
                    <Route path="/login" element={<LoginForm setIsAuthenticated={setIsAuthenticated} setUserEmail={setUserEmail} />} />
                    <Route path="/newuser" element={<UserAccountForm />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/manage-products" element={<ProductManager />} />
                    <Route path="/fornecedores" element={<FornecedorList />} />  {/* Nova Rota */}
                    <Route path="/fornecedores/adicionar" element={<FornecedorForm />} />  {/* Nova Rota */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
