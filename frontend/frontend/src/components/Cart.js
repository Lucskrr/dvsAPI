import React from 'react';

function Cart() {
    // Aqui você pode armazenar os itens do carrinho no estado
    const [cart, setCart] = useState([]);

    return (
        <div>
            <h1>Carrinho de Compras</h1>
            <ul>
                {cart.length > 0 ? (
                    cart.map((item, index) => (
                        <li key={index}>
                            <h2>{item.name}</h2>
                            <p>Preço: R${item.price}</p>
                        </li>
                    ))
                ) : (
                    <p>O carrinho está vazio!</p>
                )}
            </ul>
        </div>
    );
}

export default Cart;
