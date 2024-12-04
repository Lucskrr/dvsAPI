import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = () => {
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
        stock: ''
    });
    const [products, setProducts] = useState([]);

    // Função para atualizar os campos do formulário
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    // Função que envia os dados para o backend
    const handleAddProduct = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); // Pega o token do localStorage

        if (!token) {
            console.log('Você precisa estar logado para adicionar um produto.');
            return;
        }

        // Validação dos campos do produto
        if (!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.stock) {
            console.log('Todos os campos são obrigatórios!');
            return;
        }

        // Log para verificar os dados antes de enviar
        console.log('Dados que estão sendo enviados para o backend:', newProduct);

        // Mapeando os dados do frontend para o backend
        const productData = {
            nome: newProduct.name,         // Mapeia 'name' para 'nome'
            descricao: newProduct.description, // Mapeia 'description' para 'descricao'
            preco: newProduct.price,       // Mapeia 'price' para 'preco'
            estoque: newProduct.stock      // Mapeia 'stock' para 'estoque'
        };

        console.log('Enviando para o backend:', productData);  // Verifique os dados antes de enviar

        try {
            const response = await axios.post('http://localhost:8080/products', productData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Envia o token JWT
                },
            });

            // Se a resposta for bem-sucedida, atualiza a lista de produtos
            setProducts([...products, response.data]);
            setNewProduct({ name: '', description: '', price: '', stock: '' }); // Limpa o formulário

        } catch (error) {
            console.error('Erro ao adicionar produto', error);

            // Verifique se o erro contém uma resposta do servidor (erro de status HTTP)
            if (error.response) {
                console.error('Erro de resposta do servidor:', error.response);
                console.log('Status:', error.response.status);
                console.log('Mensagem do servidor:', error.response.data.message || error.response.statusText);
            } else if (error.request) {
                // Caso a requisição tenha sido feita, mas não houve resposta
                console.log('Erro na requisição:', error.request);
            } else {
                // Outro erro
                console.log('Erro desconhecido:', error.message);
            }
        }
    };

    return (
        <form onSubmit={handleAddProduct}>
            <input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                placeholder="Nome do Produto"
            />
            <input
                type="text"
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
                placeholder="Descrição"
            />
            <input
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
                placeholder="Preço"
            />
            <input
                type="number"
                name="stock"
                value={newProduct.stock}
                onChange={handleInputChange}
                placeholder="Estoque"
            />
            <button type="submit">Adicionar Produto</button>
        </form>
    );
};

export default ProducDatatForm;
