
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MapComponent = ({ parcels }) => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState('All');

    const filteredParcels = filter === 'All'
        ? parcels
        : parcels.filter(p => p.status === filter);

    const legendItems = [
        { label: 'Healthy', color: '#4ade80' },
        { label: 'Warning', color: '#facc15' },
        { label: 'Action Required', color: '#fb923c' }
    ];

    return (
        <div className="w-full bg-emerald-50 rounded-xl overflow-hidden shadow-inner border border-emerald-100 relative">
            <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur p-2 rounded-lg shadow text-xs text-gray-600 flex flex-col gap-2">
                <span className="font-semibold">Interactive Farm Map</span>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="bg-white border border-emerald-100 rounded px-2 py-1 text-xs outline-none focus:ring-1 focus:ring-emerald-500"
                >
                    <option value="All">Show All</option>
                    <option value="Healthy">Healthy</option>
                    <option value="Attention Needed">Attention Needed</option>
                    <option value="Ready for Harvest">Ready for Harvest</option>
                </select>
            </div>

            <svg viewBox="0 0 300 120" className="w-full h-auto cursor-pointer">
                {/* Background Details */}
                <path d="M0,60 Q150,120 300,60" fill="none" stroke="#6ee7b7" strokeWidth="2" opacity="0.3" />

                {filteredParcels.map((parcel) => (
                    <g
                        key={parcel._id || parcel.id}
                        onClick={() => navigate(`/parcel/${parcel._id || parcel.id}`)}
                        className="group hover:opacity-90 transition-all duration-300"
                    >
                        <path
                            d={parcel.path}
                            fill={parcel.color}
                            stroke="white"
                            strokeWidth="2"
                            className="drop-shadow-md group-hover:drop-shadow-xl transition-all"
                        />
                        {/* Label inside parcel */}
                        <text
                            x={parcel.center.x}
                            y={parcel.center.y}
                            textAnchor="middle"
                            fill="white"
                            fontSize="8"
                            fontWeight="bold"
                            className="pointer-events-none drop-shadow-md"
                        >
                            {parcel.name}
                        </text>
                        <text
                            x={parcel.center.x}
                            y={parcel.center.y + 10}
                            textAnchor="middle"
                            fill="white"
                            fontSize="6"
                            className="pointer-events-none drop-shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            {parcel.crop}
                        </text>
                    </g>
                ))}
            </svg>

            {/* Legend */}
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-2 rounded-lg shadow-sm flex items-center gap-4 text-[10px] text-gray-600">
                <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
                    <span>Healthy</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                    <span>Warning</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-400"></span>
                    <span>Action Required</span>
                </div>
            </div>
        </div>
    );
};

export default MapComponent;
