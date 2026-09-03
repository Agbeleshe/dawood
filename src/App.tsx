import type { ReactNode } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { DesktopGate } from './components/DesktopGate';
import { Shell } from './components/Shell';
import { Audit } from './pages/Audit';
import { Dashboard } from './pages/Dashboard';
import { Incidents } from './pages/Incidents';
import { LiveCity } from './pages/LiveCity';
import { Login } from './pages/Login';
import { Lookup } from './pages/Lookup';
import { Riders } from './pages/Riders';
import { useCommand } from './store';

function Guard({ children }: { children: ReactNode }) {
  const agent = useCommand((s) => s.agent);
  if (!agent) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  const agent = useCommand((s) => s.agent);
  return (
    <DesktopGate>
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={agent ? <Navigate to="/" replace /> : <Login />} />
        <Route
          path="/"
          element={
            <Guard>
              <Shell />
            </Guard>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="city" element={<LiveCity />} />
          <Route path="riders" element={<Riders />} />
          <Route path="incidents" element={<Incidents />} />
          <Route path="lookup" element={<Lookup />} />
          <Route path="audit" element={<Audit />} />
        </Route>
        <Route path="*" element={<Navigate to={agent ? '/' : '/login'} replace />} />
      </Routes>
      </BrowserRouter>
    </DesktopGate>
  );
}
