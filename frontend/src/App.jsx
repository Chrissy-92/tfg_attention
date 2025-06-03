import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Inicio from "./pages/Inicio.jsx";
import RegistroPage from "./pages/RegistroPage.jsx";
import LoginPsicologo from "./components/LoginPsicologo.jsx";
import LoginAlumno from "./components/LoginAlumno.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import NinosPage from "./pages/NinosPage.jsx";
import NinoForm from "./components/NinoForm.jsx";
import DashboardAlumno from "./components/DashboardAlumno.jsx";
import StroopTestPage from "./pages/StroopTestPage";
import CancelacionPage from "./pages/CancelacionPage";
import ReaccionRapidaPage from "./pages/ReaccionRapidaPage";
import MemoriaTrabajoPage from "./pages/MemoriaTrabajoPage";
import { AuthProvider, useAuth } from "./hooks/useAuth.jsx";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/login-psicologo" element={<LoginPsicologo />} />
          <Route path="/login-alumno" element={<LoginAlumno />} />
          <Route path="/registro" element={<RegistroPage />} />
          <Route
            path="/ninos"
            element={
              <PrivateRoute>
                <NinosPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/ninos/nuevo"
            element={
              <PrivateRoute>
                <NinoForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard-alumno"
            element={<DashboardAlumno idNino={1} />}
          />
          <Route path="/stroop-test" element={<StroopTestPage />} />
          <Route path="/cancelacion" element={<CancelacionPage />} />
          <Route path="/reaccion" element={<ReaccionRapidaPage />} />
          <Route path="/memoria" element={<MemoriaTrabajoPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
