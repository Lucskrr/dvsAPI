const { Cart, CartProduct, Product } = require('../models');

// Função para calcular o total do carrinho
const calculateCartTotal = async (cartId) => {
  const cartProducts = await CartProduct.findAll({ where: { cartId } });
  let total = 0;
  cartProducts.forEach((item) => {
    total += item.quantity * item.priceAtTheTime;
  });
  return total;
};

// Adicionar produto ao carrinho
const addToCart = async (userId, productId, quantity) => {
  try {
    console.log('Iniciando adição ao carrinho', { userId, productId, quantity });

    // Verifica se o carrinho já existe para o usuário
    let cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      // Se o carrinho não existir, cria um novo
      console.log('Carrinho não encontrado, criando novo carrinho...');
      cart = await Cart.create({ userId });
    }

    // Verifica o produto
    const product = await Product.findByPk(productId);
    if (!product) {
      throw new Error('Produto não encontrado');
    }
    console.log('Produto encontrado:', product);

    // Verifica se há estoque suficiente
    if (product.estoque < quantity) {
      throw new Error(`Estoque insuficiente para o produto "${product.nome}"`);
    }

    const priceAtTheTime = product.preco;

    // Verifica se o produto já existe no carrinho
    const existingCartProduct = await CartProduct.findOne({
      where: { cartId: cart.id, productId },
    });

    if (existingCartProduct) {
      // Se o produto já estiver no carrinho, atualiza a quantidade
      console.log('Produto já existe no carrinho, atualizando a quantidade...');
      existingCartProduct.quantity += quantity;
      existingCartProduct.priceAtTheTime = priceAtTheTime;
      await existingCartProduct.save();
    } else {
      // Se o produto não estiver no carrinho, adiciona um novo item
      console.log('Produto não encontrado no carrinho, adicionando novo produto...');
      await CartProduct.create({
        cartId: cart.id,
        productId,
        quantity,
        priceAtTheTime,
      });
    }

    // Atualiza o total do carrinho
    const total = await calculateCartTotal(cart.id);
    await cart.update({ total });

    console.log('Produto adicionado ao carrinho com sucesso!');
    return { cart, message: 'Produto adicionado ao carrinho' };
  } catch (err) {
    console.error('Erro ao adicionar produto ao carrinho:', err);
    throw new Error(err.message || 'Erro ao adicionar produto ao carrinho');
  }
};

// Visualizar o carrinho
const viewCart = async (userId) => {
  try {
    console.log('Visualizando o carrinho para o usuário:', userId);

    const cart = await Cart.findOne({
      where: { userId },
      include: {
        model: CartProduct,
        as: 'cartProducts',
        include: {
          model: Product,
          as: 'product',
        },
      },
    });

    if (!cart) {
      throw new Error('Carrinho não encontrado');
    }

    console.log('Carrinho encontrado:', cart);
    return cart;
  } catch (err) {
    console.error('Erro ao visualizar o carrinho:', err);
    throw new Error(err.message || 'Erro ao visualizar o carrinho');
  }
};

// Atualizar a quantidade do item no carrinho
const updateQuantity = async (cartProductId, quantity) => {
  try {
    console.log('Atualizando quantidade do item no carrinho', { cartProductId, quantity });

    const cartProduct = await CartProduct.findByPk(cartProductId);
    if (!cartProduct) {
      throw new Error('Item não encontrado');
    }

    // Verifica se há estoque suficiente
    const product = await Product.findByPk(cartProduct.productId);
    if (product.estoque < quantity) {
      throw new Error(`Estoque insuficiente para o produto "${product.nome}"`);
    }

    cartProduct.quantity = quantity;
    await cartProduct.save();

    // Atualiza o total do carrinho
    const cart = await Cart.findByPk(cartProduct.cartId);
    const total = await calculateCartTotal(cart.id);
    await cart.update({ total });

    console.log('Quantidade atualizada com sucesso');
    return { cart, message: 'Quantidade atualizada' };
  } catch (err) {
    console.error('Erro ao atualizar a quantidade do item no carrinho:', err);
    throw new Error(err.message || 'Erro ao atualizar a quantidade');
  }
};

// Remover item do carrinho
const removeItem = async (cartProductId) => {
  try {
    console.log('Removendo item do carrinho', { cartProductId });

    const cartProduct = await CartProduct.findByPk(cartProductId);
    if (!cartProduct) {
      throw new Error('Item não encontrado');
    }

    await cartProduct.destroy();

    // Atualiza o total do carrinho
    const cart = await Cart.findByPk(cartProduct.cartId);
    const total = await calculateCartTotal(cart.id);
    await cart.update({ total });

    console.log('Item removido do carrinho');
    return { cart, message: 'Item removido do carrinho' };
  } catch (err) {
    console.error('Erro ao remover item do carrinho:', err);
    throw new Error(err.message || 'Erro ao remover item do carrinho');
  }
};

// Limpar o carrinho
const clearCart = async (userId) => {
  try {
    console.log('Limpando o carrinho para o usuário:', userId);

    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      throw new Error('Carrinho não encontrado');
    }

    await CartProduct.destroy({ where: { cartId: cart.id } });

    // Atualiza o total para 0
    await cart.update({ total: 0 });

    console.log('Carrinho limpo com sucesso');
    return { message: 'Carrinho limpo' };
  } catch (err) {
    console.error('Erro ao limpar o carrinho:', err);
    throw new Error(err.message || 'Erro ao limpar o carrinho');
  }
};

module.exports = {
  addToCart,
  viewCart,
  updateQuantity,
  removeItem,
  clearCart,
};
