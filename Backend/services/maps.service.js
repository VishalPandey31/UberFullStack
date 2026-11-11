const captainModel = require('../models/captainModel');

const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN || process.env.GOOGLE_MAPS_API;

// 1. Get Coordinates (lat, lng) from Address
const getCoordinates = async (address) => {
    if (!address) {
        throw new Error('Address is required');
    }

    const apiKey = MAPBOX_TOKEN;
    if (!apiKey) {
        throw new Error('Mapbox API token is missing in .env');
    }

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?country=in&access_token=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data.features || data.features.length === 0) {
        throw new Error('Coordinates not found for given address');
    }

    const [lng, lat] = data.features[0].center;

    return {
        ltd: lat,
        lat: lat,
        lng: lng
    };
};

// 2. Get Distance and Time between two locations
const getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apiKey = MAPBOX_TOKEN;
    if (!apiKey) {
        throw new Error('Mapbox API token is missing in .env');
    }

    // If origin or destination are address strings, convert to coordinates
    let originCoords = origin;
    let destCoords = destination;

    if (typeof origin === 'string') {
        const coords = await getCoordinates(origin);
        originCoords = [coords.lng, coords.lat];
    } else if (origin.ltd || origin.lat) {
        originCoords = [origin.lng, origin.ltd || origin.lat];
    }

    if (typeof destination === 'string') {
        const coords = await getCoordinates(destination);
        destCoords = [coords.lng, coords.lat];
    } else if (destination.ltd || destination.lat) {
        destCoords = [destination.lng, destination.ltd || destination.lat];
    }

    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${originCoords[0]},${originCoords[1]};${destCoords[0]},${destCoords[1]}?access_token=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data.routes || data.routes.length === 0) {
        throw new Error('No route found between locations');
    }

    const route = data.routes[0];

    return {
        distance: {
            text: `${(route.distance / 1000).toFixed(1)} km`,
            value: Math.round(route.distance) // in meters
        },
        duration: {
            text: `${Math.round(route.duration / 60)} mins`,
            value: Math.round(route.duration) // in seconds
        },
        status: 'OK'
    };
};

// 3. Autocomplete / Location Suggestions
const getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('Input query is required');
    }

    const apiKey = MAPBOX_TOKEN;
    if (!apiKey) {
        throw new Error('Mapbox API token is missing in .env');
    }

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(input)}.json?country=in&proximity=72.8777,19.0760&access_token=${apiKey}`;

    const response = await fetch(url );
    const data = await response.json();

    if (!data.features) {
        return [];
    }

    return data.features.map(feature => feature.place_name);
};

// 4. Get Captains in Radius
const getCaptainsInTheRadius = async (ltd, lng, radius) => {
    // radius in kilometers
    // Earth radius is ~6371 km
    try {
        const captains = await captainModel.find({
            location: {
                $geoWithin: {
                    $centerSphere: [[lng, ltd], radius / 6371]
                }
            }
        });
        return captains;
    } catch (err) {
        // Fallback if 2dsphere index is not set
        const allCaptains = await captainModel.find({
            'location.latitude': { $exists: true },
            'location.longitude': { $exists: true }
        });

        return allCaptains.filter(captain => {
            const dLat = (captain.location.latitude - ltd) * Math.PI / 180;
            const dLng = (captain.location.longitude - lng) * Math.PI / 180;
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(ltd * Math.PI / 180) * Math.cos(captain.location.latitude * Math.PI / 180) *
                Math.sin(dLng / 2) * Math.sin(dLng / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distance = 6371 * c;
            return distance <= radius;
        });
    }
};

module.exports = {
    getCoordinates,
    getDistanceTime,
    getAutoCompleteSuggestions,
    getCaptainsInTheRadius
};

