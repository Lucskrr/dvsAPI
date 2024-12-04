# Sistema de Gestão de Produtos e Carrinho de Compras

Este é um sistema web para gerenciamento de produtos, cadastro de usuários, autenticação via JWT e manutenção de carrinho de compras. O projeto foi desenvolvido como parte de uma avaliação semestral e inclui funcionalidades de:

- Criação de contas de usuários
- Login de usuários com geração de token JWT
- Manutenção de produtos (listar, adicionar, editar, excluir)
- Manutenção do carrinho de compras (listar, adicionar, remover)
- Gestão de fornecedores (listar, adicionar, editar, excluir)

## Tecnologias Utilizadas

- **Backend**:

  - Node.js
  - Express
  - Sequelize (para interação com o banco de dados MySQL)
  - JWT (JSON Web Tokens) para autenticação
  - Bcrypt para criptografia de senhas

- **Frontend**:

  - React.js
  - Axios (para fazer requisições HTTP)
  - React Router (para navegação entre páginas)
  - CSS para estilização

- **Banco de Dados**:
  - MySQL

## Funcionalidades

### 1. Tela de Criação de Conta de Usuário

- Permite que um novo usuário se registre no sistema com informações como **email**, **data de nascimento** e **senha**.

### 2. Tela de Login

- Permite que um usuário já registrado faça login no sistema utilizando o **email** e a **senha**.
- Ao fazer login, é gerado um token JWT que deve ser armazenado no `localStorage` para ser utilizado nas requisições subsequentes.

### 3. Tela de Manutenção de Produtos

- Permite ao usuário listar, adicionar, editar e excluir produtos no sistema.
- Acesso restrito aos usuários autenticados via token JWT.

### 4. Tela de Manutenção do Carrinho de Compras

- Permite que o usuário visualize os itens em seu carrinho de compras.
- Funcionalidades para **adicionar** e **remover** produtos do carrinho.
- Acesso restrito aos usuários autenticados via token JWT.

### 5. Tela de Fornecedores

- Permite listar, adicionar, editar e excluir fornecedores no sistema.
- Acesso restrito aos usuários autenticados via token JWT.

## Como Rodar o Projeto

### Backend

1. Clone o repositório:

   ```bash
   git clone https://github.com/Lucskrr/dvsAPI.git
   ```
