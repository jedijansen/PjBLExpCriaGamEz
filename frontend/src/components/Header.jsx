// ============================================
// Componente Header
// Desenvolvido por: Gustavo Jansen Butenas
// ============================================

import { Link, useLocation } from 'react-router-dom';
import { FaGamepad, FaPlus, FaHome } from 'react-icons/fa';
import './Header.css';

function Header() {
    const location = useLocation();

    return (
        <header className="header">
            <div className="container header-content">
                <Link to="/" className="header-logo">
                    <img src="/logo.png" alt="GamEz" className="header-logo-img" />
                    <div className="header-logo-text">
                        <span className="header-title">GamEz</span>
                        <span className="header-subtitle">por Gustavo Jansen Butenas</span>
                    </div>
                </Link>

                <nav className="header-nav">
                    <Link
                        to="/"
                        className={`header-nav-link ${location.pathname === '/' ? 'active' : ''}`}
                    >
                        <FaHome />
                        <span>Início</span>
                    </Link>
                    <Link
                        to="/jogos/novo"
                        className="header-nav-link btn-add"
                    >
                        <FaPlus />
                        <span>Novo Jogo</span>
                    </Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;
