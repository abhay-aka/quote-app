import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import QuoteListPage from "./components/QuoteListPage";
import CreateQuotePage from "./components/CreateQuotePage";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    return (
        <Router>
            <div className="min-h-screen bg-gray-50">
                <Routes>
                    <Route path="/" element={isAuthenticated ? <Navigate to="/quotes" /> : <LoginPage onLogin={handleLogin} />} />
                    <Route path="/quotes" element={isAuthenticated ? <QuoteListPage /> : <Navigate to="/" />} />
                    <Route path="/create-quote" element={isAuthenticated ? <CreateQuotePage /> : <Navigate to="/" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
