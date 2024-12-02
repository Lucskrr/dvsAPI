// ./services/userServices.js
const auth = require('../auth');
const bcrypt = require('bcrypt');
var round_salts = 10;

const db = require('../models');

class UserService{
    constructor(UserModel){
        this.User = UserModel;
    }

    async create(email, data_nasc, password){
        try{
            const hashpassword = await bcrypt.hash(password, parseInt(round_salts));
            const newUser = await this.User.create({
                email:email,
                data_nasc:data_nasc,
                password:hashpassword
            });
            return newUser? newUser : null;
        }
        catch (error){
            throw error;
        }
    }

    // Método para retornar todos os usuários
    async findAll()
    {
        try{
            const AllUsers = await this.User.findAll();
            return AllUsers? AllUsers : null;
        }
        catch(error){
            throw error;
        }
    }

    // Método para retornar o usuário pelo id
    async findById(id){
        try{
            const User = await this.User.findByPk(id);
            return User? User : null;
        }
        catch(error){
            throw error;
        }
    }

    // Método para login
async login(email, password) {
    try {
        const user = await this.User.findOne({ where: { email } });
        
        if (!user) {
            return null; // Retorna null se o usuário não for encontrado
        }

        // Verifica a senha
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            const token = await auth.generateToken(user);
            user.dataValues.token = token; // Adiciona o token ao retorno
            user.dataValues.password = ''; // Remove a senha antes de retornar
            return user; // Retorna o usuário com o token
        } else {
            return null; // Retorna null se a senha for inválida
        }
    } catch (error) {
        throw error; // Lança o erro para ser tratado no controller
    }
}

}

module.exports = UserService; 