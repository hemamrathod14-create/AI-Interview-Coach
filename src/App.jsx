import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardOverview from "./pages/DashboardOverview";
import InterviewSetup from "./pages/InterviewSetup";
import LiveInterview from "./pages/LiveInterview";
import InterviewResults from "./pages/InterviewResults";
import ProgressPage from "./pages/ProgressPage";
import SkillsPage from "./pages/SkillsPage";
import InterviewHistory from "./pages/InterviewHistory";
import InterviewHistoryDetail from "./pages/InterviewHistoryDetail";
import ResumePage from "./pages/ResumePage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<DashboardOverview />} />
                <Route path="setup" element={<InterviewSetup />} />
                <Route path="interview/live" element={<LiveInterview />} />
                <Route path="results" element={<InterviewResults />} />
                <Route path="progress" element={<ProgressPage />} />
                <Route path="skills" element={<SkillsPage />} />
                <Route path="history" element={<InterviewHistory />} />
                <Route path="history/:id" element={<InterviewHistoryDetail />} />
                <Route path="resume" element={<ResumePage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
