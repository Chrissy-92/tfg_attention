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

// Login
import LoginPsychologist from "./components/Login/LoginPsychologist.jsx";
import LoginStudent from "./components/Login/LoginStudent.jsx";
import ActivateStudentProfile from "./components/Login/ActivateStudentProfile.jsx";

// Psychologist
import PsychologistDashboard from "./components/Psychologist/PsychologistDashboard.jsx";
import StudentFormAdd from "./components/Psychologist/StudentFormAdd.jsx";

// Student
import StudentDashboard from "./components/Student/StudentDashboard.jsx";

// Global
import Header from "./components/Header.jsx";

// Auth
import { AuthProvider, useAuth } from "./hooks/useAuth.jsx";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Header title="TFG Atención Infantil" />
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
            path="/students/new"
            element={
              <PrivateRoute>
                <StudentFormAdd />
              </PrivateRoute>
            }
          />
          <Route
            path="/psychologist-dashboard"
            element={
              <PrivateRoute>
                <PsychologistDashboard />
              </PrivateRoute>
            }
          />

          {/* Student */}
          <Route
            path="/student-dashboard"
            element={
              <PrivateRoute>
                <StudentDashboard />
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
