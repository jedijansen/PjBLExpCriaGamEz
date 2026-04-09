// ============================================
// Serviço de API - Comunicação com o Backend
// Desenvolvido por: Gustavo Jansen Butenas
// ============================================

import axios from 'axios';

// Instância do Axios configurada
const api = axios.create({
    baseURL: 'http://localhost:3001/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Buscar todos os jogos com paginação e busca
export const getJogos = async (page = 1, limit = 6, search = '') => {
    const response = await api.get('/jogos', {
        params: { page, limit, search }
    });
    return response.data;
};

// Buscar um jogo por ID
export const getJogoById = async (id) => {
    const response = await api.get(`/jogos/${id}`);
    return response.data;
};

// Criar um novo jogo
export const createJogo = async (jogoData) => {
    const response = await api.post('/jogos', jogoData);
    return response.data;
};

// Atualizar um jogo existente
export const updateJogo = async (id, jogoData) => {
    const response = await api.put(`/jogos/${id}`, jogoData);
    return response.data;
};

// Deletar um jogo
export const deleteJogo = async (id) => {
    const response = await api.delete(`/jogos/${id}`);
    return response.data;
};

export default api;
