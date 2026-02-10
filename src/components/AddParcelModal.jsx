
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
            alert("Failed to add parcel. Please try again.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <Sprout className="text-emerald-500" /> Add New Parcel
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Parcel Name</label>
                        <input type="text" name="name" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="e.g. North Field" onChange={handleChange} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Crop</label>
                            <input type="text" name="crop" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" placeholder="Wheat" onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Variety</label>
                            <input type="text" name="variety" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" placeholder="HD 2967" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Area (Hectares)</label>
                            <input type="text" name="area" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" placeholder="2.5" onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select name="status" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" onChange={handleChange}>
                                <option value="Healthy">Healthy</option>
                                <option value="Attention Needed">Attention Needed</option>
                                <option value="Ready for Harvest">Ready for Harvest</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Planting Date</label>
                            <input type="date" name="plantingDate" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location (City/Village)</label>
                            <input type="text" name="location" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" placeholder="e.g. Ludhiana" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Soil pH</label>
                            <input type="number" step="0.1" name="soilPh" placeholder="0-14" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Organic Matter (%)</label>
                            <div className="relative">
                                <input type="number" step="0.1" name="soilOrganicMatter" placeholder="e.g. 3.5" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 pr-8" onChange={handleChange} />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">%</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Soil Texture</label>
                            <select name="soilTexture" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" onChange={handleChange}>
                                <option value="Sandy">Sandy</option>
                                <option value="Silty">Silty</option>
                                <option value="Clay">Clay</option>
                                <option value="Loamy">Loamy</option>
                                <option value="Peaty">Peaty</option>
                                <option value="Chalky">Chalky</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Map Color</label>
                            <input type="color" name="color" className="w-full h-10 p-1 rounded-lg border border-gray-300 cursor-pointer" value={formData.color} onChange={handleChange} />
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-colors mt-2">
                        Add Parcel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddParcelModal;
