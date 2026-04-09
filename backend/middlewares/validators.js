// ============================================
// Middlewares de Validação
// Desenvolvido por: Gustavo Jansen Butenas
// ============================================

// Validação dos dados de um jogo antes de criar/atualizar
const validateJogo = (req, res, next) => {
    const { nome, plataforma, genero, ano_lancamento, desenvolvedora, nota } = req.body;
    const errors = [];

    // Validação do nome (obrigatório, máximo 150 caracteres)
    if (!nome || nome.trim() === '') {
        errors.push('O campo "nome" é obrigatório');
    } else if (nome.trim().length > 150) {
        errors.push('O campo "nome" deve ter no máximo 150 caracteres');
    }

    // Validação da plataforma (obrigatório)
    if (!plataforma || plataforma.trim() === '') {
        errors.push('O campo "plataforma" é obrigatório');
    } else if (plataforma.trim().length > 50) {
        errors.push('O campo "plataforma" deve ter no máximo 50 caracteres');
    }

    // Validação do gênero (obrigatório)
    if (!genero || genero.trim() === '') {
        errors.push('O campo "gênero" é obrigatório');
    } else if (genero.trim().length > 50) {
        errors.push('O campo "gênero" deve ter no máximo 50 caracteres');
    }

    // Validação do ano de lançamento (obrigatório, número válido)
    if (ano_lancamento === undefined || ano_lancamento === null || ano_lancamento === '') {
        errors.push('O campo "ano de lançamento" é obrigatório');
    } else {
        const ano = parseInt(ano_lancamento);
        if (isNaN(ano)) {
            errors.push('O campo "ano de lançamento" deve ser um número');
        } else if (ano < 1950 || ano > new Date().getFullYear() + 2) {
            errors.push(`O campo "ano de lançamento" deve ser entre 1950 e ${new Date().getFullYear() + 2}`);
        }
    }

    // Validação da desenvolvedora (obrigatório)
    if (!desenvolvedora || desenvolvedora.trim() === '') {
        errors.push('O campo "desenvolvedora" é obrigatório');
    } else if (desenvolvedora.trim().length > 100) {
        errors.push('O campo "desenvolvedora" deve ter no máximo 100 caracteres');
    }

    // Validação da nota (opcional, mas se informada deve ser entre 0 e 10)
    if (nota !== undefined && nota !== null && nota !== '') {
        const notaNum = parseFloat(nota);
        if (isNaN(notaNum)) {
            errors.push('O campo "nota" deve ser um número');
        } else if (notaNum < 0 || notaNum > 10) {
            errors.push('O campo "nota" deve ser um valor entre 0 e 10');
        }
    }

    // Se houver erros, retorna 400 com a lista de erros
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
};

module.exports = { validateJogo };
