import React, { useState, useEffect } from 'react';
import api from '../api'; // Importa o arquivo de configuração do Axios

function ProductManager() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Faz a requisição para obter os produtos
        api.get('/products') // Aqui, '/products' é a rota do seu backend que retorna os produtos
            .then(response => {
                setProducts(response.data); // Armazena os dados dos produtos
            })
            .catch(error => {
                console.error('Erro ao carregar os produtos:', error);
            });
    }, []);

    return (
        <div>
            <h1>Lista de Produtos</h1>
            <ul>
                {products.length > 0 ? (
                    products.map(product => (
                        <li key={product.id}>
                            <h2>{product.name}</h2>
                            <p>{product.description}</p>
                            <p>Preço: R${product.price}</p>
                            <button>Adicionar ao Carrinho</button>
                        </li>
                    ))
                ) : (
                    <p>Carregando produtos...</p>
                )}
            </ul>
        </div>
    );
}

export default ProductManager;
