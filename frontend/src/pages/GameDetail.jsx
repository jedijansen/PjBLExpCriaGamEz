// ============================================
// Página GameDetail - Visualização Detalhada
// Desenvolvido por: Gustavo Jansen Butenas
// ============================================

import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft, FaEdit, FaTrash, FaStar, FaCalendarAlt, FaDesktop, FaBuilding, FaClock, FaGamepad } from 'react-icons/fa';
import Modal from '../components/Modal';
import { getJogoById, deleteJogo } from '../services/api';
import './GameDetail.css';

function GameDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [jogo, setJogo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [toast, setToast] = useState(null);

    // Buscar dados do jogo
    useEffect(() => {
        const fetchJogo = async () => {
            setLoading(true);
            try {
                const data = await getJogoById(id);
                setJogo(data);
            } catch (err) {
                console.error('Erro ao buscar jogo:', err);
                if (err.response?.status === 404) {
                    setError('Jogo não encontrado.');
                } else {
                    setError('Erro ao carregar dados do jogo.');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchJogo();
    }, [id]);

    // Toast notification
    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 4000);
    };

    // Deletar jogo
    const handleDelete = async () => {
        setDeleting(true);
        try {
            await deleteJogo(id);
            showToast('Jogo removido com sucesso!');
            setTimeout(() => navigate('/'), 1500);
        } catch (err) {
            console.error('Erro ao deletar jogo:', err);
            showToast('Erro ao remover o jogo.', 'error');
        } finally {
            setDeleting(false);
            setShowDeleteModal(false);
        }
    };

    // Cor da nota
    const getNotaColor = (nota) => {
        if (nota >= 9) return '#10b981';
        if (nota >= 7) return '#f59e0b';
        if (nota >= 5) return '#f97316';
        return '#ef4444';
    };

    // Formatar data
    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <span className="loading-text">Carregando jogo...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container">
                <div className="error-container">
                    <div className="error-icon">😕</div>
                    <h3 className="error-title">{error}</h3>
                    <Link to="/" className="btn btn-primary">
                        <FaArrowLeft /> Voltar à Coleção
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="game-detail page-enter">
            <div className="container">
                {/* Toast */}
                {toast && (
                    <div className="toast-container">
                        <div className={`toast toast-${toast.type}`}>
                            {toast.message}
                        </div>
                    </div>
                )}

                {/* Delete Modal */}
                <Modal
                    isOpen={showDeleteModal}
                    title="Remover Jogo"
                    message={`Tem certeza que deseja remover "${jogo?.nome}" da sua coleção? Esta ação não pode ser desfeita.`}
                    onConfirm={handleDelete}
                    onCancel={() => setShowDeleteModal(false)}
                    confirmText={deleting ? 'Removendo...' : 'Sim, Remover'}
                    cancelText="Cancelar"
                    type="danger"
                />

                {/* Top Bar */}
                <div className="detail-topbar">
                    <Link to="/" className="btn btn-secondary btn-sm">
                        <FaArrowLeft /> Voltar
                    </Link>
                    <div className="detail-topbar-actions">
                        <Link to={`/jogos/editar/${id}`} className="btn btn-primary btn-sm" id="btn-edit-game">
                            <FaEdit /> Editar
                        </Link>
                        <button
                            className="btn btn-danger btn-sm"
                            onClick={() => setShowDeleteModal(true)}
                            id="btn-delete-game"
                        >
                            <FaTrash /> Excluir
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="detail-content">
                    {/* Image Section */}
                    <div className="detail-image-section">
                        {jogo.imagem_url ? (
                            <img
                                src={jogo.imagem_url}
                                alt={jogo.nome}
                                className="detail-image"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                }}
                            />
                        ) : null}
                        <div
                            className="detail-image-placeholder"
                            style={{ display: jogo.imagem_url ? 'none' : 'flex' }}
                        >
                            <FaDesktop style={{ fontSize: '4rem', opacity: 0.3 }} />
                            <span style={{ fontSize: '1.5rem', fontWeight: 800, opacity: 0.3 }}>
                                {jogo.nome.substring(0, 3).toUpperCase()}
                            </span>
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="detail-info-section">
                        <h1 className="detail-title">{jogo.nome}</h1>

                        {/* Score */}
                        <div className="detail-score" style={{ background: getNotaColor(jogo.nota) }}>
                            <FaStar />
                            <span className="detail-score-value">{Number(jogo.nota).toFixed(1)}</span>
                            <span className="detail-score-max">/ 10</span>
                        </div>

                        {/* Meta Info */}
                        <div className="detail-meta">
                            <div className="detail-meta-item">
                                <FaDesktop className="detail-meta-icon" />
                                <div>
                                    <span className="detail-meta-label">Plataforma</span>
                                    <span className="detail-meta-value">{jogo.plataforma}</span>
                                </div>
                            </div>

                            <div className="detail-meta-item">
                                <FaGamepad className="detail-meta-icon" />
                                <div>
                                    <span className="detail-meta-label">Gênero</span>
                                    <span className="detail-meta-value">{jogo.genero}</span>
                                </div>
                            </div>

                            <div className="detail-meta-item">
                                <FaCalendarAlt className="detail-meta-icon" />
                                <div>
                                    <span className="detail-meta-label">Ano de Lançamento</span>
                                    <span className="detail-meta-value">{jogo.ano_lancamento}</span>
                                </div>
                            </div>

                            <div className="detail-meta-item">
                                <FaBuilding className="detail-meta-icon" />
                                <div>
                                    <span className="detail-meta-label">Desenvolvedora</span>
                                    <span className="detail-meta-value">{jogo.desenvolvedora}</span>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        {jogo.descricao && (
                            <div className="detail-description">
                                <h3 className="detail-section-title">Sobre o Jogo</h3>
                                <p>{jogo.descricao}</p>
                            </div>
                        )}

                        {/* Timestamps */}
                        <div className="detail-timestamps">
                            {jogo.created_at && (
                                <span className="detail-timestamp">
                                    <FaClock /> Adicionado em {formatDate(jogo.created_at)}
                                </span>
                            )}
                            {jogo.updated_at && jogo.updated_at !== jogo.created_at && (
                                <span className="detail-timestamp">
                                    <FaClock /> Atualizado em {formatDate(jogo.updated_at)}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GameDetail;
