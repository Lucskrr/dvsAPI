import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const userId = 1; // Você pode pegar o ID do usuário do contexto ou do token JWT

    // Função para buscar os dados do carrinho do backend
    const fetchCart = async () => {
        try {
            const response = await axios.get(`/api/cart/view-cart/${userId}`);
            setCart(response.data.cartProducts || []);
            updateTotal(response.data.total);
        } catch (error) {
            console.error('Erro ao carregar o carrinho', error);
        }
    };

    // Função para atualizar o total do carrinho
    const updateTotal = (newTotal) => {
        setTotal(newTotal);
    };

    useEffect(() => {
        fetchCart();
    }, []); // Apenas uma vez quando o componente for montado

    const removeItem = async (cartProductId) => {
        try {
            await axios.delete(`/api/cart/remove-item/${cartProductId}`); // Rota de remoção do item
            fetchCart(); // Recarrega o carrinho após a remoção
        } catch (error) {
            console.error('Erro ao remover item', error);
        }
    };

    const updateQuantity = async (cartProductId, quantity) => {
        try {
            if (quantity < 1) {
                alert('A quantidade deve ser maior ou igual a 1');
                return;
            }
            await axios.put(`/api/cart/update-quantity/${cartProductId}`, { quantity });
            fetchCart(); // Recarrega o carrinho após atualizar a quantidade
        } catch (error) {
            console.error('Erro ao atualizar quantidade', error);
        }
    };

    return (
        <div className="cart-page">
            <h2>Carrinho de Compras</h2>
            {cart.length > 0 ? (
                <div className="cart-items">
                    {cart.map(item => (
                        <div className="cart-item" key={item.id}>
                            <p>{item.product.nome} - R${item.priceAtTheTime}</p>
                            <div>
                                <label>Quantidade:</label>
                                <input 
                                    type="number" 
                                    value={item.quantity} 
                                    min="1" 
                                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))} 
                                />
                            </div>
                            <button onClick={() => removeItem(item.id)} className="btn btn-danger">Remover</button>
                        </div>
                    ))}
                    <div className="cart-total">
                        <p>Total: R${total.toFixed(2)}</p>
                    </div>
                </div>
            ) : (
                <p>O seu carrinho está vazio.</p>
            )}
            <div className="buttons">
                <Link to="/" className="btn btn-secondary">Voltar à Home</Link>
            </div>
        </div>
    );
};

export default Cart;
