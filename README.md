# 🎮 GamEz- Sistema de Biblioteca e Review de Jogos

**Desenvolvido por: Gustavo Jansen Butenas**

Vídeo Disponível no YouTube: https://www.youtube.com/@JansenJedi

## 📋 Tecnologias Utilizadas

- **Frontend:** React (Vite) + CSS
- **Backend:** Node.js + Express
- **Banco de Dados:** MySQL
- **Comunicação:** Axios (HTTP Client)

## 📦 Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) (incluso com o Node.js)
- [MySQL Server](https://dev.mysql.com/downloads/mysql/) (versão 8.0 ou superior)

## 🚀 Como Rodar o Projeto

### 1. Importar o Banco de Dados

1. Abra o terminal do MySQL ou um client como MySQL Workbench
2. Execute o arquivo `database.sql`:

```bash
mysql -u root -p < database.sql
```

> Ou abra o MySQL Workbench, vá em **File > Open SQL Script**, selecione o arquivo `database.sql` e execute.

### 2. Configurar o Backend

```bash
# Entrar na pasta do backend
cd backend

# Instalar dependências
npm install

# (Opcional) Configurar variáveis de ambiente
# Copie o .env.example para .env e ajuste se necessário
cp .env.example .env

# Edite o .env com suas credenciais do MySQL:
# DB_HOST=localhost
# DB_PORT=3306
# DB_USER=root
# DB_PASSWORD=sua_senha_aqui
# DB_NAME=game_collection

# Iniciar o servidor
npm start
```

O backend estará rodando em `http://localhost:3001`

### 3. Configurar o Frontend

Em outro terminal:

```bash
# Entrar na pasta do frontend
cd frontend

# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev
```

O frontend estará rodando em `http://localhost:5173`

### 4. Acessar o Sistema

Abra o navegador e acesse: **http://localhost:5173**

## 📁 Estrutura do Projeto

```
game-collection/
├── README.md               # Este arquivo
├── database.sql             # Script SQL para criação do banco
├── backend/                 # Servidor Node.js + Express
│   ├── package.json
│   ├── server.js            # Ponto de entrada do servidor
│   ├── .env.example         # Exemplo de configuração
│   ├── config/
│   │   └── db.js            # Conexão com o MySQL
│   ├── controllers/
│   │   └── jogosController.js  # Lógica do CRUD
│   ├── routes/
│   │   └── jogosRoutes.js      # Rotas da API
│   └── middlewares/
│       └── validators.js       # Validações de dados
└── frontend/                # Interface React
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── index.css           # Estilos globais
        ├── App.css
        ├── components/         # Componentes reutilizáveis
        │   ├── Header.jsx/css
        │   ├── Footer.jsx/css
        │   ├── GameCard.jsx/css
        │   ├── Pagination.jsx/css
        │   └── Modal.jsx/css
        ├── pages/              # Páginas do sistema
        │   ├── Home.jsx/css       # Listagem com paginação
        │   ├── GameForm.jsx/css   # Cadastro e edição
        │   └── GameDetail.jsx/css # Visualização detalhada
        └── services/
            └── api.js          # Configuração do Axios
```

## 🗄️ Banco de Dados

### Tabela `jogos`

| Campo            | Tipo           | Descrição                 |
|------------------|----------------|---------------------------|
| id               | INT (PK, AI)   | Identificador único       |
| nome             | VARCHAR(150)   | Nome do jogo              |
| plataforma       | VARCHAR(50)    | Plataforma do jogo        |
| genero           | VARCHAR(50)    | Gênero do jogo            |
| ano_lancamento   | INT            | Ano de lançamento         |
| desenvolvedora   | VARCHAR(100)   | Empresa desenvolvedora    |
| nota             | DECIMAL(3,1)   | Nota de 0.0 a 10.0       |
| descricao        | TEXT           | Descrição/review          |
| imagem_url       | VARCHAR(500)   | URL da imagem de capa     |
| created_at       | TIMESTAMP      | Data de criação           |
| updated_at       | TIMESTAMP      | Data de atualização       |

## 🔗 Endpoints da API

| Método | Rota                | Descrição                           |
|--------|---------------------|-------------------------------------|
| GET    | `/api/jogos`        | Listar jogos (paginação + busca)    |
| GET    | `/api/jogos/:id`    | Buscar jogo por ID                  |
| POST   | `/api/jogos`        | Cadastrar novo jogo                 |
| PUT    | `/api/jogos/:id`    | Atualizar jogo existente            |
| DELETE | `/api/jogos/:id`    | Remover jogo                        |

### Parâmetros de Query (GET /api/jogos)

- `page` - Número da página (padrão: 1)
- `limit` - Itens por página (padrão: 6)
- `search` - Termo de busca

## ✨ Funcionalidades

- Listagem de jogos com paginação
- Busca por nome, plataforma, gênero ou desenvolvedora
- Cadastro de novos jogos com validação
- Edição de jogos existentes
- Exclusão de jogos com confirmação
- Visualização detalhada de cada jogo
- Interface responsiva e moderna
- Tratamento de erros com mensagens amigáveis
- Validações no frontend e backend

Inspirado no App Futez, um aplicativo de avaliação de jogos e jogadores de futebol.
