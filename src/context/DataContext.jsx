import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { apiRequest } from '../services/api';

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
    const { user } = useAuth();
    const [parcels, setParcels] = useState([]);
    const [advisories, setAdvisories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            setParcels([]);
            setAdvisories([]);
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                setLoading(true);
                const [parcelsData, advisoriesData] = await Promise.all([
                    apiRequest('/parcels'),
                    apiRequest('/advisories')
                ]);
                setParcels(parcelsData);
                setAdvisories(advisoriesData);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user?.id]);

    const addParcel = async (parcelData) => {
        try {
            const newParcel = await apiRequest('/parcels', {
                method: 'POST',
                body: JSON.stringify(parcelData)
            });
            setParcels(prev => [...prev, newParcel]);
            return newParcel;
        } catch (error) {
            console.error("Add parcel error:", error);
            throw error;
        }
    };

    const updateParcel = async (id, updatedData) => {
        try {
            const updated = await apiRequest(`/parcels/${id}`, {
                method: 'PATCH',
                body: JSON.stringify(updatedData)
            });
            setParcels(prev => prev.map(p => p._id === id ? updated : p));
        } catch (error) {
            console.error("Update parcel error:", error);
            throw error;
        }
    };

    const deleteParcel = async (id) => {
        try {
            await apiRequest(`/parcels/${id}`, { method: 'DELETE' });
            setParcels(prev => prev.filter(p => p._id !== id));
            setAdvisories(prev => prev.filter(a => a.parcelId !== id));
        } catch (error) {
            console.error("Delete parcel error:", error);
            throw error;
        }
    };

    const addAdvisory = async (advisoryData) => {
        try {
            const newAdvisory = await apiRequest('/advisories', {
                method: 'POST',
                body: JSON.stringify(advisoryData)
            });
            setAdvisories(prev => [...prev, newAdvisory]);
            return newAdvisory;
        } catch (error) {
            console.error("Add advisory error:", error);
            throw error;
        }
    };

    const deleteAdvisory = async (id) => {
        try {
            await apiRequest(`/advisories/${id}`, { method: 'DELETE' });
            setAdvisories(prev => prev.filter(a => a._id !== id));
        } catch (error) {
            console.error("Delete advisory error:", error);
            throw error;
        }
    };

    const toggleAdvisoryStatus = async (id) => {
        const advisory = advisories.find(a => a._id === id);
        if (!advisory) return;

        try {
            const updated = await apiRequest(`/advisories/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    status: advisory.status === 'completed' ? 'pending' : 'completed'
                })
            });
            setAdvisories(prev => prev.map(a => a._id === id ? updated : a));
        } catch (error) {
            console.error("Toggle advisory error:", error);
        }
    };

    return (
        <DataContext.Provider value={{
            parcels, advisories,
            addParcel, updateParcel, deleteParcel,
            addAdvisory, deleteAdvisory, toggleAdvisoryStatus,
            loading
        }}>
            {!loading && children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
