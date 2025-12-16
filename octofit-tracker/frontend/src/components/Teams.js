import React, { useEffect, useState } from 'react';
import { buildEndpoint } from '../api';

export default function Teams() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const endpoint = buildEndpoint('teams');
    console.log('Teams endpoint:', endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        console.log('Teams response:', data);
        const records = data && data.results ? data.results : Array.isArray(data) ? data : [];
        setItems(records);
      })
      .catch((err) => {
        console.error('Teams fetch error:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="component-card card p-4">
      <h2 className="card-title">Teams</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div className="loading">Loading teams...</div>
      ) : items.length === 0 ? (
        <div className="empty">No teams found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Team Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it, idx) => (
                <tr key={it.id || it.pk || idx}>
                  <td>{it.id || it.pk || idx}</td>
                  <td><strong>{it.name || '-'}</strong></td>
                  <td>{it.description || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
