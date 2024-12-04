// ./services/userServices.js
const auth = require('../auth');
const bcrypt = require('bcrypt');
const { User } = require('../models');  // Usando diretamente o modelo User
const round_salts = process.env.BCRYPT_SALT_ROUNDS || 10; // Tornando a quantidade de saltos configurável via variáveis de ambiente

class UserService {
    constructor(UserModel = User) {  // Default para o modelo User se não for passado
        this.User = UserModel;
    }

    // Criar usuário
    async create(email, data_nasc, password) {
        try {
            const hashpassword = await bcrypt.hash(password, parseInt(round_salts)); // Usando o valor configurável de salts
            const newUser = await this.User.create({
                email: email,
                data_nasc: data_nasc,
                password: hashpassword
            });
            return newUser;
        } catch (error) {
            throw new Error('Erro ao criar o usuário: ' + error.message);
        }
    }

    // Retornar todos os usuários
    async findAll() {
        try {
            const AllUsers = await this.User.findAll();
            return AllUsers;
        } catch (error) {
            throw new Error('Erro ao buscar usuários: ' + error.message);
        }
    }

    // Retornar usuário por ID
    async findById(id) {
        try {
            const User = await this.User.findByPk(id);
            if (!User) {
                throw new Error('Usuário não encontrado');
            }
            return User;
        } catch (error) {
            throw new Error('Erro ao buscar usuário: ' + error.message);
        }
    }

    // Método para login
    async login(email, password) {
        try {
            const user = await this.User.findOne({ where: { email } });

            if (!user) {
                return { message: 'Usuário não encontrado' };  // Mensagem específica
            }

            // Verificar senha
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return { message: 'Senha inválida' };  // Mensagem específica
            }

            const token = await auth.generateToken(user);
            user.dataValues.token = token; // Adiciona o token ao retorno
            user.dataValues.password = ''; // Remove a senha antes de retornar
            return user;
        } catch (error) {
            throw new Error('Erro no login: ' + error.message);
        }
    }
}

module.exports = UserService;
