const { getPool } = require('./db');

module.exports = async (req, res) => {
  const pool = getPool();

  if (req.method === 'GET') {
    try {
      // BUG: when a property_id filter is passed, this references a variable
      // that was never defined instead of req.query.property_id, so any
      // filtered request crashes with a 500 instead of returning results.
      // Unfiltered requests also return every row with no pagination.
      if (req.query.property_id) {
        const result = await pool.query(
          'SELECT * FROM tenants WHERE property_id = $1 ORDER BY id',
          [propertyId] // eslint-disable-line no-undef
        );
        return res.status(200).json(result.rows);
      }
      const result = await pool.query('SELECT * FROM tenants ORDER BY id');
      return res.status(200).json(result.rows);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
