
import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import LocationSearchPanel from './LocationSearchPanel'
import RideOptionsPanel from "./RideOptionsPanel";
const Home = () => {

    const [destination, setDestination] = useState("");
    const [showRidePanel, setShowRidePanel] = useState(false);
const [pickup, setPickup] = useState("Nagindas");

const [isSearching, setIsSearching] = useState(false);

const [showRideOptions, setShowRideOptions] = useState(false);

const [selectedRide, setSelectedRide] = useState(null);
    const position = [19.42, 72.82];



const handleSearchDestination = () => {

    if (!pickup.trim() || !destination.trim()) {
        alert("Please select pickup and destination");
        return;
    }

    setIsSearching(true);
    setShowRidePanel(false);

    setTimeout(() => {
        setIsSearching(false);
        setShowRideOptions(true);
    }, 2000);

};
 // Back to home
    const handleBack = () => {
        setShowRideOptions(false);
        setSelectedRide(null);
    };

    return (
        <div className="h-dvh w-full bg-[#151515] text-white flex flex-col overflow-hidden relative">

            {/* Map Section */}
            <div className="relative h-[68%] w-full shrink-0">

                <MapContainer
                    center={position}
                    zoom={15}
                    zoomControl={false}
                    className="h-full w-full"
                >
                    <TileLayer
                        attribution="&copy; OpenStreetMap &copy; CARTO"
                        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    />
                </MapContainer>

                {/* Center Pin */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[500] pointer-events-none">
                    <div className="h-4 w-4 rounded-full bg-white border-4 border-gray-300"></div>
                </div>

            </div>

            {/* Home Bottom Panel */}
            <div className="flex-1 bg-[#151515] px-3 pt-5 flex flex-col items-center">

                <h3 className="text-sm font-semibold mb-5">
                    Set your destination
                </h3>

                {/* Destination Input */}
                <input
                    type="text"
                    placeholder="Where to?"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    onClick={() => setShowRidePanel(true)}
                    readOnly
                    className="w-full h-12 bg-[#353535] rounded-md px-4 text-white outline-none cursor-pointer"
                />

                <button
                  onClick={() => setShowRidePanel(true)}
                  className="w-full h-12 mt-3 rounded-md bg-[#c7c7c7] text-black"
              >
                  Search destination
              </button>

            </div>


          
{/* PLAN YOUR RIDE PANEL */}

          <LocationSearchPanel
                showRidePanel={showRidePanel}
                setShowRidePanel={setShowRidePanel}
                pickup={pickup}
                setPickup={setPickup}
                destination={destination}
                setDestination={setDestination}
                onSearch={handleSearchDestination}
            />



{/* LOADING SCREEN */}

            {isSearching && (
                <div className="fixed inset-0 z-[3000] bg-[#151515] flex flex-col items-center justify-center">

                    <div className="h-12 w-12 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>

                    <h2 className="mt-5 text-lg font-semibold">
                        Finding rides...
                    </h2>

                    <p className="text-gray-400 text-xs mt-2">
                        Searching available rides for you
                    </p>

                </div>
            )}


            {/* RIDE OPTIONS PANEL */}

            {showRideOptions && (
                <RideOptionsPanel
                    pickup={pickup}
                    destination={destination}
                    selectedRide={selectedRide}
                    setSelectedRide={setSelectedRide}
                    onBack={handleBack}
                />
            )}

        </div>
    );
};

export default Home;
