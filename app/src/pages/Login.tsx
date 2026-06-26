import { useState } from 'react';
import type { FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { setLoggedIn } from '../storage';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from || '/home';
  const [mykad, setMykad] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!/^\d{6}-\d{2}-\d{4}$/.test(mykad)) {
      setError('Enter a valid MyKad number, e.g. 900101-14-5566');
      return;
    }
    if (password.length < 4) {
      setError('Password is too short');
      return;
    }
    setError('');
    setLoggedIn();
    navigate(from, { replace: true });
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fdf8fd' }}>
      <div
        style={{
          background: 'linear-gradient(160deg, #00206e, #0032a0)',
          color: '#fff',
          padding: '40px 24px 80px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            margin: '0 auto 12px',
            borderRadius: 12,
            background: 'rgba(255,255,255,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 26,
          }}
        >
          🏛️
        </div>
        <h1 style={{ fontSize: 26, margin: '12px 0 8px' }}>Rakyat Helper</h1>
        <p style={{ opacity: 0.9, fontSize: 14 }}>
          Official gateway for Malaysian civic aid and social security services.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="card" style={{ margin: '-56px 16px 16px' }}>
        <div className="field">
          <label>MYKAD NUMBER</label>
          <input
            placeholder="e.g. 900101-14-5566"
            value={mykad}
            onChange={(e) => setMykad(e.target.value)}
          />
        </div>
        <div className="field">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <label style={{ marginBottom: 0 }}>PASSWORD</label>
            <a style={{ fontSize: 13, color: '#00206e', fontWeight: 600 }} href="#">
              Forgot Password?
            </a>
          </div>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginTop: 6 }}
          />
        </div>
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 14,
            marginBottom: 16,
            cursor: 'pointer',
          }}
        >
          <input type="checkbox" />
          Remember this device
        </label>
        {error && <p className="error-text">{error}</p>}
        <button type="submit" className="primary-btn">
          Log In →
        </button>
      </form>
      <p style={{ textAlign: 'center', fontSize: 13, color: '#444653', marginBottom: 4 }}>
        Don't have an account? <strong>Sign up</strong>
      </p>
      <p style={{ textAlign: 'center', fontSize: 12, color: '#747684' }}>
        Privacy Policy &nbsp;•&nbsp; Terms of Service
      </p>
      <p style={{ textAlign: 'center', fontSize: 11, color: '#747684', paddingBottom: 16 }}>
        © 2024 Malaysian Digital Service Bureau. Secure Site.
      </p>
    </div>
  );
}
