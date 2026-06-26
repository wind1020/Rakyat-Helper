import { useNavigate } from 'react-router-dom';

export default function Splash() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #00206e, #0032a0)',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 24,
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 16,
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 30,
          marginBottom: 16,
        }}
      >
        🏛️
      </div>
      <h1 style={{ fontSize: 28, marginBottom: 12 }}>Rakyat Helper</h1>
      <p style={{ opacity: 0.9, marginBottom: 32, maxWidth: 280 }}>
        Your guide to government aid, simplified.
      </p>
      <button
        className="primary-btn"
        style={{ background: '#fff', color: '#00206e', maxWidth: 280, marginBottom: 16 }}
        onClick={() => navigate('/home')}
      >
        Get Started →
      </button>
      <select
        defaultValue="English"
        style={{
          background: 'rgba(255,255,255,0.12)',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.4)',
          borderRadius: 999,
          padding: '6px 14px',
          fontSize: 13,
        }}
      >
        <option style={{ color: '#000' }}>English</option>
        <option style={{ color: '#000' }}>Bahasa Melayu</option>
      </select>
    </div>
  );
}
