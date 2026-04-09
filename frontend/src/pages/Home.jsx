// ============================================
// Página Home - Listagem de Jogos
// Desenvolvido por: Gustavo Jansen Butenas
// ============================================

import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaSearch, FaTimes, FaGamepad } from 'react-icons/fa';
import GameCard from '../components/GameCard';
import Pagination from '../components/Pagination';
import { getJogos } from '../services/api';
import './Home.css';

function Home() {
    const [jogos, setJogos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const ITEMS_PER_PAGE = 6;

    // Buscar jogos da API
    const fetchJogos = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getJogos(currentPage, ITEMS_PER_PAGE, searchTerm);
            setJogos(data.data);
            setTotalPages(data.pagination.totalPages);
            setTotal(data.pagination.total);
        } catch (err) {
            console.error('Erro ao buscar jogos:', err);
            if (err.code === 'ERR_NETWORK') {
                setError('Não foi possível conectar ao servidor. Verifique se o backend está rodando.');
            } else {
                setError('Erro ao carregar os jogos. Tente novamente.');
            }
        } finally {
            setLoading(false);
        }
    }, [currentPage, searchTerm]);

    useEffect(() => {
        fetchJogos();
    }, [fetchJogos]);

    // Handler de busca
    const handleSearch = (e) => {
        e.preventDefault();
        setSearchTerm(searchInput);
        setCurrentPage(1);
    };

    // Limpar busca
    const clearSearch = () => {
        setSearchInput('');
        setSearchTerm('');
        setCurrentPage(1);
    };

    // Mudar página
    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="home page-enter">
            <div className="container">
                {/* Hero Section */}
                <div className="home-hero">
                    <div className="home-hero-content">
                        <h1 className="home-title">
                            <img src="/logo.png" alt="GamEz" className="home-title-logo" />
                            Biblioteca de Review de Jogos
                        </h1>
                        <p className="home-description">
                            Gerencie, avalie e organize seus games favoritos no GamEz
                        </p>
                    </div>
                    <Link to="/jogos/novo" className="btn btn-primary" id="btn-add-game">
                        <FaPlus />
                        Adicionar Jogo
                    </Link>
                </div>

                {/* Search Bar */}
                <form className="search-bar" onSubmit={handleSearch} id="search-form">
                    <div className="search-input-wrapper">
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Buscar por nome, plataforma, gênero ou desenvolvedora..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            id="search-input"
                        />
                        {searchInput && (
                            <button
                                type="button"
                                className="search-clear"
                                onClick={clearSearch}
                                aria-label="Limpar busca"
                            >
                                <FaTimes />
                            </button>
                        )}
                    </div>
                    <button type="submit" className="btn btn-primary btn-search" id="btn-search">
                        Buscar
                    </button>
                </form>

                {/* Search Results Info */}
                {searchTerm && (
                    <div className="search-info">
                        <span>
                            {total} resultado{total !== 1 ? 's' : ''} para "<strong>{searchTerm}</strong>"
                        </span>
                        <button className="search-clear-link" onClick={clearSearch}>
                            Limpar busca
                        </button>
                    </div>
                )}

                {/* Content */}
                {loading ? (
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <span className="loading-text">Carregando jogos...</span>
                    </div>
                ) : error ? (
                    <div className="error-container">
                        <div className="error-icon">⚠️</div>
                        <h3 className="error-title">Ops! Algo deu errado</h3>
                        <p className="error-text">{error}</p>
                        <button className="btn btn-primary" onClick={fetchJogos}>
                            Tentar Novamente
                        </button>
                    </div>
                ) : jogos.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-state-icon">🎮</div>
                        <h3 className="empty-state-title">
                            {searchTerm ? 'Nenhum jogo encontrado' : 'Nenhum jogo na coleção'}
                        </h3>
                        <p className="empty-state-text">
                            {searchTerm
                                ? 'Tente buscar com outros termos.'
                                : 'Comece adicionando seu primeiro jogo!'}
                        </p>
                        {!searchTerm && (
                            <Link to="/jogos/novo" className="btn btn-primary">
                                <FaPlus /> Adicionar Primeiro Jogo
                            </Link>
                        )}
                    </div>
                ) : (
                    <>
                        {/* Games Grid */}
                        <div className="games-grid" id="games-grid">
                            {jogos.map((jogo) => (
                                <GameCard key={jogo.id} jogo={jogo} />
                            ))}
                        </div>

                        {/* Pagination */}
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />

                        {/* Total Info */}
                        <p className="total-info">
                            Mostrando {jogos.length} de {total} jogo{total !== 1 ? 's' : ''}
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}

export default Home;
