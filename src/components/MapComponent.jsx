
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

    const getParcelLayout = (index) => {
        const cols = 3; // Reduced cols to fit better with gaps
        const width = 80; // Wider cards
        const height = 50; // Taller cards
        const gapX = 20;
        const gapY = 20;
        const startX = 20;
        const startY = 60; // Pushed down to avoid dropdown overlap

        const col = index % cols;
        const row = Math.floor(index / cols);

        const x = startX + col * (width + gapX);
        const y = startY + row * (height + gapY);

        // Cleaner rectangle shape
        const path = `M${x},${y} L${x + width},${y} L${x + width},${y + height} L${x},${y + height} Z`;
        const center = { x: x + width / 2, y: y + height / 2 };

        return { path, center };
    };

    // Calculate height dynamically
    const rows = Math.ceil(filteredParcels.length / 3) || 1;
    const viewBoxHeight = Math.max(200, rows * 70 + 80); // Increased base height

    return (
        <div className="w-full bg-emerald-50 rounded-xl overflow-hidden shadow-inner border border-emerald-100 relative">
            <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur p-2 rounded-lg shadow text-xs text-gray-600 flex flex-col gap-2">
                <span className="font-semibold">Carte de l'exploitation en direct (Grille)</span>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="bg-white border border-emerald-100 rounded px-2 py-1 text-xs outline-none focus:ring-1 focus:ring-emerald-500"
                >
                    <option value="All">Tout afficher</option>
                    <option value="Healthy">Sain</option>
                    <option value="Attention Needed">Attention requise</option>
                    <option value="Ready for Harvest">Prêt pour la récolte</option>
                </select>
            </div>

            <svg viewBox={`0 0 320 ${viewBoxHeight}`} className="w-full h-auto cursor-pointer" style={{ minHeight: '200px' }}>
                {/* Background Details */}
                <path d={`M0,${viewBoxHeight / 2} Q160,${viewBoxHeight} 320,${viewBoxHeight / 2}`} fill="none" stroke="#6ee7b7" strokeWidth="2" opacity="0.3" />

                {filteredParcels.map((parcel, index) => {
                    // Always use generated layout to ensure no overlapping
                    const layout = getParcelLayout(index);

                    return (
                        <g
                            key={index}
                            onClick={() => (parcel._id || parcel.id) && navigate(`/parcel/${parcel._id || parcel.id}`)}
                            className="group hover:opacity-90 transition-all duration-300"
                        >
                            <path
                                d={layout.path}
                                fill={parcel.color || '#4ade80'}
                                stroke="white"
                                strokeWidth="2"
                                className="drop-shadow-md group-hover:drop-shadow-xl transition-all"
                            />
                            {/* Label inside parcel */}
                            <text
                                x={layout.center.x}
                                y={layout.center.y}
                                textAnchor="middle"
                                fill="white"
                                fontSize="8"
                                fontWeight="bold"
                                className="pointer-events-none drop-shadow-md"
                            >
                                {parcel.name}
                            </text>
                            <text
                                x={layout.center.x}
                                y={layout.center.y + 10}
                                textAnchor="middle"
                                fill="white"
                                fontSize="6"
                                className="pointer-events-none drop-shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                {parcel.crop}
                            </text>
                        </g>
                    )
                })}
            </svg>

            {/* Legend */}
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-2 rounded-lg shadow-sm flex items-center gap-4 text-[10px] text-gray-600">
                <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
                    <span>Sain</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                    <span>Avertissement</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-400"></span>
                    <span>Action requise</span>
                </div>
            </div>
        </div>
    );
};

export default MapComponent;
