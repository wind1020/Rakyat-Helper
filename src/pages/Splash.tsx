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
      <h1 style={{ fontSize: 28, marginBottom: 12 }}>Rakyat Helper</h1>
      <p style={{ opacity: 0.9, marginBottom: 40 }}>
        Your guide to government aid, simplified.
      </p>
      <button
        className="primary-btn"
        style={{ background: '#ffc72c', color: '#6f5400', maxWidth: 280 }}
        onClick={() => navigate('/home')}
      >
        Get Started
      </button>
    </div>
  );
}
