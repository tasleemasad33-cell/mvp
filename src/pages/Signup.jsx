
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Sprout } from 'lucide-react';

const Signup = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        confirmPassword: '',
        role: 'farmer'
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError("Les mots de passe ne correspondent pas");
            return;
        }

        const result = await register({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            password: formData.password,
            role: formData.role
        });

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
                    <div className="h-16 w-16 rounded-full bg-white p-3 flex items-center justify-center">
                        <Sprout className="h-10 w-10 text-emerald-600" />
                    </div>
                </div>
                <h2 className="text-4xl font-extrabold text-center mb-2 tracking-tight">Bienvenue</h2>
                <p className="text-emerald-100 text-center mb-6">Rejoignez la communauté Farm-Connect</p>

                {error && (
                    <div className="bg-red-500/20 border border-red-500/50 text-red-100 p-3 rounded-lg mb-4 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-emerald-100 mb-1">Nom complet</label>
                        <input
                            type="text"
                            name="name"
                            required
                            className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-2 text-white placeholder-emerald-200/50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                            placeholder="Ramesh Kumar"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-emerald-100 mb-1">Adresse e-mail</label>
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
                        <label className="block text-sm font-medium text-emerald-100 mb-1">Numéro de téléphone</label>
                        <input
                            type="tel"
                            name="phone"
                            required
                            className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-2 text-white placeholder-emerald-200/50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-emerald-100 mb-1">Adresse</label>
                        <input
                            type="text"
                            name="address"
                            required
                            className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-2 text-white placeholder-emerald-200/50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                            placeholder="Village, District, State"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-emerald-100 mb-1">Rôle</label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 [&>option]:text-gray-900"
                            >
                                <option value="farmer">Agriculteur</option>
                                <option value="institution">Institution</option>
                                <option value="financier">Financier</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-emerald-100 mb-1">Mot de passe</label>
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

                    <div>
                        <label className="block text-sm font-medium text-emerald-100 mb-1">Confirmer le mot de passe</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            required
                            className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-2 text-white placeholder-emerald-200/50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-emerald-500/25 mt-2"
                    >
                        S'inscrire
                    </button>
                </form>

                <p className="text-center mt-6 text-emerald-100 text-sm">
                    Vous avez déjà un compte ?{' '}
                    <Link to="/login" className="font-bold hover:text-white underline decoration-2 decoration-emerald-400 underline-offset-4">
                        Se connecter
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
