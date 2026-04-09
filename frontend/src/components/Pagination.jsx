// ============================================
// Componente Pagination
// Desenvolvido por: Gustavo Jansen Butenas
// ============================================

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Pagination.css';

function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    // Gera os números das páginas a serem exibidos
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Sempre mostra primeira página
            pages.push(1);

            let start = Math.max(2, currentPage - 1);
            let end = Math.min(totalPages - 1, currentPage + 1);

            if (currentPage <= 3) {
                end = Math.min(4, totalPages - 1);
            }
            if (currentPage >= totalPages - 2) {
                start = Math.max(2, totalPages - 3);
            }

            if (start > 2) pages.push('...');

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (end < totalPages - 1) pages.push('...');

            // Sempre mostra última página
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className="pagination" id="pagination">
            <button
                className="pagination-btn pagination-arrow"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Página anterior"
            >
                <FaChevronLeft />
            </button>

            {getPageNumbers().map((page, index) => (
                page === '...' ? (
                    <span key={`dots-${index}`} className="pagination-dots">...</span>
                ) : (
                    <button
                        key={page}
                        className={`pagination-btn pagination-number ${page === currentPage ? 'active' : ''}`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                )
            ))}

            <button
                className="pagination-btn pagination-arrow"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Próxima página"
            >
                <FaChevronRight />
            </button>
        </div>
    );
}

export default Pagination;
