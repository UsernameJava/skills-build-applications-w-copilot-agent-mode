import React, { useEffect, useState } from 'react';
import { buildEndpoint } from '../api';

export default function Workouts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const endpoint = buildEndpoint('workouts');
    console.log('Workouts endpoint:', endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        console.log('Workouts response:', data);
        const records = data && data.results ? data.results : Array.isArray(data) ? data : [];
        setItems(records);
      })
      .catch((err) => {
        console.error('Workouts fetch error:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="component-card card p-4">
      <h2 className="card-title">Workouts</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div className="loading">Loading workouts...</div>
      ) : items.length === 0 ? (
        <div className="empty">No workouts found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it, idx) => (
                <tr key={it.id || it.pk || idx}>
                  <td>{it.id || it.pk || idx}</td>
                  <td><strong>{it.title || '-'}</strong></td>
                  <td>{it.description || '-'}</td>
                  <td>{it.duration || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
