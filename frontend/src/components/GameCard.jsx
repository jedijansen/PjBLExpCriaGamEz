// ============================================
// Componente GameCard - Card de Jogo
// Desenvolvido por: Gustavo Jansen Butenas
// ============================================

import { Link } from 'react-router-dom';
import { FaStar, FaCalendarAlt, FaDesktop } from 'react-icons/fa';
import './GameCard.css';

function GameCard({ jogo }) {
    // Gera uma cor de fundo baseada no gênero do jogo
    const getGenreColor = (genero) => {
        const colors = {
            'Aventura': '#10b981',
            'RPG de Ação': '#8b5cf6',
            'Ação/Aventura': '#ef4444',
            'Metroidvania': '#06b6d4',
            'Roguelike': '#f59e0b',
            'Sandbox': '#22c55e',
        };
        return colors[genero] || '#7c3aed';
    };

    // Determina a cor da nota baseada no valor
    const getNotaColor = (nota) => {
        if (nota >= 9) return '#10b981';
        if (nota >= 7) return '#f59e0b';
        if (nota >= 5) return '#f97316';
        return '#ef4444';
    };

    return (
        <Link to={`/jogos/${jogo.id}`} className="game-card" id={`game-card-${jogo.id}`}>
            <div className="game-card-image-wrapper">
                {jogo.imagem_url ? (
                    <img
                        src={jogo.imagem_url}
                        alt={jogo.nome}
                        className="game-card-image"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                        }}
                    />
                ) : null}
                <div
                    className="game-card-image-placeholder"
                    style={{ display: jogo.imagem_url ? 'none' : 'flex' }}
                >
                    <FaDesktop className="placeholder-icon" />
                    <span>{jogo.nome.substring(0, 2).toUpperCase()}</span>
                </div>

                {/* Badge de nota */}
                <div
                    className="game-card-nota"
                    style={{ backgroundColor: getNotaColor(jogo.nota) }}
                >
                    <FaStar className="nota-star" />
                    <span>{Number(jogo.nota).toFixed(1)}</span>
                </div>
            </div>

            <div className="game-card-info">
                <h3 className="game-card-title">{jogo.nome}</h3>

                <div className="game-card-meta">
                    <span
                        className="game-card-genre"
                        style={{ borderColor: getGenreColor(jogo.genero), color: getGenreColor(jogo.genero) }}
                    >
                        {jogo.genero}
                    </span>
                    <span className="game-card-year">
                        <FaCalendarAlt />
                        {jogo.ano_lancamento}
                    </span>
                </div>

                <p className="game-card-platform">
                    <FaDesktop />
                    {jogo.plataforma}
                </p>
            </div>
        </Link>
    );
}

export default GameCard;
