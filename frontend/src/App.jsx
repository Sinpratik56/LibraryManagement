import {
    Routes,
    Route
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import Students from "./pages/Students";
import IssueBook from "./pages/IssueBook";
import ReturnBook from "./pages/ReturnBook";
import OverdueBooks from "./pages/OverdueBooks";
import StudentHistory from "./pages/StudentHistory";
import Users from "./pages/Users";
import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminOnly from "./components/AdminOnly";

function App() {

    return (

        <Routes>

            <Route
                path="/"
                element={<Login />}
            />

            {/* Dashboard */}

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>

                        <Dashboard />

                    </ProtectedRoute>
                }
            />

            {/* Admin Routes */}

            <Route
                path="/books"
                element={
                    <ProtectedRoute>

                        <AdminOnly>

                            <Books />

                        </AdminOnly>

                    </ProtectedRoute>
                }
            />

            <Route
                path="/students"
                element={
                    <ProtectedRoute>

                        <AdminOnly>

                            <Students />

                        </AdminOnly>

                    </ProtectedRoute>
                }
            />

            <Route
                path="/issue-book"
                element={
                    <ProtectedRoute>

                        <AdminOnly>

                            <IssueBook />

                        </AdminOnly>

                    </ProtectedRoute>
                }
            />

            <Route
                path="/return-book"
                element={
                    <ProtectedRoute>

                        <AdminOnly>

                            <ReturnBook />

                        </AdminOnly>

                    </ProtectedRoute>
                }
            />

            <Route
                path="/overdue"
                element={
                    <ProtectedRoute>

                        <AdminOnly>

                            <OverdueBooks />

                        </AdminOnly>

                    </ProtectedRoute>
                }
            />

            {/* Common Route */}

            <Route
                path="/student-history"
                element={
                    <ProtectedRoute>

                        <StudentHistory />

                    </ProtectedRoute>
                }
            />
            <Route
                path="/users"
                element={
                    <ProtectedRoute>

                      <AdminOnly>

                        <Users />

                      </AdminOnly>

                    </ProtectedRoute>
                }
            />

            <Route
                path="/profile"
                element={
                    <ProtectedRoute>

                        <Profile />

                    </ProtectedRoute>
                }
            />

        </Routes>
    );
}

export default App;