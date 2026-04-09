// ============================================
// Componente Footer
// Desenvolvido por: Gustavo Jansen Butenas
// ============================================

import { FaGamepad, FaGithub, FaHeart } from 'react-icons/fa';
import './Footer.css';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-brand">
                    <FaGamepad className="footer-icon" />
                    <span className="footer-text">
                        GamEz &copy; {currentYear}
                    </span>
                </div>

                <div className="footer-author">
                    <span><strong>Gustavo Jansen Butenas</strong></span>
                </div>

                <div className="footer-tech">
                    <span className="footer-badge">React</span>
                    <span className="footer-badge">Node.js</span>
                    <span className="footer-badge">MySQL</span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
