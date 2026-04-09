// ============================================
// Página GameForm - Cadastro/Edição de Jogo
// Desenvolvido por: Gustavo Jansen Butenas
// ============================================

import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaSave, FaTimes, FaArrowLeft, FaGamepad } from 'react-icons/fa';
import { getJogoById, createJogo, updateJogo } from '../services/api';
import './GameForm.css';

function GameForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);

    const [formData, setFormData] = useState({
        nome: '',
        plataforma: '',
        genero: '',
        ano_lancamento: '',
        desenvolvedora: '',
        nota: '',
        descricao: '',
        imagem_url: ''
    });

    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(false);
    const [errors, setErrors] = useState([]);
    const [toast, setToast] = useState(null);

    // Opções para os selects
    const plataformas = ['PC', 'PlayStation 5', 'PlayStation 4', 'Xbox Series X/S', 'Xbox One', 'Nintendo Switch', 'Mobile', 'Outra'];
    const generos = ['Ação', 'Aventura', 'Ação/Aventura', 'RPG de Ação', 'RPG', 'Metroidvania', 'Roguelike', 'FPS', 'Estratégia', 'Simulação', 'Corrida', 'Esporte', 'Puzzle', 'Sandbox', 'Terror', 'Plataforma', 'Luta', 'Outro'];

    // Se editando, buscar dados do jogo
    useEffect(() => {
        if (isEditing) {
            const fetchJogo = async () => {
                setLoadingData(true);
                try {
                    const jogo = await getJogoById(id);
                    setFormData({
                        nome: jogo.nome || '',
                        plataforma: jogo.plataforma || '',
                        genero: jogo.genero || '',
                        ano_lancamento: jogo.ano_lancamento || '',
                        desenvolvedora: jogo.desenvolvedora || '',
                        nota: jogo.nota !== null ? jogo.nota : '',
                        descricao: jogo.descricao || '',
                        imagem_url: jogo.imagem_url || ''
                    });
                } catch (err) {
                    console.error('Erro ao buscar jogo:', err);
                    showToast('Erro ao carregar dados do jogo.', 'error');
                } finally {
                    setLoadingData(false);
                }
            };
            fetchJogo();
        }
    }, [id, isEditing]);

    // Exibir toast notification
    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 4000);
    };

    // Atualizar campo do formulário
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Limpar erros ao digitar
        if (errors.length > 0) setErrors([]);
    };

    // Validação do lado do cliente
    const validateForm = () => {
        const newErrors = [];

        if (!formData.nome.trim()) newErrors.push('O campo "Nome" é obrigatório');
        if (!formData.plataforma.trim()) newErrors.push('O campo "Plataforma" é obrigatório');
        if (!formData.genero.trim()) newErrors.push('O campo "Gênero" é obrigatório');
        if (!formData.ano_lancamento) {
            newErrors.push('O campo "Ano de Lançamento" é obrigatório');
        } else {
            const ano = parseInt(formData.ano_lancamento);
            if (ano < 1950 || ano > new Date().getFullYear() + 2) {
                newErrors.push(`O ano deve ser entre 1950 e ${new Date().getFullYear() + 2}`);
            }
        }
        if (!formData.desenvolvedora.trim()) newErrors.push('O campo "Desenvolvedora" é obrigatório');
        if (formData.nota !== '' && formData.nota !== null) {
            const nota = parseFloat(formData.nota);
            if (isNaN(nota) || nota < 0 || nota > 10) {
                newErrors.push('A nota deve ser um valor entre 0 e 10');
            }
        }

        setErrors(newErrors);
        return newErrors.length === 0;
    };

    // Submeter formulário
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        setLoading(true);
        try {
            if (isEditing) {
                await updateJogo(id, formData);
                showToast('Jogo atualizado com sucesso!');
            } else {
                await createJogo(formData);
                showToast('Jogo cadastrado com sucesso!');
            }
            // Redirecionar após sucesso
            setTimeout(() => navigate('/'), 1500);
        } catch (err) {
            console.error('Erro ao salvar jogo:', err);
            if (err.response?.data?.errors) {
                setErrors(err.response.data.errors);
            } else {
                showToast('Erro ao salvar o jogo. Tente novamente.', 'error');
            }
        } finally {
            setLoading(false);
        }
    };

    if (loadingData) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <span className="loading-text">Carregando dados do jogo...</span>
            </div>
        );
    }

    return (
        <div className="game-form-page page-enter">
            <div className="container">
                {/* Toast */}
                {toast && (
                    <div className="toast-container">
                        <div className={`toast toast-${toast.type}`}>
                            {toast.message}
                        </div>
                    </div>
                )}

                {/* Header */}
                <div className="form-header">
                    <Link to="/" className="btn btn-secondary btn-sm">
                        <FaArrowLeft /> Voltar
                    </Link>
                    <h1 className="form-title">
                        <FaGamepad className="form-title-icon" />
                        {isEditing ? 'Editar Jogo' : 'Novo Jogo'}
                    </h1>
                </div>

                {/* Erros */}
                {errors.length > 0 && (
                    <div className="form-errors" id="form-errors">
                        <h4>⚠️ Corrija os seguintes erros:</h4>
                        <ul>
                            {errors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Formulário */}
                <form className="game-form" onSubmit={handleSubmit} id="game-form">
                    {/* Nome */}
                    <div className="form-group">
                        <label htmlFor="nome" className="form-label">
                            Nome do Jogo <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            className="form-input"
                            value={formData.nome}
                            onChange={handleChange}
                            placeholder="Ex: The Legend of Zelda: Tears of the Kingdom"
                            maxLength={150}
                        />
                    </div>

                    {/* Plataforma e Gênero (lado a lado) */}
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="plataforma" className="form-label">
                                Plataforma <span className="required">*</span>
                            </label>
                            <select
                                id="plataforma"
                                name="plataforma"
                                className="form-input"
                                value={formData.plataforma}
                                onChange={handleChange}
                            >
                                <option value="">Selecione...</option>
                                {plataformas.map((p) => (
                                    <option key={p} value={p}>{p}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="genero" className="form-label">
                                Gênero <span className="required">*</span>
                            </label>
                            <select
                                id="genero"
                                name="genero"
                                className="form-input"
                                value={formData.genero}
                                onChange={handleChange}
                            >
                                <option value="">Selecione...</option>
                                {generos.map((g) => (
                                    <option key={g} value={g}>{g}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Ano e Desenvolvedora (lado a lado) */}
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="ano_lancamento" className="form-label">
                                Ano de Lançamento <span className="required">*</span>
                            </label>
                            <input
                                type="number"
                                id="ano_lancamento"
                                name="ano_lancamento"
                                className="form-input"
                                value={formData.ano_lancamento}
                                onChange={handleChange}
                                placeholder="Ex: 2023"
                                min="1950"
                                max={new Date().getFullYear() + 2}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="desenvolvedora" className="form-label">
                                Desenvolvedora <span className="required">*</span>
                            </label>
                            <input
                                type="text"
                                id="desenvolvedora"
                                name="desenvolvedora"
                                className="form-input"
                                value={formData.desenvolvedora}
                                onChange={handleChange}
                                placeholder="Ex: Nintendo EPD"
                                maxLength={100}
                            />
                        </div>
                    </div>

                    {/* Nota */}
                    <div className="form-group form-group-nota">
                        <label htmlFor="nota" className="form-label">
                            Nota (0 a 10)
                        </label>
                        <input
                            type="number"
                            id="nota"
                            name="nota"
                            className="form-input"
                            value={formData.nota}
                            onChange={handleChange}
                            placeholder="Ex: 9.5"
                            min="0"
                            max="10"
                            step="0.1"
                        />
                    </div>

                    {/* Descrição */}
                    <div className="form-group">
                        <label htmlFor="descricao" className="form-label">
                            Descrição / Review
                        </label>
                        <textarea
                            id="descricao"
                            name="descricao"
                            className="form-input form-textarea"
                            value={formData.descricao}
                            onChange={handleChange}
                            placeholder="Escreva uma descrição ou review do jogo..."
                            rows={5}
                        />
                    </div>

                    {/* URL da Imagem */}
                    <div className="form-group">
                        <label htmlFor="imagem_url" className="form-label">
                            URL da Imagem de Capa
                        </label>
                        <input
                            type="url"
                            id="imagem_url"
                            name="imagem_url"
                            className="form-input"
                            value={formData.imagem_url}
                            onChange={handleChange}
                            placeholder="https://exemplo.com/imagem.jpg"
                        />
                        {formData.imagem_url && (
                            <div className="image-preview">
                                <img
                                    src={formData.imagem_url}
                                    alt="Preview"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Botões */}
                    <div className="form-actions">
                        <Link to="/" className="btn btn-secondary" id="btn-cancel">
                            <FaTimes /> Cancelar
                        </Link>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                            id="btn-save"
                        >
                            <FaSave />
                            {loading ? 'Salvando...' : (isEditing ? 'Atualizar Jogo' : 'Cadastrar Jogo')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default GameForm;
