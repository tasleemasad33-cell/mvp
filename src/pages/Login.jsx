
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Sprout } from 'lucide-react';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await login(formData.email, formData.password);

        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-500 to-teal-900 flex items-center justify-center p-4">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-xl max-w-md w-full text-white">
                <div className="flex justify-center mb-6">
                    <div className="bg-emerald-100 p-3 rounded-full">
                        <Sprout className="w-8 h-8 text-emerald-600" />
                    </div>
                </div>
                <h1 className="text-4xl font-extrabold text-center mb-2 tracking-tight">Welcome</h1>
                <p className="text-emerald-100 text-center mb-8">Log in to your Farm-Connect account</p>

                {error && (
                    <div className="bg-red-500/20 border border-red-500/50 text-red-100 p-3 rounded-lg mb-4 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-emerald-100 mb-1">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-2 text-white placeholder-emerald-200/50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                            placeholder="ramesh@example.com"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-emerald-100 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-2 text-white placeholder-emerald-200/50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex justify-end">
                        <Link
                            to="/forgot-password"
                            className="text-sm text-emerald-100 hover:text-white transition-colors"
                        >
                            Forgot Password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-emerald-500/25 mt-2"
                    >
                        Log In
                    </button>
                </form>

                <p className="text-center mt-6 text-emerald-100 text-sm">
                    Don't have an account?{' '}
                    <Link to="/signup" className="font-bold hover:text-white underline decoration-2 decoration-emerald-400 underline-offset-4">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
