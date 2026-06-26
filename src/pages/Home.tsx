import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { PROGRAMS } from '../data/programs';
import { getProfile } from '../storage';

const CATEGORIES = ['All', 'Housing', 'Education', 'Health', 'Cash Assistance'];

export default function Home() {
  const profile = getProfile();
  const [filter, setFilter] = useState('All');

  const programs = useMemo(
    () => (filter === 'All' ? PROGRAMS : PROGRAMS.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <Layout title="Rakyat Helper">
      <h2 style={{ marginBottom: 0 }}>Hello, {profile?.name || 'Citizen'} 👋</h2>
      <p style={{ color: '#444653', marginTop: 4 }}>
        {profile
          ? 'Here is what you may qualify for based on your profile.'
          : 'Complete your eligibility profile to see personalized aid.'}
      </p>

      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', margin: '16px 0' }}>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            style={{
              border: 'none',
              borderRadius: 999,
              padding: '8px 14px',
              fontSize: 13,
              fontWeight: 600,
              whiteSpace: 'nowrap',
              background: filter === c ? '#00206e' : '#f1ecf2',
              color: filter === c ? '#fff' : '#1c1b1f',
              cursor: 'pointer',
            }}
          >
            {c}
          </button>
        ))}
      </div>

      <h3>Recommended Aid</h3>
      {programs.map((p) => (
        <div className="card" key={p.id} style={{ borderLeft: '4px solid #00206e' }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: '#6f5400',
              background: '#fff4d6',
              padding: '2px 8px',
              borderRadius: 999,
            }}
          >
            {p.category.toUpperCase()}
          </span>
          <h4 style={{ margin: '8px 0 4px' }}>{p.name}</h4>
          <p style={{ fontSize: 13, color: '#444653', margin: '0 0 8px' }}>{p.description}</p>
          <p style={{ fontWeight: 700, margin: '0 0 12px' }}>{p.amount}</p>
          <button className="primary-btn">{p.cta}</button>
        </div>
      ))}

      <div
        style={{
          background: '#1c1b1f',
          color: '#fff',
          borderRadius: 8,
          padding: 16,
          marginTop: 8,
        }}
      >
        <h4 style={{ margin: '0 0 4px' }}>Still unsure?</h4>
        <p style={{ fontSize: 13, opacity: 0.85, margin: '0 0 12px' }}>
          Take our 2-minute eligibility quiz to discover more aid specific to your profile.
        </p>
        <Link to="/eligibility">
          <button className="gold-btn">Start Assessment</button>
        </Link>
      </div>
    </Layout>
  );
}
