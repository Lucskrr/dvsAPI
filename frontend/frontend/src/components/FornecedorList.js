import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FornecedorList = () => {
  const [fornecedores, setFornecedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Função para carregar fornecedores
  useEffect(() => {
    const fetchFornecedores = async () => {
      try {
        const response = await axios.get('/supplier', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setFornecedores(response.data);
        setLoading(false);
      } catch (error) {
        setError('Erro ao carregar fornecedores');
        setLoading(false);
      }
    };

    fetchFornecedores();
  }, []);

  // Função para excluir fornecedor
  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este fornecedor?')) {
      try {
        await axios.delete(`/supplier/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        // Atualizar a lista de fornecedores após exclusão
        setFornecedores(fornecedores.filter((fornecedor) => fornecedor.id !== id));
      } catch (error) {
        alert('Erro ao excluir fornecedor');
      }
    }
  };

  if (loading) return <p>Carregando fornecedores...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Fornecedores</h2>
      <Link to="/fornecedores/adicionar">
        <button>Adicionar Fornecedor</button>
      </Link>
      <ul>
        {fornecedores.map((fornecedor) => (
          <li key={fornecedor.id}>
            <div>
              <strong>{fornecedor.name}</strong> - {fornecedor.email}
            </div>
            <div>
              <button onClick={() => handleDelete(fornecedor.id)}>Excluir</button>
              <Link to={`/fornecedores/adicionar?id=${fornecedor.id}`}>
                <button>Editar</button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FornecedorList;
