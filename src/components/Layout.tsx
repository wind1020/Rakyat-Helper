import { NavLink, useNavigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { isLoggedIn } from '../storage';

export default function Layout({
  title,
  back,
  children,
}: {
  title: string;
  back?: boolean;
  children: ReactNode;
}) {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();
  return (
    <div className="app-shell">
      <div className="topbar">
        {back ? (
          <button className="icon-btn" onClick={() => navigate(-1)} aria-label="Back">
            ←
          </button>
        ) : (
          <span className="icon-btn" aria-hidden>
            ☰
          </span>
        )}
        <span style={{ flex: 1 }}>{title}</span>
        <button
          className="icon-btn"
          onClick={() => navigate(loggedIn ? '/saved' : '/login')}
          aria-label="Profile"
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            padding: 0,
          }}
        >
          {loggedIn ? '👤' : '🔑'}
        </button>
      </div>
      <div className="screen-content">{children}</div>
      <nav className="bottom-nav">
        <NavLink to="/home" className={({ isActive }) => (isActive ? 'active' : '')}>
          <span className="nav-icon">🏠</span>Home
        </NavLink>
        <NavLink to="/eligibility" className={({ isActive }) => (isActive ? 'active' : '')}>
          <span className="nav-icon">📋</span>Eligibility
        </NavLink>
        <NavLink to="/saved" className={({ isActive }) => (isActive ? 'active' : '')}>
          <span className="nav-icon">🔖</span>Saved
        </NavLink>
        <NavLink to="/chat" className={({ isActive }) => (isActive ? 'active' : '')}>
          <span className="nav-icon">🤖</span>AI
        </NavLink>
      </nav>
    </div>
  );
}
