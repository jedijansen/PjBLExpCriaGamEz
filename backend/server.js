// ============================================
// Servidor Express - Coleção de Jogos
// Desenvolvido por: Gustavo Jansen Butenas
// ============================================

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const jogosRoutes = require('./routes/jogosRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares globais
app.use(cors());
app.use(express.json());

// Rota raiz
app.get('/', (req, res) => {
    res.json({
        message: 'API Coleção de Jogos',
        author: 'Gustavo Jansen Butenas',
        version: '1.0.0',
        endpoints: {
            jogos: '/api/jogos'
        }
    });
});

// Rotas da API
app.use('/api/jogos', jogosRoutes);

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error('Erro no servidor:', err.stack);
    res.status(500).json({
        error: 'Erro interno do servidor',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Rota 404
app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🎮 Servidor rodando em http://localhost:${PORT}`);
    console.log(`📡 API disponível em http://localhost:${PORT}/api/jogos`);
});
