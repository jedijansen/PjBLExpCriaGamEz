// ============================================
// App Principal - Coleção de Jogos
// Desenvolvido por: Gustavo Jansen Butenas
// ============================================

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import GameForm from './pages/GameForm';
import GameDetail from './pages/GameDetail';
import './App.css';

function App() {
    return (
        <Router>
            <div className="app">
                <Header />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/jogos/novo" element={<GameForm />} />
                        <Route path="/jogos/editar/:id" element={<GameForm />} />
                        <Route path="/jogos/:id" element={<GameDetail />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
