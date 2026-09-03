const { getPool } = require('./db');

module.exports = async (req, res) => {
  const pool = getPool();

  if (req.method === 'GET') {
    try {
      // BUG: req.query.status is accepted but never used in the WHERE clause,
      // so the "status" filter on the frontend does nothing.
      const result = await pool.query('SELECT * FROM properties ORDER BY id');
      return res.status(200).json(result.rows);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
