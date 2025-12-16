import React, { useEffect, useState } from 'react';
import { buildEndpoint } from '../api';

export default function Users() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const endpoint = buildEndpoint('users');
    console.log('Users endpoint:', endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        console.log('Users response:', data);
        const records = data && data.results ? data.results : Array.isArray(data) ? data : [];
        setItems(records);
      })
      .catch((err) => {
        console.error('Users fetch error:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="component-card card p-4">
      <h2 className="card-title">Users</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div className="loading">Loading users...</div>
      ) : items.length === 0 ? (
        <div className="empty">No users found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it, idx) => (
                <tr key={it.id || it.pk || idx}>
                  <td>{it.id || it.pk || idx}</td>
                  <td><strong>{it.username || '-'}</strong></td>
                  <td>{it.email || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
