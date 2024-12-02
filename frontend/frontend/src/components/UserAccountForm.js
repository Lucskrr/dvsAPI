import React, { useState } from 'react';
import axios from 'axios';

const UserAccountForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        data_nasc: '',
        password: ''
    });
    
    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/users/novouser', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (response.status === 200) {
                setResponseMessage('Conta criada com sucesso!');
            } else {
                setResponseMessage('Erro ao criar a conta.');
            }
        } catch (error) {
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
                        type="text" 
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
        </div>
    );
};

export default UserAccountForm;
