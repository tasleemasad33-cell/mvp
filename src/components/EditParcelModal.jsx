
import React, { useState, useEffect } from 'react';
import { X, Sprout } from 'lucide-react';
import { useData } from '../context/DataContext';

const EditParcelModal = ({ parcel, onClose }) => {
    const { updateParcel } = useData();
    const [formData, setFormData] = useState({
        name: '',
        crop: '',
        variety: '',
        area: '',
        plantingDate: '',
        harvestDate: '',
        status: 'Healthy',
        color: '#4ade80',
        location: '',
        soilTexture: 'Loamy',
        soilPh: '7.0',
        soilOrganicMatter: '2.5'
    });

    useEffect(() => {
        if (parcel) {
            setFormData({
                name: parcel.name,
                crop: parcel.crop,
                variety: parcel.variety,
                area: parcel.area,
                plantingDate: parcel.plantingDate,
                harvestDate: parcel.harvestDate || '',
                status: parcel.status,
                color: parcel.color,
                location: parcel.location || '',
                soilTexture: parcel.soilTexture || 'Loamy',
                soilPh: parcel.soilPh || '7.0',
                soilOrganicMatter: parcel.soilOrganicMatter || '2.5'
            });
        }
    }, [parcel]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateParcel(parcel._id || parcel.id, formData);
            onClose();
        } catch (error) {
            alert("Échec de la mise à jour de la parcelle.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <Sprout className="text-emerald-500" /> Modifier la parcelle
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la parcelle</label>
                        <input type="text" name="name" value={formData.name} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" onChange={handleChange} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Culture</label>
                            <input type="text" name="crop" value={formData.crop} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Variété</label>
                            <input type="text" name="variety" value={formData.variety} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Surface (Hectares)</label>
                            <input type="text" name="area" value={formData.area} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                            <select name="status" value={formData.status} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" onChange={handleChange}>
                                <option value="Healthy">Sain</option>
                                <option value="Attention Needed">Attention requise</option>
                                <option value="Ready for Harvest">Prêt pour la récolte</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date de plantation</label>
                            <input type="date" name="plantingDate" value={formData.plantingDate} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Lieu (Ville/Village)</label>
                            <input type="text" name="location" value={formData.location} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" placeholder="e.g. Ludhiana" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">pH du sol</label>
                            <input type="number" step="0.1" name="soilPh" value={formData.soilPh} placeholder="0-14" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Matière organique (%)</label>
                            <div className="relative">
                                <input type="number" step="0.1" name="soilOrganicMatter" value={formData.soilOrganicMatter} placeholder="e.g. 3.5" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 pr-8" onChange={handleChange} />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">%</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Texture du sol</label>
                            <select name="soilTexture" value={formData.soilTexture} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" onChange={handleChange}>
                                <option value="Sandy">Sableux</option>
                                <option value="Silty">Limoneux</option>
                                <option value="Clay">Argileux</option>
                                <option value="Loamy">Franc</option>
                                <option value="Peaty">Tourbeux</option>
                                <option value="Chalky">Calcaire</option>
                                <option value="Other">Autre</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Couleur sur la carte</label>
                            <input type="color" name="color" value={formData.color} className="w-full h-10 p-1 rounded-lg border border-gray-300 cursor-pointer" onChange={handleChange} />
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-colors mt-2">
                        Enregistrer les modifications
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditParcelModal;
