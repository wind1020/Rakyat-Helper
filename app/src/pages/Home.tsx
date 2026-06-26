import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { PROGRAMS } from '../data/programs';
import { getProfile } from '../storage';

const CATEGORIES = ['All', 'Housing', 'Education', 'Health', 'Cash Assistance'];

const CATEGORY_META: Record<string, { bg: string; color: string; icon: string }> = {
  Health: { bg: '#ffdad6', color: '#93000a', icon: '🤍' },
  Education: { bg: '#dce1ff', color: '#143ca9', icon: '🎓' },
  Housing: { bg: '#ffdf99', color: '#5a4300', icon: '🏠' },
  'Cash Assistance': { bg: '#e5e1e7', color: '#444653', icon: '💰' },
};

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

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h3 style={{ margin: '0 0 8px' }}>Recommended Aid</h3>
        <Link to="/eligibility" style={{ fontSize: 13, fontWeight: 600, color: '#00206e' }}>
          See All
        </Link>
      </div>
      {programs.map((p) => {
        const meta = CATEGORY_META[p.category];
        return (
          <div className="card" key={p.id} style={{ borderLeft: '4px solid #00206e' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: meta.color,
                  background: meta.bg,
                  padding: '2px 8px',
                  borderRadius: 999,
                }}
              >
                {p.category.toUpperCase()}
              </span>
              <span
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: meta.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                }}
              >
                {meta.icon}
              </span>
            </div>
            <h4 style={{ margin: '8px 0 4px' }}>{p.name}</h4>
            <p style={{ fontSize: 13, color: '#444653', margin: '0 0 8px' }}>{p.description}</p>
            <p style={{ fontWeight: 700, margin: '0 0 12px' }}>{p.amount}</p>
            <button className="primary-btn">{p.cta}</button>
          </div>
        );
      })}

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
