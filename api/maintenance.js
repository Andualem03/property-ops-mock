const { getPool } = require('./db');

module.exports = async (req, res) => {
  const pool = getPool();

  if (req.method === 'GET') {
    try {
      const result = await pool.query(
        'SELECT * FROM maintenance_requests ORDER BY created_at DESC'
      );
      return res.status(200).json(result.rows);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const { property_id, description } = req.body;
      const result = await pool.query(
        'INSERT INTO maintenance_requests (property_id, description) VALUES ($1, $2) RETURNING *',
        [property_id, description]
      );
      return res.status(201).json(result.rows[0]);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      await pool.query('DELETE FROM maintenance_requests WHERE id = $1', [id]);
      return res.status(204).end();
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // NOTE: There is intentionally no PATCH handler here. The frontend has a
  // "Mark in progress" button that calls one anyway. It doesn't exist yet.

  return res.status(405).json({ error: 'Method not allowed' });
};
