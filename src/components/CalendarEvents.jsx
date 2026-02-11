
import React from 'react';
import { useData } from '../context/DataContext';
import { Calendar, Droplets, Bug, Sprout, Activity, CheckCircle2, Circle, Trash2 } from 'lucide-react';

const CalendarEvents = ({ parcelId }) => {
    const { advisories, toggleAdvisoryStatus, deleteAdvisory } = useData();
    const events = advisories.filter(a => (a.parcelId?._id || a.parcelId) === parcelId);

    const getIcon = (type) => {
        switch (type) {
            case 'water': return <Droplets className="w-4 h-4 text-blue-500" />;
            case 'health': return <Bug className="w-4 h-4 text-red-500" />;
            case 'fertilizer': return <Sprout className="w-4 h-4 text-emerald-500" />;
            default: return <Activity className="w-4 h-4 text-purple-500" />;
        }
    };

    if (events.length === 0) {
        return <div className="text-gray-400 text-sm text-center py-8">Aucune activité planifiée.</div>;
    }

    return (
        <div className="relative border-l-2 border-emerald-100 ml-3 space-y-6">
            {events.map((event) => (
                <div key={event._id || event.id} className={`mb-6 ml-6 relative group ${event.status === 'completed' ? 'opacity-60' : ''}`}>
                    <span className="absolute -left-[31px] top-1 flex items-center justify-center w-6 h-6 bg-white border-2 border-emerald-100 rounded-full">
                        {getIcon(event.type)}
                    </span>

                    <div className="flex justify-between items-start">
                        <div className="flex-1">
                            <h3 className={`font-semibold text-gray-900 ${event.status === 'completed' ? 'line-through decoration-emerald-500/50' : ''}`}>
                                {event.title}
                            </h3>
                            <time className="block mb-1 text-xs font-normal leading-none text-gray-400">{event.date}</time>
                            <p className="text-sm text-gray-600 mb-2">
                                {event.description}
                            </p>
                            <div className="flex items-center gap-2">
                                <span className="bg-emerald-50 text-emerald-700 text-xs px-2 py-0.5 rounded border border-emerald-100">
                                    {event.source}
                                </span>
                                {event.confidence && (
                                    <span className="text-xs text-gray-400">
                                        Confiance : {event.confidence}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => toggleAdvisoryStatus(event._id || event.id)}
                                title={event.status === 'completed' ? "Marquer comme en attente" : "Marquer comme fait"}
                                className="p-1 hover:bg-emerald-50 rounded-full text-emerald-600 transition-colors"
                            >
                                {event.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                            </button>
                            <button
                                onClick={() => { if (window.confirm('Supprimer cet événement ?')) deleteAdvisory(event._id || event.id) }}
                                title="Supprimer l'événement"
                                className="p-1 hover:bg-red-50 rounded-full text-red-400 hover:text-red-500 transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CalendarEvents;
