import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiRequest } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const sessionUser = localStorage.getItem('farming_user');
        const token = localStorage.getItem('farming_token');
        if (sessionUser && token) {
            setUser(JSON.parse(sessionUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const data = await apiRequest('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });
            setUser(data.user);
            localStorage.setItem('farming_user', JSON.stringify(data.user));
            localStorage.setItem('farming_token', data.token);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const register = async (userData) => {
        try {
            const data = await apiRequest('/auth/register', {
                method: 'POST',
                body: JSON.stringify(userData)
            });
            setUser(data.user);
            localStorage.setItem('farming_user', JSON.stringify(data.user));
            localStorage.setItem('farming_token', data.token);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('farming_user');
        localStorage.removeItem('farming_token');
    };

    const resetPassword = async (email, newPassword) => {
        // Simple mock for now as we don't have a dedicated endpoint yet
        return { success: false, message: 'Feature coming soon to secure backend' };
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, resetPassword, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
