// --- Login ---
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  document.getElementById('login-status').textContent = res.ok
    ? `Logged in as ${data.role}`
    : `Login failed: ${data.error}`;
});

// --- Properties ---
async function loadProperties() {
  const status = document.getElementById('status-filter').value;
  const res = await fetch(`/api/properties?status=${status}`);
  const properties = await res.json();
  const list = document.getElementById('properties-list');
  list.innerHTML = properties
    .map((p) => `<div class="property-card">${p.name} — ${p.address} (${p.status})</div>`)
    .join('');
}
document.getElementById('status-filter').addEventListener('change', loadProperties);
loadProperties();

// --- Tenants ---
async function loadTenants() {
  const res = await fetch('/api/tenants');
  const tenants = await res.json();

  // BUG: default Array.sort() compares as strings, so rent sorts like text
  // (e.g. 89000, 98000, 125000, 210000 in the wrong order).
  tenants.sort((a, b) => (a.rent_cents > b.rent_cents ? 1 : -1));

  const body = document.getElementById('tenants-body');
  body.innerHTML = tenants
    .map(
      (t) =>
        // BUG: rent_cents is displayed raw instead of formatted as currency.
        `<tr><td>${t.name}</td><td>Property ${t.property_id}</td><td>${t.rent_cents}</td></tr>`
    )
    .join('');
}
loadTenants();

// --- Maintenance ---
async function loadMaintenance() {
  const res = await fetch('/api/maintenance');
  const requests = await res.json();

  // BUG: this looks for #maintenance-items but the element in index.html
  // is #maintenance-list, so this silently fails to find anything and the
  // "Loading..." text above never updates.
  const list = document.getElementById('maintenance-list');
  list.innerHTML = requests
    .map(
      (r) => `
      <li>
        ${r.description} — ${r.status}
        <button onclick="markInProgress(${r.id})">Mark in progress</button>
        <button onclick="deleteRequest(${r.id})">Delete</button>
      </li>`
    )
    .join('');
}
loadMaintenance();

async function markInProgress(id) {
  // BUG: there is no PATCH handler on the server for this yet — it 404s.
  await fetch(`/api/maintenance?id=${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: 'in_progress' }),
  });
  loadMaintenance();
}

async function deleteRequest(id) {
  // BUG: no confirmation before deleting.
  await fetch(`/api/maintenance?id=${id}`, { method: 'DELETE' });
  loadMaintenance();
}
