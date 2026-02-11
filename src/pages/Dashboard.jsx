
import React, { useState } from 'react';
import MapComponent from '../components/MapComponent';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, MapPin, Plus } from 'lucide-react';
import AddParcelModal from '../components/AddParcelModal';

const Dashboard = () => {
    const navigate = useNavigate();
    const { parcels } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="p-4 md:p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-emerald-900">Vue d'ensemble de l'exploitation</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
                >
                    <Plus className="w-4 h-4" /> Ajouter une parcelle
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Map Section */}
                <div className="lg:col-span-2">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100/50 mb-6">
                        <h2 className="text-xl font-bold text-emerald-800 mb-6 flex items-center gap-2">
                            <MapPin className="text-emerald-500 w-5 h-5" /> Carte de l'exploitation en direct
                        </h2>
                        <MapComponent parcels={parcels} />
                    </div>
                </div>

                {/* Quick List Section */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100/50 h-full">
                        <h2 className="text-xl font-bold text-emerald-800 mb-6">Parcelles actives</h2>
                        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                            {parcels.length === 0 ? (
                                <p className="text-gray-500 text-center py-4">Aucune parcelle ajoutée pour le moment.</p>
                            ) : parcels.map(parcel => (
                                <div
                                    key={parcel._id || parcel.id}
                                    onClick={() => navigate(`/parcel/${parcel._id || parcel.id}`)}
                                    className="group flex flex-col p-4 rounded-xl border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/50 cursor-pointer transition-all duration-300"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold text-gray-900 group-hover:text-emerald-700">{parcel.name}</h3>
                                        <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                                    </div>

                                    <div className="flex justify-between items-end">
                                        <div className="text-sm text-gray-500 space-y-1">
                                            <p>{parcel.crop} • {parcel.area} Ha</p>
                                            {parcel.location && (
                                                <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
                                                    <MapPin className="w-3 h-3" />
                                                    <span>{parcel.location}</span>
                                                </div>
                                            )}
                                            <p className="text-xs text-gray-400">Planté : {parcel.plantingDate}</p>
                                        </div>

                                        <span className={`text-xs font-medium px-3 py-1 rounded-full ${parcel.status === 'Healthy' ? 'bg-green-100 text-green-700' :
                                            parcel.status === 'Attention Needed' ? 'bg-yellow-100 text-yellow-700' : 'bg-orange-100 text-orange-700'
                                            }`}>
                                            {parcel.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && <AddParcelModal onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};
export default Dashboard;
