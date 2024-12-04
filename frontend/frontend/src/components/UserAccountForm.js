import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Para redirecionar após a criação da conta

const UserAccountForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        data_nasc: '',
        password: ''
    });
    const [responseMessage, setResponseMessage] = useState('');
    const navigate = useNavigate(); // Hook de navegação para redirecionar após a criação da conta

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Formatar a data para o formato 'YYYY-MM-DD'
        const formattedDate = new Date(formData.data_nasc).toISOString().split('T')[0];
    
        const dataToSend = {
            ...formData,
            data_nasc: formattedDate, // Altere para o formato correto
        };
    
        try {
            const response = await axios.post('http://localhost:8080/users/novouser', dataToSend, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.status === 200) {
                setResponseMessage('Conta criada com sucesso!');
                setTimeout(() => {
                    navigate('/login');  // Redireciona para a página de login após 2 segundos
                }, 2000);
            } else {
                setResponseMessage('Erro ao criar a conta.');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            setResponseMessage('Falha na conexão com o servidor.');
        }
    };

    return (
        <div className="user-account-form">
            <h3>Crie sua conta de usuário</h3>
            <form onSubmit={handleSubmit} className="form-group">
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
                    <label>Data de Nascimento:</label>
                    <input 
                        className="form-control"
                        type="date"  // Alterando para o tipo date
                        name="data_nasc" 
                        value={formData.data_nasc} 
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
                <button type="submit" className="btn btn-primary btn-block mt-3">Criar Conta</button>
            </form>
            {responseMessage && <p>{responseMessage}</p>}
            {responseMessage === 'Conta criada com sucesso!' && (
                <div>
                    <p>Conta criada com sucesso! Você será redirecionado para a página de login.</p>
                </div>
            )}
        </div>
    );
};

export default UserAccountForm;
