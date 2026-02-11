
/**
 * Agri-Pulse Intelligent Logic Engine
 * Simulates a high-performance Agronomy Model by combining Real-time Weather 
 * feeds with Field-specific Soil Analytics.
 */

const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';
const GEO_API_URL = 'https://geocoding-api.open-meteo.com/v1/search';

export const getAIModelResponse = async (userInput, parcel) => {
    try {
        const query = userInput.toLowerCase();
        let weatherData = null;

        // 1. Fetch Real-time data if query is about weather or general status
        if (parcel.location && (query.includes('weather') || query.includes('rain') || query.includes('météo') || query.includes('pluie') || query.includes('how') || query.includes('comment') || query.includes('status') || query.includes('statut'))) {
            try {
                // Get Coordinates
                const geoRes = await fetch(`${GEO_API_URL}?name=${encodeURIComponent(parcel.location)}&count=1&language=fr&format=json`);
                const geoData = await geoRes.json();

                if (geoData.results && geoData.results[0]) {
                    const { latitude, longitude } = geoData.results[0];
                    // Get Weather
                    const weatherRes = await fetch(`${WEATHER_API_URL}?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=precipitation_sum&timezone=auto`);
                    weatherData = await weatherRes.json();
                }
            } catch (err) {
                console.error("Data Fetch Error:", err);
            }
        }

        // 2. Intelligence Logic (Expert System Reasoning)
        const ph = Number(parcel.soilPh || 7);
        const om = Number(parcel.soilOrganicMatter || 2.5);
        const texture = parcel.soilTexture || 'Loamy';
        const crop = parcel.crop || 'Crop';

        let analysis = "";

        if (query.includes('weather') || query.includes('météo') || query.includes('pluie') || query.includes('temps')) {
            if (weatherData) {
                const temp = weatherData.current_weather.temperature;
                const wind = weatherData.current_weather.windspeed;
                analysis = `J'ai accédé aux données satellites en direct pour ${parcel.location}. La température actuelle est de ${temp}°C avec des vents de ${wind} km/h. `;
                if (temp > 30) analysis += `Il fait assez chaud pour votre ${crop}, assurez-vous que l'irrigation est suffisante pour éviter le stress d'évapotranspiration. `;
                else if (temp < 10) analysis += `Les températures plus fraîches pourraient ralentir l'activité métabolique de votre ${crop}. `;
                else analysis += `Les conditions thermiques sont optimales pour la croissance. `;
            } else {
                analysis = `Je n'ai pas pu récupérer le flux satellite en direct pour ${parcel.location} pour le moment, mais historiquement, cette zone est stable. `;
            }
        }
        else if (query.includes('soil') || query.includes('sol') || query.includes('terre') || query.includes('ph') || query.includes('nutri')) {
            analysis = `Résultats du modèle prédictif du sol : Votre champ ${texture} a un pH de ${ph}. `;
            if (ph < 6.0) analysis += `Ce niveau d'acidité est critique ; il provoque probablement un blocage des nutriments (surtout le phosphore). Vous devriez appliquer 200kg/Ha de chaux agricole. `;
            else if (ph > 7.8) analysis += `L'alcalinité est élevée, ce qui peut provoquer une carence en fer. Envisagez d'utiliser des engrais à base d'ammonium. `;
            else analysis += `L'équilibre chimique est dans la "zone idéale" pour le ${crop}. `;

            if (om < 2.0) analysis += `L'ajout de ${om < 1.0 ? 'grandes' : 'modérées'} quantités de paillis organique est recommandé pour restaurer la biologie de la couche arable.`;
        }
        else if (query.includes('status') || query.includes('statut') || query.includes('état') || query.includes('how') || query.includes('comment') || query.includes('help') || query.includes('aide')) {
            analysis = `Vérification du statut pour ${parcel.name} : La culture est actuellement ${parcel.status}. `;
            if (weatherData && weatherData.daily.precipitation_sum[0] > 0) {
                analysis += `Avec la pluie prévue (${weatherData.daily.precipitation_sum[0]}mm), retardez toute application d'engrais prévue pour éviter le lessivage. `;
            }
            analysis += `Étant donné votre sol ${texture} et votre pH de ${ph}, votre objectif principal devrait être les macro-nutriments secondaires. `;
        }
        else {
            analysis = `J'ai analysé le champ de ${parcel.area} Ha de ${crop} à ${parcel.location}. La synergie entre votre sol ${texture} et le statut actuel ${parcel.status} suggère que nous sommes sur la bonne voie pour une bonne récolte. Avez-vous des questions sur des paramètres spécifiques ?`;
        }

        return analysis;
    } catch (error) {
        return "J'ai rencontré une erreur de traitement dans mon noyau neuronal. Veuillez réessayer ou vérifier votre connexion internet.";
    }
};
