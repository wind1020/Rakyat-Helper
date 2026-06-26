import { Link, Navigate, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { matchPrograms } from '../data/programs';
import { getProfile, getSavedIds, isLoggedIn, toggleSaved } from '../storage';
import { useState } from 'react';

export default function Recommendations() {
  const navigate = useNavigate();
  const profile = getProfile();
  const [savedIds, setSavedIds] = useState(getSavedIds());

  if (!profile) return <Navigate to="/eligibility" replace />;

  const matches = matchPrograms(profile);

  function handleSave(id: string) {
    if (!isLoggedIn()) {
      navigate('/login', { state: { from: '/recommendations' } });
      return;
    }
    setSavedIds(toggleSaved(id));
  }

  return (
    <Layout title="Recommended Aid" back>
      <div
        style={{
          background: 'linear-gradient(160deg, #00206e, #0032a0)',
          color: '#fff',
          borderRadius: 8,
          padding: 20,
          marginBottom: 16,
          textAlign: 'center',
        }}
      >
        <span
          style={{
            fontSize: 11,
            background: 'rgba(255,255,255,0.15)',
            padding: '4px 10px',
            borderRadius: 999,
          }}
        >
          ✓ Assessment Complete
        </span>
        <h2 style={{ margin: '12px 0 0' }}>
          {matches.length > 0
            ? `Congratulations! You qualify for ${matches.length} program${matches.length > 1 ? 's' : ''}.`
            : 'No matching programs found yet.'}
        </h2>
      </div>

      {matches.map((p) => (
        <div className="card" key={p.id}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: 600 }}>{p.category}</span>
            <button
              onClick={() => handleSave(p.id)}
              style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: 16 }}
              aria-label="Save program"
            >
              {savedIds.includes(p.id) ? '🔖' : '🏷️'}
            </button>
          </div>
          <h4 style={{ margin: '8px 0 4px' }}>{p.name}</h4>
          <p style={{ fontSize: 13, color: '#444653' }}>{p.description}</p>
          <p style={{ fontSize: 11, color: '#444653', textTransform: 'uppercase', margin: '8px 0 0' }}>
            Potential Amount
          </p>
          <p style={{ fontWeight: 700, fontSize: 18, margin: '0 0 12px' }}>{p.amount}</p>
          <button className="primary-btn">{p.cta}</button>
        </div>
      ))}

      <div className="card" style={{ background: '#f1ecf2', textAlign: 'center' }}>
        <h4 style={{ margin: '0 0 4px' }}>Need more help?</h4>
        <p style={{ fontSize: 13, color: '#444653', marginBottom: 12 }}>
          Our AI assistant can help you find specialized grants based on your unique situation.
        </p>
        <Link to="/chat">
          <button className="gold-btn">Talk to AI Assistant</button>
        </Link>
      </div>
    </Layout>
  );
}
