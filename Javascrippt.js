const mysql = require('mysql2/promise');

// VULNERABLE (Avoid this) [cite: 27]
// const query = `SELECT * FROM users WHERE id = ${req.query.id}`;

// SECURE: Using Prepared Statements [cite: 28, 34]
async function getUser(userId) {
  const connection = await mysql.createConnection({/* config */});
  const [rows] = await connection.execute(
    'SELECT * FROM users WHERE id = ?', 
    [userId]
  );
  return rows;
}