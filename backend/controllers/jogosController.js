// ============================================
// Controller de Jogos - Operações CRUD
// Desenvolvido por: Gustavo Jansen Butenas
// ============================================

const pool = require('../config/db');

// GET /api/jogos - Listar todos os jogos com paginação e busca
const getJogos = async (req, res) => {
    try {
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 6));
        const search = req.query.search || '';
        const offset = (page - 1) * limit;

        let query = 'SELECT * FROM jogos';
        let countQuery = 'SELECT COUNT(*) as total FROM jogos';
        let params = [];
        let countParams = [];

        // Filtro de busca por nome, plataforma, gênero ou desenvolvedora
        if (search.trim()) {
            const searchCondition = ' WHERE nome LIKE ? OR plataforma LIKE ? OR genero LIKE ? OR desenvolvedora LIKE ?';
            query += searchCondition;
            countQuery += searchCondition;
            const searchParam = `%${search.trim()}%`;
            params = [searchParam, searchParam, searchParam, searchParam];
            countParams = [searchParam, searchParam, searchParam, searchParam];
        }

        query += ' ORDER BY id DESC LIMIT ? OFFSET ?';
        params.push(limit, offset);

        const [rows] = await pool.query(query, params);
        const [countResult] = await pool.query(countQuery, countParams);
        const total = countResult[0].total;

        res.json({
            data: rows,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Erro ao buscar jogos:', error);
        res.status(500).json({ error: 'Erro ao buscar jogos no banco de dados' });
    }
};

// GET /api/jogos/:id - Buscar um jogo por ID
const getJogoById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
            return res.status(400).json({ error: 'ID inválido' });
        }

        const [rows] = await pool.query('SELECT * FROM jogos WHERE id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Jogo não encontrado' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error('Erro ao buscar jogo:', error);
        res.status(500).json({ error: 'Erro ao buscar jogo no banco de dados' });
    }
};

// POST /api/jogos - Criar um novo jogo
const createJogo = async (req, res) => {
    try {
        const { nome, plataforma, genero, ano_lancamento, desenvolvedora, nota, descricao, imagem_url } = req.body;

        const [result] = await pool.query(
            `INSERT INTO jogos (nome, plataforma, genero, ano_lancamento, desenvolvedora, nota, descricao, imagem_url) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                nome.trim(),
                plataforma.trim(),
                genero.trim(),
                parseInt(ano_lancamento),
                desenvolvedora.trim(),
                nota !== undefined && nota !== '' ? parseFloat(nota) : 0,
                descricao ? descricao.trim() : '',
                imagem_url ? imagem_url.trim() : ''
            ]
        );

        // Retorna o jogo recém-criado
        const [newJogo] = await pool.query('SELECT * FROM jogos WHERE id = ?', [result.insertId]);
        res.status(201).json(newJogo[0]);
    } catch (error) {
        console.error('Erro ao criar jogo:', error);
        res.status(500).json({ error: 'Erro ao criar jogo no banco de dados' });
    }
};

// PUT /api/jogos/:id - Atualizar um jogo existente
const updateJogo = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, plataforma, genero, ano_lancamento, desenvolvedora, nota, descricao, imagem_url } = req.body;

        if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
            return res.status(400).json({ error: 'ID inválido' });
        }

        // Verificar se o jogo existe
        const [existing] = await pool.query('SELECT * FROM jogos WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({ error: 'Jogo não encontrado' });
        }

        await pool.query(
            `UPDATE jogos SET nome = ?, plataforma = ?, genero = ?, ano_lancamento = ?, 
             desenvolvedora = ?, nota = ?, descricao = ?, imagem_url = ? WHERE id = ?`,
            [
                nome.trim(),
                plataforma.trim(),
                genero.trim(),
                parseInt(ano_lancamento),
                desenvolvedora.trim(),
                nota !== undefined && nota !== '' ? parseFloat(nota) : 0,
                descricao ? descricao.trim() : '',
                imagem_url ? imagem_url.trim() : '',
                id
            ]
        );

        // Retorna o jogo atualizado
        const [updated] = await pool.query('SELECT * FROM jogos WHERE id = ?', [id]);
        res.json(updated[0]);
    } catch (error) {
        console.error('Erro ao atualizar jogo:', error);
        res.status(500).json({ error: 'Erro ao atualizar jogo no banco de dados' });
    }
};

// DELETE /api/jogos/:id - Remover um jogo
const deleteJogo = async (req, res) => {
    try {
        const { id } = req.params;

        if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
            return res.status(400).json({ error: 'ID inválido' });
        }

        // Verificar se o jogo existe
        const [existing] = await pool.query('SELECT * FROM jogos WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({ error: 'Jogo não encontrado' });
        }

        await pool.query('DELETE FROM jogos WHERE id = ?', [id]);

        res.json({ message: 'Jogo removido com sucesso', id: Number(id) });
    } catch (error) {
        console.error('Erro ao remover jogo:', error);
        res.status(500).json({ error: 'Erro ao remover jogo do banco de dados' });
    }
};

module.exports = {
    getJogos,
    getJogoById,
    createJogo,
    updateJogo,
    deleteJogo
};
