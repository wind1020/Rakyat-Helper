import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { PROGRAMS } from '../data/programs';
import { getSavedIds } from '../storage';

export default function Saved() {
  const saved = PROGRAMS.filter((p) => getSavedIds().includes(p.id));

  return (
    <Layout title="Saved Programs" back>
      {saved.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: 80 }}>
          <div style={{ fontSize: 48, opacity: 0.4 }}>🔖</div>
          <h3>No saved programs yet</h3>
          <p style={{ color: '#444653', fontSize: 14 }}>
            Your bookmarked aid programs will appear here for easy access.
          </p>
          <Link to="/home">
            <button className="primary-btn">Explore Aid Programs</button>
          </Link>
        </div>
      ) : (
        saved.map((p) => (
          <div className="card" key={p.id}>
            <h4 style={{ margin: '0 0 4px' }}>{p.name}</h4>
            <p style={{ fontSize: 13, color: '#444653' }}>{p.description}</p>
            <p style={{ fontWeight: 700 }}>{p.amount}</p>
          </div>
        ))
      )}
    </Layout>
  );
}
