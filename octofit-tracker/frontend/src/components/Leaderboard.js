import React, { useEffect, useState } from 'react';
import { buildEndpoint } from '../api';

export default function Leaderboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const endpoint = buildEndpoint('leaderboard');
    console.log('Leaderboard endpoint:', endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        console.log('Leaderboard response:', data);
        const records = data && data.results ? data.results : Array.isArray(data) ? data : [];
        setItems(records);
      })
      .catch((err) => {
        console.error('Leaderboard fetch error:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="component-card card p-4">
      <h2 className="card-title">Leaderboard</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div className="loading">Loading leaderboard...</div>
      ) : items.length === 0 ? (
        <div className="empty">No leaderboard data found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it, idx) => (
                <tr key={it.id || it.pk || idx}>
                  <td><strong>{idx + 1}</strong></td>
                  <td>{it.username || it.name || '-'}</td>
                  <td>{it.score || it.points || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
