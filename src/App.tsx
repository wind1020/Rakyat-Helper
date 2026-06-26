import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import type { ReactNode } from 'react';
import Splash from './pages/Splash';
import Login from './pages/Login';
import Home from './pages/Home';
import Eligibility from './pages/Eligibility';
import Recommendations from './pages/Recommendations';
import Chat from './pages/Chat';
import Saved from './pages/Saved';
import { isLoggedIn } from './storage';

function RequireAuth({ children }: { children: ReactNode }) {
  return isLoggedIn() ? <>{children}</> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="/eligibility"
          element={
            <RequireAuth>
              <Eligibility />
            </RequireAuth>
          }
        />
        <Route
          path="/recommendations"
          element={
            <RequireAuth>
              <Recommendations />
            </RequireAuth>
          }
        />
        <Route
          path="/chat"
          element={
            <RequireAuth>
              <Chat />
            </RequireAuth>
          }
        />
        <Route
          path="/saved"
          element={
            <RequireAuth>
              <Saved />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
