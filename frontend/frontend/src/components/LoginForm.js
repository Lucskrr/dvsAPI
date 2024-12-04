import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ setIsAuthenticated, setUserEmail }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [responseMessage, setResponseMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/users/login', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userEmail', formData.email); // Armazenando o email no localStorage

                setIsAuthenticated(true); // Atualizando o estado de autenticação
                setUserEmail(formData.email); // Atualizando o estado do email do usuário

                setResponseMessage('Login realizado com sucesso!');
                navigate('/');  // Redireciona para a home page
            } else {
                setResponseMessage('Erro ao realizar login.');
            }
        } catch (error) {
            setResponseMessage('Falha na conexão com o servidor.');
        }
    };

    return (
        <div className="login-form">
            <h3>Entrar</h3>
            <form onSubmit={handleLogin} className="form-group">
                <div>
                    <label>Email:</label>
                    <input 
                        className="form-control"
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Senha:</label>
                    <input 
                        className="form-control"
                        type="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block mt-3">Entrar</button>
            </form>
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
};

export default LoginForm;
