import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Pages principales
import Inicio from "./pages/Inicio.jsx";
import RegisterPsychologistPage from "./pages/RegisterPsychologistPage.jsx";
import StroopTestPage from "./pages/StroopTestPage.jsx";
import CancellationPage from "./pages/CancellationPage.jsx";
import QuickReactionPage from "./pages/QuickReactionPage.jsx";
import WorkingMemoryPage from "./pages/WorkingMemoryPage.jsx";
import StudentsPage from "./pages/StudentsPage.jsx";
import IntegrationPage from "./pages/IntegrationPage.jsx";

// Componentes de Login
import LoginPsychologist from "./components/Login/LoginPsychologist.jsx";
import LoginStudent from "./components/Login/LoginStudent.jsx";
import ActivateStudentProfile from "./components/Login/ActivateStudentProfile.jsx";

// Panel psicólogo
import DashboardPsychologist from "./pages/DashboardPsychologist.jsx";
import StudentFormAdd from "./components/Psychologist/StudentFormAdd.jsx";

// Panel estudiante
import DashboardStudent from "./components/Student/DashboardStudent.jsx";

// Autenticación
import { AuthProvider, useAuth } from "./hooks/useAuth.jsx";
import api from "./services/api.js";

// Ruta privada que requiere sesión activa
function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  // Función para crear un nuevo estudiante desde el formulario
  const handleCrearEstudiante = async (form) => {
    try {
      await api.post("/ninos", form);
    } catch (err) {
      // Manejo silencioso de error si falla la creación
    }
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Inicio y autenticación */}
          <Route path="/" element={<Inicio />} />
          <Route path="/login-psychologist" element={<LoginPsychologist />} />
          <Route path="/login-student" element={<LoginStudent />} />
          <Route path="/register" element={<RegisterPsychologistPage />} />
          <Route
            path="/activate-profile/:id_student"
            element={<ActivateStudentProfile />}
          />

          {/* Psicólogo */}
          <Route
            path="/students"
            element={
              <PrivateRoute>
                <StudentsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/students-new"
            element={
              <PrivateRoute>
                <StudentFormAdd onSubmit={handleCrearEstudiante} />
              </PrivateRoute>
            }
          />
          <Route
            path="/integration/:id_student"
            element={
              <PrivateRoute>
                <IntegrationPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/psychologist-dashboard"
            element={
              <PrivateRoute>
                <DashboardPsychologist />
              </PrivateRoute>
            }
          />

          {/* Alumno */}
          <Route
            path="/student-dashboard"
            element={
              <PrivateRoute>
                <DashboardStudent />
              </PrivateRoute>
            }
          />

          {/* Pruebas */}
          <Route path="/stroop-test/:id_nino" element={<StroopTestPage />} />
          <Route path="/cancellation" element={<CancellationPage />} />
          <Route path="/quick-reaction" element={<QuickReactionPage />} />
          <Route path="/working-memory" element={<WorkingMemoryPage />} />

          {/* Ruta por defecto */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
