
import React, { useState } from 'react';
import { X, Sprout } from 'lucide-react';
import { useData } from '../context/DataContext';

const AddParcelModal = ({ onClose }) => {
    const { addParcel } = useData();
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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addParcel(formData);
            onClose();
        } catch (error) {
            alert("Échec de l'ajout de la parcelle. Veuillez réessayer.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <Sprout className="text-emerald-500" /> Ajouter une nouvelle parcelle
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la parcelle</label>
                        <input type="text" name="name" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="ex. Champ Nord" onChange={handleChange} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Culture</label>
                            <input type="text" name="crop" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" placeholder="Wheat" onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Variété</label>
                            <input type="text" name="variety" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" placeholder="HD 2967" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Surface (Hectares)</label>
                            <input type="text" name="area" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" placeholder="2.5" onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                            <select name="status" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" onChange={handleChange}>
                                <option value="Healthy">Sain</option>
                                <option value="Attention Needed">Attention requise</option>
                                <option value="Ready for Harvest">Prêt pour la récolte</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date de plantation</label>
                            <input type="date" name="plantingDate" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Lieu (Ville/Village)</label>
                            <input type="text" name="location" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" placeholder="ex. Ludhiana" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">pH du sol</label>
                            <input type="number" step="0.1" name="soilPh" placeholder="0-14" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Matière organique (%)</label>
                            <div className="relative">
                                <input type="number" step="0.1" name="soilOrganicMatter" placeholder="e.g. 3.5" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 pr-8" onChange={handleChange} />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">%</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Texture du sol</label>
                            <select name="soilTexture" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" onChange={handleChange}>
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
                            <input type="color" name="color" className="w-full h-10 p-1 rounded-lg border border-gray-300 cursor-pointer" value={formData.color} onChange={handleChange} />
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-colors mt-2">
                        Ajouter la parcelle
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddParcelModal;
