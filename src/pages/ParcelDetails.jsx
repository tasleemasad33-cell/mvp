
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { ArrowLeft, MapPin, Calendar, Activity, Sprout, Plus, Edit2, Trash2 } from 'lucide-react';
import CalendarEvents from '../components/CalendarEvents';
import ChatInterface from '../components/ChatInterface';
import AddAdvisoryModal from '../components/AddAdvisoryModal';
import EditParcelModal from '../components/EditParcelModal';

const ParcelDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { parcels, deleteParcel } = useData();
    const [isAdvisoryModalOpen, setIsAdvisoryModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const parcel = parcels.find(p => (p._id || p.id) === id);

    if (!parcel) {
        return <div className="p-8">Parcelle introuvable. Redirection...</div>;
    }

    const handleDelete = () => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette parcelle ? Cette action est irréversible.")) {
            deleteParcel(parcel._id || parcel.id);
            navigate('/');
        }
    };

    return (
        <div className="p-4 md:p-8 max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Retour au tableau de bord
                </button>

                <div className="flex gap-2">
                    <button
                        onClick={() => setIsEditModalOpen(true)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm font-medium transition-colors"
                    >
                        <Edit2 className="w-3.5 h-3.5" /> Modifier
                    </button>
                    <button
                        onClick={handleDelete}
                        className="flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 text-sm font-medium transition-colors"
                    >
                        <Trash2 className="w-3.5 h-3.5" /> Supprimer
                    </button>
                </div>
            </div>

            {/* Header Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6 mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{parcel.name}</h1>
                        <div className="flex flex-wrap items-center gap-4 text-gray-500">
                            <div className="flex items-center gap-1.5">
                                <MapPin className="w-4 h-4 text-emerald-500" />
                                <span>{parcel.location || 'Lieu non défini'}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Activity className="w-4 h-4 text-gray-400" />
                                <span>ID: {parcel._id || parcel.id}</span>
                            </div>
                        </div>
                    </div>
                    <div className={`px-4 py-2 rounded-full font-medium ${parcel.status === 'Healthy' ? 'bg-green-100 text-green-700' :
                        parcel.status === 'Attention Needed' ? 'bg-yellow-100 text-yellow-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                        Statut: {parcel.status}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Static Info Cards */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-emerald-200 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                            <Sprout className="w-6 h-6" />
                        </div>
                        <h3 className="text-gray-500 font-medium">Détails de la culture</h3>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{parcel.crop}</p>
                    <p className="text-gray-500">{parcel.variety}</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-emerald-200 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <h3 className="text-gray-500 font-medium">Superficie</h3>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{parcel.area} Ha</p>
                    <p className="text-gray-500">Terre enregistrée</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-emerald-200 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                            <Calendar className="w-6 h-6" />
                        </div>
                        <h3 className="text-gray-500 font-medium">Chronologie</h3>
                    </div>
                    <div className="space-y-1">
                        <p className="font-semibold text-gray-900">Planté : {parcel.plantingDate}</p>
                        <p className="text-gray-500">Récolte : {parcel.harvestDate || 'Non défini'}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-3 hover:border-emerald-200 transition-colors mt-2">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                            <Activity className="w-6 h-6" />
                        </div>
                        <h3 className="text-gray-500 font-medium text-lg">Analyses du sol</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="border-r border-gray-100 last:border-0 pr-4">
                            <p className="text-sm text-gray-500 mb-1">Texture du sol</p>
                            <p className="text-xl font-bold text-gray-900">{parcel.soilTexture || 'Non échantillonné'}</p>
                        </div>
                        <div className="border-r border-gray-100 last:border-0 pr-4">
                            <p className="text-sm text-gray-500 mb-1">Soil pH</p>
                            <p className="text-xl font-bold text-gray-900">{parcel.soilPh || '—'}</p>
                            <p className="text-xs text-gray-400 font-medium">
                                {Number(parcel.soilPh) < 6.5 ? 'Acide' : Number(parcel.soilPh) > 7.5 ? 'Alcalin' : 'Neutre'}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Matière organique</p>
                            <p className="text-xl font-bold text-gray-900">{parcel.soilOrganicMatter || '—'}%</p>
                            <div className="w-full bg-gray-100 h-2 rounded-full mt-2">
                                <div
                                    className="bg-emerald-500 h-2 rounded-full"
                                    style={{ width: `${Math.min(Number(parcel.soilOrganicMatter) * 20, 100)}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Advisory and Chat Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-emerald-800 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-emerald-500" /> Activités planifiées et conseils
                        </h2>
                        <button
                            onClick={() => setIsAdvisoryModalOpen(true)}
                            className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 px-3 py-1 rounded-lg text-xs font-medium border border-emerald-100 transition-colors flex items-center gap-1"
                        >
                            <Plus className="w-3 h-3" /> Ajouter un événement
                        </button>
                    </div>
                    <CalendarEvents parcelId={parcel._id || parcel.id} />
                </div>

                <div className="h-full">
                    <ChatInterface parcel={parcel} />
                </div>
            </div>

            {isAdvisoryModalOpen && (
                <AddAdvisoryModal
                    parcelId={parcel._id || parcel.id}
                    onClose={() => setIsAdvisoryModalOpen(false)}
                />
            )}

            {isEditModalOpen && (
                <EditParcelModal
                    parcel={parcel}
                    onClose={() => setIsEditModalOpen(false)}
                />
            )}
        </div>
    );
};

export default ParcelDetails;
