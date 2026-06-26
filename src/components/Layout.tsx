import { NavLink, useNavigate } from 'react-router-dom';
import type { ReactNode } from 'react';

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
  return (
    <div className="app-shell">
      <div className="topbar">
        {back && (
          <button className="icon-btn" onClick={() => navigate(-1)} aria-label="Back">
            ←
          </button>
        )}
        <span>{title}</span>
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
