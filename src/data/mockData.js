
export const parcels = [
    {
        id: "p1",
        name: "Parcelle riveraine",
        area: "2.4 Hectares",
        crop: "Blé",
        variety: "HD 2967",
        plantingDate: "2024-11-05",
        harvestDate: "2025-04-15",
        status: "Healthy",
        healthScore: 85,
        path: "M20,20 L80,20 L90,60 L30,80 Z",
        center: { x: 55, y: 45 },
        color: "#4ade80",
        location: "Ludhiana",
        soilPh: "6.8",
        soilOrganicMatter: "3.2",
        soilTexture: "Franc",
        ownerId: "farmer"
    },
    {
        id: "p2",
        name: "Champ au sommet",
        area: "1.8 Hectares",
        crop: "Moutarde",
        variety: "Pusa Bold",
        plantingDate: "2024-10-20",
        harvestDate: "2025-03-10",
        status: "Attention Needed",
        healthScore: 65,
        path: "M100,20 L180,10 L190,70 L120,90 Z",
        center: { x: 145, y: 50 },
        color: "#facc15",
        location: "Patiala",
        soilPh: "5.5",
        soilOrganicMatter: "1.8",
        soilTexture: "Sableux",
        ownerId: "farmer"
    },
    {
        id: "p3",
        name: "Parcelle Est",
        area: "3.1 Hectares",
        crop: "Canne à sucre",
        variety: "Co 0238",
        plantingDate: "2024-03-15",
        harvestDate: "2025-02-28",
        status: "Ready for Harvest",
        healthScore: 92,
        path: "M200,30 L280,30 L270,90 L210,80 Z",
        center: { x: 240, y: 55 },
        color: "#fb923c",
        location: "Jalandhar",
        soilPh: "7.4",
        soilOrganicMatter: "2.5",
        soilTexture: "Argileux",
        ownerId: "farmer"
    }
];

export const advisories = [
    {
        id: "a1",
        parcelId: "p1",
        title: "Application d'engrais",
        date: "2025-01-15",
        type: "fertilizer",
        description: "Appliquer de l'urée à 40kg/acre pour la croissance végétative.",
        confidence: "High",
        source: "Université agricole de Ludhiana"
    },
    {
        id: "a2",
        parcelId: "p1",
        title: "Alerte d'irrigation",
        date: "2025-01-20",
        type: "water",
        description: "Irrigation légère recommandée en raison de la période sèche.",
        confidence: "Medium",
        source: "Prévisions du service météo"
    },
    {
        id: "a3",
        parcelId: "p2",
        title: "Contrôle des parasites",
        date: "2025-01-18",
        type: "health",
        description: "Vérifiez l'infestation de pucerons dans la moutarde.",
        confidence: "High",
        source: "Conseil KVK"
    }
];
