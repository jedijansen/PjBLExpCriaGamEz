// ============================================
// Componente Modal de Confirmação
// Desenvolvido por: Gustavo Jansen Butenas
// ============================================

import { FaExclamationTriangle } from 'react-icons/fa';
import './Modal.css';

function Modal({ isOpen, title, message, onConfirm, onCancel, confirmText = 'Confirmar', cancelText = 'Cancelar', type = 'danger' }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <div className={`modal-icon-wrapper ${type}`}>
                    <FaExclamationTriangle className="modal-icon" />
                </div>

                <h3 className="modal-title">{title}</h3>
                <p className="modal-message">{message}</p>

                <div className="modal-actions">
                    <button
                        className="btn btn-secondary"
                        onClick={onCancel}
                        id="modal-cancel-btn"
                    >
                        {cancelText}
                    </button>
                    <button
                        className={`btn ${type === 'danger' ? 'btn-danger' : 'btn-primary'}`}
                        onClick={onConfirm}
                        id="modal-confirm-btn"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Modal;
