import React, { useState } from "react"; 
import Icon from "@mdi/react";
import { mdiEye, mdiEyeOff } from "@mdi/js";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:5000/api/users/login",
                { email, password }
            );

            if (response.data.message === "Login successful") {
                message.success("Login Successful!");
                
                // Save email to localStorage
                localStorage.setItem("userEmail", email);
                localStorage.setItem("currentUser", JSON.stringify(response.data.user));

                // If email is admin@gmail.com, navigate to /mainloan
                if (email === "admin@gmail.com") {
                    navigate("/mainloan");
                } else if (email === "complain@gmail.com") {
                    navigate("/complaint-details");
                } else {
                    navigate("/");
                }
            } else {
                message.error("Login Failed. Check your credentials.");
            }
        } catch (error) {
            if (error.response && error.response.data) {
                message.error(error.response.data.message);
            } else {
                message.error("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex justify-center items-center">
            <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">
                <h2 className="text-3xl font-bold text-center text-blue-700 mb-4">
                    Welcome Back!
                </h2>
                <p className="text-center text-gray-500 mb-8">
                    Enter your credentials to continue
                </p>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                            />
                            <div
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
                            >
                                <Icon path={showPassword ? mdiEyeOff : mdiEye} size={1} />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-700">Remember me</span>
                        </label>
                        <a href="/" className="text-sm text-blue-600 hover:text-blue-700">
                            Forgot password?
                        </a>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg shadow-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-300"
                    >
                        Login
                    </button>
                    <p className="text-center text-gray-600">
                        Don't have an account?{" "}
                        <a href="/signup" className="text-blue-600 hover:text-blue-700">
                            Sign up
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;