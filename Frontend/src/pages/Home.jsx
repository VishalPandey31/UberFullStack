
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import ConfirmedRide from "../components/ConfirmedRide";
import LocationSearchPanel from "./LocationSearchPanel";
import RideOptionsPanel from "../components/RideOptionsPanel";
import FindingDriver from "../components/FindingDriver";
import WaitingForDriver from "../components/WaitingForDriver";
// Custom marker icons
const pickupIcon = new L.DivIcon({
    html: `<div style="background:#22c55e;width:14px;height:14px;border:3px solid white;border-radius:50%;box-shadow:0 0 8px #000"></div>`,
    className: "",
    iconSize: [14, 14],
    iconAnchor: [7, 7]
});

const destinationIcon = new L.DivIcon({
    html: `<div style="background:#ef4444;width:14px;height:14px;border:3px solid white;border-radius:3px;box-shadow:0 0 8px #000"></div>`,
    className: "",
    iconSize: [14, 14],
    iconAnchor: [7, 7]
});

// Automatically adjust map to show both locations
function FitBounds({ pickupPosition, destinationPosition }) {
    const map = useMap();

    React.useEffect(() => {
        if (pickupPosition && destinationPosition) {
            map.fitBounds(
                [pickupPosition, destinationPosition],
                { padding: [50, 50] }
            );
        }
    }, [pickupPosition, destinationPosition, map]);

    return null;
}

const Home = () => {

    const [destination, setDestination] = useState("");
    const [pickup, setPickup] = useState("Nagindas");

    const [showRidePanel, setShowRidePanel] = useState(false);
    const [showRideOptions, setShowRideOptions] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    const [selectedRide, setSelectedRide] = useState(null);

    // Temporary coordinates.
    // Later replace these with API coordinates.
    const [pickupPosition, setPickupPosition] = useState([19.42, 72.82]);
    const [destinationPosition, setDestinationPosition] = useState([19.43, 72.85]);
const [showConfirmedRide, setShowConfirmedRide] = useState(false);
const [isConfirmingRide, setIsConfirmingRide] = useState(false);
const [showFindingDriver, setShowFindingDriver] = useState(false);
const [showWaitingForDriver, setShowWaitingForDriver] = useState(false);

{showConfirmedRide && (
    <ConfirmedRide
        pickup={pickup}
        destination={destination}
        selectedRide={selectedRide}
        onBack={() => setShowConfirmedRide(false)}
        onBook={() => {
            alert("Booking request submitted!");
        }}
    />
)}






    const handleSearchDestination = () => {

    if (!pickup.trim() || !destination.trim()) {
        return;
    }

    setShowRidePanel(false);
    setSelectedRide(null);
    setIsSearching(true);

    setTimeout(() => {
        setIsSearching(false);
        setShowRideOptions(true);
    }, 2000);

};

    const handleBack = () => {
        setShowRideOptions(false);
        setSelectedRide(null);
    };

    const handleConfirmRide = () => {
    if (!selectedRide) return;

    setShowRideOptions(false);
    setIsConfirmingRide(true);

    setTimeout(() => {
        setIsConfirmingRide(false);
        setShowConfirmedRide(true);
    }, 1500);
};

const handleBookIntercity = () => {
    setShowConfirmedRide(false);
    setShowFindingDriver(true);
};


    return (
        <div className="h-dvh w-full bg-[#151515] text-white overflow-hidden relative">

            {/* HOME MAP */}

            {!showRideOptions && (
                <div className="h-[68%] w-full">
                    <MapContainer
                        center={pickupPosition}
                        zoom={15}
                        zoomControl={false}
                        className="h-full w-full"
                    >
                        <TileLayer
                            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                        />
                    </MapContainer>
                </div>
            )}

            {/* HOME BOTTOM PANEL */}

            {!showRideOptions && (
                <div className="bg-[#151515] px-4 pt-5 h-[32%]">

                    <h3 className="text-sm font-semibold mb-5 text-center">
                        Set your destination
                    </h3>

                    <input
                        type="text"
                        placeholder="Where to?"
                        value={destination}
                        readOnly
                        onClick={() => setShowRidePanel(true)}
                        className="w-full h-12 bg-[#353535] rounded-md px-4 outline-none"
                    />

                    <button
                        onClick={() => setShowRidePanel(true)}
                        className="w-full h-12 mt-3 rounded-md bg-[#c7c7c7] text-black"
                    >
                        Search destination
                    </button>

                </div>
            )}

            {/* LOCATION SEARCH */}

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

            {/* RIDE OPTIONS */}

            {showRideOptions && (
               <RideOptionsPanel
                        pickup={pickup}
                        destination={destination}
                        pickupPosition={pickupPosition}
                        destinationPosition={destinationPosition}
                        selectedRide={selectedRide}
                        setSelectedRide={setSelectedRide}
                        onBack={() => setShowRideOptions(false)}
                        onConfirm={handleConfirmRide}
                    />
            )}

            {isConfirmingRide && (
    <div className="fixed inset-0 z-[4500] bg-[#151515] flex flex-col items-center justify-center">

        <div className="w-14 h-14 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>

        <h2 className="text-white text-lg font-semibold mt-6">
            Confirming your ride
        </h2>

        <p className="text-gray-400 text-xs mt-2">
            Preparing your ride details...
        </p>

    </div>
)}

           {showConfirmedRide && (
               <ConfirmedRide
               pickup={pickup}
               destination={destination}
               selectedRide={selectedRide}
               onBack={() => {
                   setShowConfirmedRide(false);
                   setShowRideOptions(true);
               }}
               onBook={handleBookIntercity}
           />
           )}

           {showFindingDriver && (
             <FindingDriver
              pickup={pickup}
              destination={destination}
              pickupPosition={pickupPosition}
              destinationPosition={destinationPosition}
              selectedRide={selectedRide}
              onCancel={() => {
                  setShowFindingDriver(false);
                  setShowConfirmedRide(true);
              }}
              onDriverFound={() => {
                  setShowFindingDriver(false);
                  setShowWaitingForDriver(true);
              }}
          />
)}

{showWaitingForDriver && (
    <WaitingForDriver
        pickup={pickup}
        destination={destination}
        pickupPosition={pickupPosition}
        destinationPosition={destinationPosition}
        selectedRide={selectedRide}
        onCancel={() => {
            setShowWaitingForDriver(false);
            setShowConfirmedRide(true);
        }}
    />
)}


        </div>
    );
};

export default Home;
