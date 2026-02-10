
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { KeyRound, Leaf, ArrowLeft, CheckCircle2 } from 'lucide-react';

const ForgotPassword = () => {
    const { resetPassword } = useAuth();
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Email, 2: New Password, 3: Success
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        // Check if user exists (simulated)
        const users = JSON.parse(localStorage.getItem('farming_app_users') || '[]');
        if (users.some(u => u.email === email)) {
            setStep(2);
            setError('');
        } else {
            setError('No account found with this email');
        }
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        const result = resetPassword(email, newPassword);
        if (result.success) {
            setStep(3);
            setError('');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-500 to-teal-900 flex items-center justify-center p-4">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-xl max-w-md w-full text-white">
                <div className="flex justify-center mb-6">
                    <div className="bg-emerald-100 p-3 rounded-full">
                        {step === 3 ? (
                            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                        ) : (
                            <KeyRound className="w-8 h-8 text-emerald-600" />
                        )}
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-center mb-2">
                    {step === 1 && 'Reset Password'}
                    {step === 2 && 'Set New Password'}
                    {step === 3 && 'Password Reset!'}
                </h1>
                <p className="text-emerald-100 text-center mb-8">
                    {step === 1 && 'Enter your email to reset your password'}
                    {step === 2 && 'Enter a strong new password for your account'}
                    {step === 3 && 'Your password has been successfully updated'}
                </p>

                {error && (
                    <div className="bg-red-500/20 border border-red-500/50 text-red-100 p-3 rounded-lg mb-4 text-sm text-center">
                        {error}
                    </div>
                )}

                {step === 1 && (
                    <form onSubmit={handleEmailSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-emerald-100 mb-1">Email Address</label>
                            <input
                                type="email"
                                required
                                className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-2 text-white placeholder-emerald-200/50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                placeholder="ramesh@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-emerald-500/25 mt-2"
                        >
                            Continue
                        </button>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-emerald-100 mb-1">New Password</label>
                            <input
                                type="password"
                                required
                                className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-2 text-white placeholder-emerald-200/50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                placeholder="••••••••"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-emerald-100 mb-1">Confirm New Password</label>
                            <input
                                type="password"
                                required
                                className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-2 text-white placeholder-emerald-200/50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-emerald-500/25 mt-2"
                        >
                            Reset Password
                        </button>
                    </form>
                )}

                {step === 3 && (
                    <button
                        onClick={() => navigate('/login')}
                        className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-emerald-500/25 mt-2"
                    >
                        Go to Login
                    </button>
                )}

                <div className="mt-8 text-center">
                    <Link
                        to="/login"
                        className="inline-flex items-center text-emerald-100 hover:text-white transition-colors text-sm"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
