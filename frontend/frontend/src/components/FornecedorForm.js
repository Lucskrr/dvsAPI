// src/components/FornecedorForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FornecedorForm = ({ supplierId, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (supplierId) {
      // Carregar os dados do fornecedor se houver um ID
      const fetchSupplier = async () => {
        try {
          const response = await axios.get(`/supplier/${supplierId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });
          const { name, email, phone, address } = response.data;
          setName(name);
          setEmail(email);
          setPhone(phone);
          setAddress(address);
        } catch (error) {
          console.error('Erro ao carregar fornecedor', error);
        }
      };
      fetchSupplier();
    }
  }, [supplierId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, email, phone, address };

    try {
      if (supplierId) {
        // Atualizar fornecedor
        await axios.put(`/supplier/${supplierId}`, data, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
      } else {
        // Criar novo fornecedor
        await axios.post('/supplier', data, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
      }
      onClose(); // Fecha o modal ou redireciona
    } catch (error) {
      console.error('Erro ao salvar fornecedor', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{supplierId ? 'Editar Fornecedor' : 'Adicionar Fornecedor'}</h3>
      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Telefone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        type="text"
        placeholder="Endereço"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button type="submit">{supplierId ? 'Atualizar' : 'Adicionar'}</button>
    </form>
  );
};

export default FornecedorForm;
