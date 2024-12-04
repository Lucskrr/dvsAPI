// ./controllers/supplierController.js
const supplierService = require('../services/supplierService');

const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await supplierService.findAll();
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSupplier = async (req, res) => {
  const { name, email, phone, address } = req.body;
  try {
    const newSupplier = await supplierService.create(name, email, phone, address);
    res.status(201).json(newSupplier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSupplier = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address } = req.body;
  try {
    const updatedSupplier = await supplierService.update(id, name, email, phone, address);
    res.status(200).json(updatedSupplier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteSupplier = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await supplierService.delete(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};
