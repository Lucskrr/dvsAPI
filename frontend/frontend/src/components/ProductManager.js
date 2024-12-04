import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductManager = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
        stock: ''
    });

    const [quantity, setQuantity] = useState(1); // Quantidade inicial para adicionar ao carrinho

    useEffect(() => {
        // Carregar os produtos do banco de dados
        const fetchProducts = async () => {
            const token = localStorage.getItem('token'); // Pega o token do localStorage

            if (!token) {
                console.log('Você precisa estar logado para visualizar os produtos.');
                return;
            }

            try {
                const response = await axios.get('http://localhost:8080/products', {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Envia o token JWT
                    },
                });
                setProducts(response.data);
            } catch (error) {
                console.error('Erro ao carregar produtos', error);
            }
        };
        fetchProducts();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({
            ...newProduct,
            [name]: value
        });
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); // Pega o token do localStorage

        if (!token) {
            console.log('Você precisa estar logado para adicionar um produto.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/products', newProduct, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Envia o token JWT
                },
            });
            setProducts([...products, response.data]);
            setNewProduct({ name: '', description: '', price: '', stock: '' }); // Limpa o formulário
        } catch (error) {
            console.error('Erro ao adicionar produto', error);
        }
    };

    const handleAddToCart = async (productId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('Você precisa estar logado para adicionar um produto ao carrinho.');
            return;
        }

        try {
            const response = await axios.post('/api/cart/add-to-cart', {
                userId: 1, // Usuário fixo por enquanto
                productId,
                quantity, // Quantidade do produto que será adicionada ao carrinho
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            alert(response.data.message); // Exibe a mensagem de sucesso
        } catch (error) {
            console.error('Erro ao adicionar produto ao carrinho', error);
        }
    };

    return (
        <div className="product-manager">
            <h3>Gerenciar Produtos</h3>
            <div className="buttons">
                <Link to="/" className="btn btn-secondary">Voltar à Página Inicial</Link>
            </div>
            <form onSubmit={handleAddProduct}>
                <h4>Adicionar Produto</h4>
                <input
                    type="text"
                    name="name"
                    value={newProduct.name}
                    onChange={handleChange}
                    placeholder="Nome do Produto"
                    required
                />
                <input
                    type="text"
                    name="description"
                    value={newProduct.description}
                    onChange={handleChange}
                    placeholder="Descrição"
                    required
                />
                <input
                    type="number"
                    name="price"
                    value={newProduct.price}
                    onChange={handleChange}
                    placeholder="Preço"
                    required
                />
                <input
                    type="number"
                    name="stock"
                    value={newProduct.stock}
                    onChange={handleChange}
                    placeholder="Estoque"
                    required
                />
                <button type="submit" className="btn btn-success">Adicionar Produto</button>
            </form>

            <h4>Lista de Produtos</h4>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - {product.price} 
                        <input 
                            type="number" 
                            value={quantity} 
                            min="1" 
                            onChange={(e) => setQuantity(e.target.value)} 
                            style={{ marginLeft: '10px', width: '50px' }}
                        />
                        <button onClick={() => handleAddToCart(product.id)} className="btn btn-primary" style={{ marginLeft: '10px' }}>
                            Adicionar ao Carrinho
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductManager;
