import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Pages
import Inicio from "./pages/Inicio.jsx";
import RegisterPsychologistPage from "./pages/RegisterPsychologistPage.jsx";
import StroopTestPage from "./pages/StroopTestPage.jsx";
import CancellationPage from "./pages/CancellationPage.jsx";
import QuickReactionPage from "./pages/QuickReactionPage.jsx";
import WorkingMemoryPage from "./pages/WorkingMemoryPage.jsx";
import StudentsPage from "./pages/StudentsPage.jsx";
import IntegrationPage from "./pages/IntegrationPage.jsx";

// Login
import LoginPsychologist from "./components/Login/LoginPsychologist.jsx";
import LoginStudent from "./components/Login/LoginStudent.jsx";
import ActivateStudentProfile from "./components/Login/ActivateStudentProfile.jsx";

// Psychologist
import DashboardPsychologist from "./pages/DashboardPsychologist.jsx";
import StudentFormAdd from "./components/Psychologist/StudentFormAdd.jsx";

// Student
import DashboardStudent from "./components/Student/DashboardStudent.jsx";

// Auth
import { AuthProvider, useAuth } from "./hooks/useAuth.jsx";
import api from "./services/api.js";

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  console.log("PrivateRoute → user:", user);
  if (loading) return null;

  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const handleCrearEstudiante = async (form) => {
    try {
      const res = await api.post("/ninos", form);
      console.log("✅ Niño creado:", res.data);
    } catch (err) {
      console.error("❌ Error al crear estudiante:", err);
    }
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/login-psychologist" element={<LoginPsychologist />} />
          <Route path="/login-student" element={<LoginStudent />} />
          <Route path="/register" element={<RegisterPsychologistPage />} />
          <Route
            path="/activate-profile/:id_student"
            element={<ActivateStudentProfile />}
          />

          {/* Psychologist */}
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

          {/* Student */}
          <Route
            path="/student-dashboard"
            element={
              <PrivateRoute>
                <DashboardStudent />
              </PrivateRoute>
            }
          />

          {/* Tests */}
          <Route path="/stroop-test" element={<StroopTestPage />} />
          <Route path="/cancellation" element={<CancellationPage />} />
          <Route path="/quick-reaction" element={<QuickReactionPage />} />
          <Route path="/working-memory" element={<WorkingMemoryPage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
