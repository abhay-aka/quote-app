import { useState } from "react";
import axios from "axios";

function LoginPage({ onLogin }) {
    const [username, setUsername] = useState("");
    const [otp, setOtp] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://assignment.stage.crafto.app/login', { username, otp });
            const token = response.data.token;
            localStorage.setItem('token', token);
            onLogin();
        } catch (err) {
            alert("Login failed. Please check your credentials.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md w-80">
                <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                    className="w-full mb-4 p-2 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="OTP"
                    required
                    className="w-full mb-4 p-2 border border-gray-300 rounded"
                />
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                    Login
                </button>
            </form>
        </div>
    );
}

export default LoginPage;
