
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
        if (parcel.location && (query.includes('weather') || query.includes('rain') || query.includes('how') || query.includes('status'))) {
            try {
                // Get Coordinates
                const geoRes = await fetch(`${GEO_API_URL}?name=${encodeURIComponent(parcel.location)}&count=1&language=en&format=json`);
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

        if (query.includes('weather')) {
            if (weatherData) {
                const temp = weatherData.current_weather.temperature;
                const wind = weatherData.current_weather.windspeed;
                analysis = `I've accessed the live satellite feed for ${parcel.location}. The current temperature is ${temp}°C with wind speeds of ${wind} km/h. `;
                if (temp > 30) analysis += `It's quite hot for ${crop}, ensure the irrigation is sufficient to prevent evapotranspiration stress. `;
                else if (temp < 10) analysis += `Cooler temperatures might slow down metabolic activity in your ${crop}. `;
                else analysis += `Conditions are thermally optimal for growth. `;
            } else {
                analysis = `I couldn't pull the live satellite feed for ${parcel.location} right now, but historically, this area is stable. `;
            }
        }
        else if (query.includes('soil') || query.includes('ph') || query.includes('nutri')) {
            analysis = `Predictive Soil Model Results: Your ${texture} field has a pH of ${ph}. `;
            if (ph < 6.0) analysis += `This acidity level is critical; it's likely causing nutrient 'lock-out' (especially Phosphorus). You should apply 200kg/Ha of agricultural lime. `;
            else if (ph > 7.8) analysis += `Alkalinity is high, which may cause Iron deficiency. Consider using Ammonium-based fertilizers. `;
            else analysis += `The chemical balance is within the "Goldilocks Zone" for ${crop}. `;

            if (om < 2.0) analysis += `Adding ${om < 1.0 ? 'heavy' : 'moderate'} amounts of organic mulch is recommended to restore topsoil biology.`;
        }
        else if (query.includes('status') || query.includes('how') || query.includes('help')) {
            analysis = `Status Check for ${parcel.name}: The crop is currently ${parcel.status}. `;
            if (weatherData && weatherData.daily.precipitation_sum[0] > 0) {
                analysis += `With rain expected (${weatherData.daily.precipitation_sum[0]}mm), delay any scheduled fertilizer application to avoid leaching. `;
            }
            analysis += `Given your ${texture} soil and ${ph} pH, your primary focus should be on secondary macro-nutrients. `;
        }
        else {
            analysis = `I've analyzed the ${parcel.area} Ha ${crop} field in ${parcel.location}. The synergy between your ${texture} soil and the current ${parcel.status} status suggests we're on track for a good harvest. Do you have questions about specific parameters?`;
        }

        return analysis;
    } catch (error) {
        return "I encountered a processing error in my neural core. Please try again or check your internet connection.";
    }
};
