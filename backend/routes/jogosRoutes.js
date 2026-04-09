// ============================================
// Rotas de Jogos - Endpoints RESTful
// Desenvolvido por: Gustavo Jansen Butenas
// ============================================

const express = require('express');
const router = express.Router();
const {
    getJogos,
    getJogoById,
    createJogo,
    updateJogo,
    deleteJogo
} = require('../controllers/jogosController');
const { validateJogo } = require('../middlewares/validators');

// GET /api/jogos - Listar todos (com paginação e busca)
router.get('/', getJogos);

// GET /api/jogos/:id - Detalhes de um jogo
router.get('/:id', getJogoById);

// POST /api/jogos - Cadastrar novo jogo (com validação)
router.post('/', validateJogo, createJogo);

// PUT /api/jogos/:id - Atualizar jogo (com validação)
router.put('/:id', validateJogo, updateJogo);

// DELETE /api/jogos/:id - Remover jogo
router.delete('/:id', deleteJogo);

module.exports = router;
