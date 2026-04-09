// ============================================
// Configuração de conexão com MySQL
// Desenvolvido por: Gustavo Jansen Butenas
// ============================================

const mysql = require('mysql2/promise');

// Pool de conexões com o MySQL
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'game_collection',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Testar conexão ao iniciar
pool.getConnection()
    .then(connection => {
        console.log('✅ Conectado ao MySQL com sucesso!');
        connection.release();
    })
    .catch(err => {
        console.error('❌ Erro ao conectar ao MySQL:', err.message);
        console.error('Verifique se o MySQL está rodando e as credenciais estão corretas.');
    });

module.exports = pool;
