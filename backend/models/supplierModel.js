// ./models/supplierModel.js
module.exports = (sequelize, DataTypes) => {
    const Supplier = sequelize.define('Supplier', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    return Supplier;
  };
  