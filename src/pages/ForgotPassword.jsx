
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { KeyRound, Leaf, ArrowLeft, CheckCircle2 } from 'lucide-react';

const ForgotPassword = () => {
    const { resetPassword } = useAuth();
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Email & Phone, 2: New Password, 3: Success
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleVerificationSubmit = (e) => {
        e.preventDefault();
        // In a real app, we would verify existence here, but for security 
        // we'll just move to the next step and let the final submission validate
        if (email && phone) {
            setStep(2);
            setError('');
        } else {
            setError('Veuillez entrer l\'e-mail et le numéro de téléphone');
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (newPassword !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            return;
        }
        if (newPassword.length < 6) {
            setError('Le mot de passe doit contenir au moins 6 caractères');
            return;
        }

        const result = await resetPassword(email, phone, newPassword);

        if (result.success) {
            setStep(3);
            setError('');
        } else {
            setError(result.message || 'Échec de la vérification. Vérifiez vos informations.');
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
                    {step === 1 && 'Réinitialiser le mot de passe'}
                    {step === 2 && 'Définir un nouveau mot de passe'}
                    {step === 3 && 'Mot de passe réinitialisé !'}
                </h1>
                <p className="text-emerald-100 text-center mb-8">
                    {step === 1 && 'Entrez votre e-mail et votre téléphone pour vérifier votre identité'}
                    {step === 2 && 'Entrez un nouveau mot de passe fort pour votre compte'}
                    {step === 3 && 'Votre mot de passe a été mis à jour avec succès'}
                </p>

                {error && (
                    <div className="bg-red-500/20 border border-red-500/50 text-red-100 p-3 rounded-lg mb-4 text-sm text-center">
                        {error}
                    </div>
                )}

                {step === 1 && (
                    <form onSubmit={handleVerificationSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-emerald-100 mb-1">Adresse e-mail</label>
                            <input
                                type="email"
                                required
                                className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-2 text-white placeholder-emerald-200/50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                placeholder="ramesh@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-emerald-100 mb-1">Numéro de téléphone (pour vérification)</label>
                            <input
                                type="tel"
                                required
                                className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-2 text-white placeholder-emerald-200/50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                                placeholder="+91 98765 43210"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-emerald-500/25 mt-2"
                        >
                            Vérifier et continuer
                        </button>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-emerald-100 mb-1">Nouveau mot de passe</label>
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
                            <label className="block text-sm font-medium text-emerald-100 mb-1">Confirmer le nouveau mot de passe</label>
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
                            Réinitialiser le mot de passe
                        </button>
                    </form>
                )}

                {step === 3 && (
                    <button
                        onClick={() => navigate('/login')}
                        className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-emerald-500/25 mt-2"
                    >
                        Aller à la connexion
                    </button>
                )}

                <div className="mt-8 text-center">
                    <Link
                        to="/login"
                        className="inline-flex items-center text-emerald-100 hover:text-white transition-colors text-sm"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Retour à la connexion
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
