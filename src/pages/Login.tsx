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
          <label>PASSWORD</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="error-text">{error}</p>}
        <button type="submit" className="primary-btn">
          Log In
        </button>
      </form>
      <p style={{ textAlign: 'center', fontSize: 13, color: '#444653' }}>
        Don't have an account? <strong>Sign up</strong>
      </p>
    </div>
  );
}
