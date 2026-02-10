
export const parcels = [
    {
        id: "p1",
        name: "Riverside Plot",
        area: "2.4 Hectares",
        crop: "Wheat",
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
        soilTexture: "Loamy",
        ownerId: "farmer"
    },
    {
        id: "p2",
        name: "Hilltop Field",
        area: "1.8 Hectares",
        crop: "Mustard",
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
        soilTexture: "Sandy",
        ownerId: "farmer"
    },
    {
        id: "p3",
        name: "Eastern Patch",
        area: "3.1 Hectares",
        crop: "Sugarcane",
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
        soilTexture: "Clay",
        ownerId: "farmer"
    }
];

export const advisories = [
    {
        id: "a1",
        parcelId: "p1",
        title: "Fertilizer Application",
        date: "2025-01-15",
        type: "fertilizer",
        description: "Apply Urea at 40kg/acre for vegetative growth.",
        confidence: "High",
        source: "Agricultural University Ludhiana"
    },
    {
        id: "a2",
        parcelId: "p1",
        title: "Irrigation Alert",
        date: "2025-01-20",
        type: "water",
        description: "Light irrigation recommended due to dry spell.",
        confidence: "Medium",
        source: "Weather Dept Forecast"
    },
    {
        id: "a3",
        parcelId: "p2",
        title: "Pest Check",
        date: "2025-01-18",
        type: "health",
        description: "Check for Aphids infestation in Mustard.",
        confidence: "High",
        source: "KVK Advisory"
    }
];
