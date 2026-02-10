
import React, { useState } from 'react';
import { X, Calendar } from 'lucide-react';
import { useData } from '../context/DataContext';

const AddAdvisoryModal = ({ parcelId, onClose }) => {
    const { addAdvisory } = useData();
    const [formData, setFormData] = useState({
        title: '',
        date: new Date().toISOString().split('T')[0],
        type: 'fertilizer',
        description: '',
        source: 'Manual Entry',
        confidence: 'High'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addAdvisory({ ...formData, parcelId });
            onClose();
        } catch (error) {
            alert("Failed to save event.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <Calendar className="text-emerald-500" /> Add Event / Advisory
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                        <input type="text" name="title" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" placeholder="e.g. Pest Check" onChange={handleChange} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                            <input type="date" name="date" required value={formData.date} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                            <select name="type" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" value={formData.type} onChange={handleChange}>
                                <option value="fertilizer">Fertilizer</option>
                                <option value="water">Irrigation</option>
                                <option value="health">Health Check</option>
                                <option value="harvest">Harvest</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea name="description" required rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" placeholder="Details about this event..." onChange={handleChange}></textarea>
                    </div>

                    <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-colors mt-2">
                        Save Event
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddAdvisoryModal;
