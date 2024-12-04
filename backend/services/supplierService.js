// ./services/supplierService.js
const { Supplier } = require('../models');

class SupplierService {
  // Listar todos os fornecedores
  async findAll() {
    try {
      const suppliers = await Supplier.findAll();
      return suppliers;
    } catch (error) {
      throw new Error('Erro ao listar fornecedores');
    }
  }

  // Criar um novo fornecedor
  async create(name, email, phone, address) {
    try {
      const newSupplier = await Supplier.create({ name, email, phone, address });
      return newSupplier;
    } catch (error) {
      throw new Error('Erro ao criar fornecedor');
    }
  }

  // Editar fornecedor
  async update(id, name, email, phone, address) {
    try {
      const supplier = await Supplier.findByPk(id);
      if (!supplier) throw new Error('Fornecedor não encontrado');
      supplier.name = name;
      supplier.email = email;
      supplier.phone = phone;
      supplier.address = address;
      await supplier.save();
      return supplier;
    } catch (error) {
      throw new Error('Erro ao editar fornecedor');
    }
  }

  // Excluir fornecedor
  async delete(id) {
    try {
      const supplier = await Supplier.findByPk(id);
      if (!supplier) throw new Error('Fornecedor não encontrado');
      await supplier.destroy();
      return { message: 'Fornecedor excluído com sucesso' };
    } catch (error) {
      throw new Error('Erro ao excluir fornecedor');
    }
  }
}

module.exports = new SupplierService();
