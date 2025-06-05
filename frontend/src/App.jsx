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
import Dashboard from "./pages/DashboardPsychologist.jsx";
import NinosPage from "./pages/StudentsPage.jsx";
import NinoFormAdd from "./components/NinoFormAdd.jsx";
import DashboardAlumno from "./components/Student/DashboardStudent.jsx";
import StroopTestPage from "./pages/StroopTestPage";
import CancelacionPage from "./pages/CancelacionPage";
import ReaccionRapidaPage from "./pages/QuickReactionPage.jsx";
import MemoriaTrabajoPage from "./pages/WorkingMemoryPage.jsx";
import ActivarPerfilAlumno from "./components/ActivarPerfilAlumno.jsx";
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
          <Route
            path="/activar-perfil/:id_nino"
            element={<ActivarPerfilAlumno />}
          />
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
                <NinoFormAdd />
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
