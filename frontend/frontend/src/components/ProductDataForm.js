import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const ProductDataForm = () => {
    const [formData, setFormData] = useState({
        id: '',
        produto: '',
        categoria: '',
        preco: ''
    });

    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/products', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setResponseMessage('Produto cadastrado com sucesso!');
        } catch (error) {
            setResponseMessage('Erro ao cadastrar produto.');
        }
    };

    const handleClear = () => {
        setFormData({
            id: '',
            produto: '',
            categoria: '',
            preco: '',
        });
        setResponseMessage('');
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/products/${formData.id}`);
            setFormData({
                id: response.data.id,
                produto: response.data.produto,
                categoria: response.data.categoria,
                preco: response.data.preco,
            });
        } catch (error) {
            setResponseMessage('Produto não encontrado.');
        }
    };

    return (
        <div className="user-account-form">
            <h3>Cadastro de Produtos</h3>
            <form onSubmit={handleSave}>
                <div className="form-group">
                    <label>Id:</label>
                    <input
                        type="text"
                        name="id"
                        value={formData.id}
                        onChange={handleChange}
                        required
                    />
                    <label>Produto:</label>
                    <input
                        type="text"
                        name="produto"
                        value={formData.produto}
                        onChange={handleChange}
                        required
                    />
                    <label>Categoria:</label>
                    <input
                        type="text"
                        name="categoria"
                        value={formData.categoria}
                        onChange={handleChange}
                        required
                    />
                    <label>Preço:</label>
                    <input
                        type="text"
                        name="preco"
                        value={formData.preco}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <button type="submit" className="btn btn-primary">Salvar</button>
                    <button type="button" className="btn btn-secondary" onClick={handleClear}>Limpar</button>
                </div>
            </form>
            <button className="btn btn-info" onClick={handleSearch}>Buscar Produto</button>
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
};

export default ProductDataForm;
