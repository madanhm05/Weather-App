import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";
import Login from "./Login";
import Signup from "./Signup";
import AuthGuard from "./AuthGuard";

function AllRoutes() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protect Routes */}
          <Route
            path="/home"
            element={
              <AuthGuard>
                <App />
              </AuthGuard>
            }
          />

          {/* Redirect all unknown paths */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default AllRoutes;
