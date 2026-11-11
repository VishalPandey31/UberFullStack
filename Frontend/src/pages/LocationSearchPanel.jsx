import React, { useState, useEffect } from "react";
import axios from "axios";

function LocationSearchPanel({
    showRidePanel,
    setShowRidePanel,
    pickup,
    setPickup,
    destination,
    setDestination,
    onSearch
}) {
    const defaultPlaces = [
        ["Bandra Terminus", "Navpada, Bandra East, Mumbai, Maharashtra"],
        ["Terminal 2", "Navpada, Vile Parle East, Andheri East, Mumbai"],
        ["BOM Terminal 2", "Navpada, Vile Parle East, Mumbai"],
        ["Chhatrapati Shivaji Maharaj International Airport Mumbai", "Mumbai, Maharashtra"],
        ["Maharashtra", "Mumbai"]
    ];

    const [activeField, setActiveField] = useState("destination"); // 'pickup' or 'destination'
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch dynamic suggestions when user types
    useEffect(() => {
        const query = activeField === "pickup" ? pickup : destination;

        if (!query || query.trim().length < 3) {
            setSuggestions([]);
            setIsLoading(false);
            return;
        }

        const timer = setTimeout(async () => {
            try {
                setIsLoading(true);
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/api/maps/getAutoCompleteSuggestions`,
                    {
                        params: { input: query },
                        headers: token ? { Authorization: `Bearer ${token}` } : {}
                    }
                );

                if (response.data && response.data.suggestions) {
                    setSuggestions(response.data.suggestions);
                } else {
                    setSuggestions([]);
                }
            } catch (error) {
                console.error("Error fetching location suggestions:", error);
                setSuggestions([]);
            } finally {
                setIsLoading(false);
            }
        }, 300); // 300ms debounce

        return () => clearTimeout(timer);
    }, [pickup, destination, activeField]);

    // Handle when user clicks a suggestion
const handleSelectSuggestion = (place) => {
    const placeName = typeof place === "string" ? place : `${place[0]}, ${place[1]}`;

        if (activeField === "pickup") {
            setPickup(placeName);
            setActiveField("destination");
        } else {
            setDestination(placeName);
        }
    };

    const handleSearchClick = () => {
        if (!pickup.trim() || !destination.trim()) return;
        setShowRidePanel(false);
        onSearch();
    };

    return (
        <div
            className={`fixed inset-0 z-[2000] text-white overflow-y-auto
            transition-transform duration-500 ease-in-out
            ${showRidePanel ? "translate-y-0" : "translate-y-full pointer-events-none"}`}
        >
            {/* Top Map Strip */}
            <div className="h-[52px]"></div>

            <div className="px-6 pt-5 bg-[#151515] min-h-[calc(100%-52px)] flex flex-col justify-between">
                <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <button
                            onClick={() => setShowRidePanel(false)}
                            className="text-2xl hover:text-gray-300"
                        >
                            ←
                        </button>
                        <h2 className="text-sm font-semibold mr-20">
                            Plan your ride
                        </h2>
                    </div>

                    {/* Pickup Options */}
                    <div className="flex gap-2 mb-3">
                        <button className="bg-[#292929] rounded-full px-3 py-2 text-xs">
                            ◷ Pickup now ⌄
                        </button>
                        <button className="bg-[#292929] rounded-full px-3 py-2 text-xs">
                            ♟ For me ⌄
                        </button>
                    </div>

                    {/* Pickup and Destination Inputs */}
                    <div className="border-2 border-[#353535] rounded-xl p-3 bg-[#1c1c1c]">
                        <div
                            className={`flex items-center gap-3 h-9 border-b border-[#353535] px-1 rounded transition-colors ${
                                activeField === "pickup" ? "bg-[#252525]" : ""
                            }`}
                        >
                            <div className="h-3 w-3 rounded-full border-[3px] border-green-500 shrink-0"></div>
                             <input
                             type="text"
                             placeholder="Enter pickup location"
                             value={pickup}
                             onFocus={() => setActiveField("pickup")}
                             onClick={() => setActiveField("pickup")}
                             onChange={(e) => {
                                 setPickup(e.target.value);
                                 setActiveField("pickup");
                             }}
                             className="bg-transparent outline-none text-xs w-full text-white placeholder-gray-500"
                         />
                        </div>

                        <div
                            className={`flex items-center gap-3 h-9 px-1 rounded transition-colors ${
                                activeField === "destination" ? "bg-[#252525]" : ""
                            }`}
                        >
                            <div className="h-3 w-3 rounded-sm bg-red-500 shrink-0"></div>
                           <input
                              type="text"
                              placeholder="Where to?"
                              value={destination}
                              onFocus={() => setActiveField("destination")}
                              onClick={() => setActiveField("destination")}
                              onChange={(e) => {
                                  setDestination(e.target.value);
                                  setActiveField("destination");
                              }}
                              className="bg-transparent outline-none text-xs w-full text-white placeholder-gray-500"
                          />
                        </div>
                    </div>

                    {/* Saved Places Badges */}
                    <div className="flex gap-2 mt-3 mb-3">
                        <button className="bg-[#202020] rounded-full px-3 py-2 text-[10px] hover:bg-[#2c2c2c]">
                            🏠 Add Home
                        </button>
                        <button className="bg-[#202020] rounded-full px-3 py-2 text-[10px] hover:bg-[#2c2c2c]">
                            💼 Add Work
                        </button>
                        <button className="bg-[#202020] rounded-full px-3 py-2 text-[10px] hover:bg-[#2c2c2c]">
                            ☆ Saved places
                        </button>
                    </div>

                    {/* SUGGESTIONS LIST */}
                    <div className="mt-4">
                        {isLoading && (
                            <div className="flex items-center gap-2 py-3 text-xs text-gray-400">
                                <div className="w-4 h-4 border-2 border-gray-500 border-t-white rounded-full animate-spin"></div>
                                <span>Searching locations...</span>
                            </div>
                        )}

                        {/* Dynamic Suggestions from Backend */}
                        {suggestions.length > 0 ? (
                            suggestions.map((place, index) => {
                                const parts = typeof place === "string" ? place.split(",") : [place];
                                const mainTitle = parts[0];
                                const subTitle = parts.slice(1).join(",").trim();

                                return (
                                    <div
                                        key={index}
                                        onClick={() => handleSelectSuggestion(place)}
                                        className="flex items-start gap-3 py-3 border-b border-[#292929] cursor-pointer hover:bg-[#202020] px-2 rounded-lg transition-colors"
                                    >
                                        <span className="text-gray-400 bg-[#292929] p-2 rounded-full text-xs mt-0.5 shrink-0">
                                            📍
                                        </span>
                                        <div className="overflow-hidden">
                                            <h4 className="text-[12px] font-medium text-white truncate">
                                                {mainTitle}
                                            </h4>
                                            {subTitle && (
                                                <p className="text-[10px] text-gray-400 mt-0.5 truncate">
                                                    {subTitle}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        ) : !isLoading && (
                            /* Default / Recent places when query is empty or less than 3 chars */
                            defaultPlaces.map((place, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleSelectSuggestion(place)}
                                    className="flex items-start gap-3 py-3 border-b border-[#292929] cursor-pointer hover:bg-[#202020] px-2 rounded-lg transition-colors"
                                >
                                    <span className="text-gray-400 bg-[#292929] p-2 rounded-full text-xs mt-0.5 shrink-0">
                                        ◷
                                    </span>
                                    <div>
                                        <h4 className="text-[12px] font-medium text-white">
                                            {place[0]}
                                        </h4>
                                        <p className="text-[10px] text-gray-400 mt-0.5">
                                            {place[1]}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* SEARCH RIDE BUTTON */}
                {pickup.trim() && destination.trim() && (
                    <div className="py-4 mt-2">
                        <button
                            onClick={handleSearchClick}
                            className="w-full py-3 bg-white text-black font-semibold rounded-xl text-sm hover:bg-gray-200 transition-colors shadow-lg active:scale-[0.99]"
                        >
                            Find Available Rides
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LocationSearchPanel;
