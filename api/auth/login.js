const { getPool } = require('../db');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, password } = req.body;
  const pool = getPool();

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    // BUG: this compares the raw password against the stored hash directly,
    // so login always fails even with correct credentials. Find out why,
    // and fix it properly (hint: bcryptjs is already a dependency).
    if (password === user.password_hash) {
      return res.status(200).json({ ok: true, role: user.role });
    }
    return res.status(401).json({ error: 'Invalid credentials' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
