import React from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User } from 'lucide-react';
import logo from '../assets/logo.png';

const Layout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="h-10 w-10 rounded-full bg-white p-0.5 flex items-center justify-center overflow-hidden border border-emerald-100">
                            <img src={logo} alt="Agrilink Afrique" className="h-full w-full object-contain" />
                        </div>
                        <span className="font-bold text-2xl text-emerald-800 tracking-tight">Agrilink Afrique</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <User className="w-4 h-4" />
                            <span>{user.name} ({user.role})</span>
                        </div>
                        <button onClick={handleLogout} className="p-2 hover:bg-gray-100 rounded-full text-gray-500" title="Déconnexion">
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </header>
            <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
                <Outlet />
            </main>
        </div>
    );
};
export default Layout;
