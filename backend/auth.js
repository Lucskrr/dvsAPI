require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User, Cart } = require('./models'); // Verifique a importação correta dos modelos
const secret = process.env.SECRET_KEY || 'coxinha';  // Use a variável de ambiente para o segredo

console.log('Modelos carregados: ', { User, Cart });  // Verifique se os modelos estão sendo importados corretamente

// Método para gerar o token jwt
async function generateToken(user) {
    const id = user.id;
    const email = user.email;
    const token = jwt.sign({ id, email }, secret, { expiresIn: '1h' });
    return token;
}

// Middleware para verificar o token e garantir que o carrinho está associado ao usuário
async function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Token não informado' });
    }
    const token = authHeader.split(' ')[1]; // Extrai o token após a palavra "Bearer"
    if (!token) {
        return res.status(401).json({ message: 'Token não informado' });
    }

    jwt.verify(token, secret, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        // Atribui os dados do usuário ao objeto `req`
        req.user = decoded;

        try {
            // Tenta encontrar o carrinho do usuário
            let cart = await Cart.findOne({ where: { userId: decoded.id } });

            if (!cart) {
                // Se não existir, cria um carrinho novo para o usuário
                cart = await Cart.create({ userId: decoded.id, total: 0.00 });
            }

            req.cart = cart; // Adiciona o carrinho ao objeto da requisição
            next(); // Continua o processamento da requisição
        } catch (error) {
            console.error('Erro ao acessar o carrinho:', error);  // Adicionando log de erro ao tentar acessar o carrinho
            return res.status(500).json({ message: 'Erro ao acessar o carrinho' });
        }
    });
}

module.exports = { generateToken, verifyToken };
