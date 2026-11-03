
import React from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Polyline,
    useMap
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Pickup marker
const pickupIcon = new L.DivIcon({
    html: `<div style="background:#22c55e;width:14px;height:14px;border:3px solid white;border-radius:50%"></div>`,
    className: "",
    iconSize: [14, 14],
    iconAnchor: [7, 7]
});

// Destination marker
const destinationIcon = new L.DivIcon({
    html: `<div style="background:#ef4444;width:14px;height:14px;border:3px solid white;border-radius:3px"></div>`,
    className: "",
    iconSize: [14, 14],
    iconAnchor: [7, 7]
});

// Automatically fit map to both locations
function FitBounds({ pickupPosition, destinationPosition }) {
    const map = useMap();

    React.useEffect(() => {
        map.fitBounds(
            [pickupPosition, destinationPosition],
            { padding: [40, 40] }
        );
    }, [map, pickupPosition, destinationPosition]);

    return null;
}

function RideOptionsPanel({
    pickup,
    destination,
    pickupPosition,
    destinationPosition,
    selectedRide,
    setSelectedRide,
    onBack
}) {

    const rides = [
        {
            id: 1,
            name: "Auto Rikshaw",
            capacity: 3,
            time: "4 min",
            price: 219.95,
            img: "https://cdn.pixabay.com/photo/2016/03/31/21/15/rickshaw-1296278_1280.png"
        },
        {
            id: 2,
            name: "Go Sedan",
            capacity: 4,
            time: "6 min",
            price: 252.07,
            img: "https://i.pinimg.com/originals/93/c1/05/93c105244c0a3de81267a89cb13386f7.png"
        },
        {
            id: 3,
            name: "UberXL",
            capacity: 6,
            time: "5 min",
            price: 476.10,
            img: "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/UberXL_Black_v2.png"
        },
        {
            id: 4,
            name: "Premier XL",
            capacity: 6,
            time: "5 min",
            price: 684.83,
            img: "https://i.pinimg.com/originals/93/c1/05/93c105244c0a3de81267a89cb13386f7.png"
        }
    ];

    return (
        <div className="fixed inset-0 z-[4000] bg-[#151515] text-white flex flex-col">

            {/* MAP SECTION */}
            <div className="relative h-[42%] shrink-0">

                <MapContainer
                    center={pickupPosition}
                    zoom={14}
                    zoomControl={false}
                    className="h-full w-full"
                >

                    <TileLayer
                        attribution="&copy; OpenStreetMap &copy; CARTO"
                        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    />

                    <Marker
                        position={pickupPosition}
                        icon={pickupIcon}
                    />

                    <Marker
                        position={destinationPosition}
                        icon={destinationIcon}
                    />

                    {/* Temporary straight route */}
                    <Polyline
                        positions={[pickupPosition, destinationPosition]}
                        pathOptions={{
                            color: "#60a5fa",
                            weight: 5,
                            opacity: 0.9
                        }}
                    />

                    <FitBounds
                        pickupPosition={pickupPosition}
                        destinationPosition={destinationPosition}
                    />

                </MapContainer>

                {/* BACK BUTTON */}
                <button
                    onClick={onBack}
                    className="absolute top-4 left-4 z-[1000] bg-[#202020] w-10 h-10 rounded-full text-xl shadow-lg"
                >
                    ←
                </button>

                {/* LOCATION DETAILS */}
                <div className="absolute bottom-3 left-3 right-3 z-[1000] bg-[#151515]/90 backdrop-blur-md rounded-xl p-3">

                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        <p className="text-xs truncate">{pickup}</p>
                    </div>

                    <div className="border-l border-dashed border-gray-500 h-4 ml-[3px]"></div>

                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-sm bg-red-500"></span>
                        <p className="text-xs truncate">{destination}</p>
                    </div>

                </div>
            </div>

            {/* RIDE OPTIONS */}
            <div className="flex-1 overflow-y-auto px-3 pt-3 pb-2">

                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-sm font-semibold">
                        Choose a ride
                    </h2>

                    <span className="text-[10px] text-orange-400">
                        🔖 5% promotion applied
                    </span>
                </div>

                {/* RIDE CARDS */}
                <div className="space-y-2">

                    {rides.map((ride) => (
                        <div
                            key={ride.id}
                            onClick={() => setSelectedRide(ride)}
                            className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all
                                ${
                                    selectedRide?.id === ride.id
                                        ? "border-white bg-[#292929]"
                                        : "border-transparent bg-[#202020]"
                                }`}
                        >

                            {/* CAR IMAGE + DETAILS */}
                            <div className="flex items-center gap-3">

                                <img
                                    src={ride.img}
                                    alt={ride.name}
                                    className="w-24 h-16 object-contain"
                                    onError={(e) => {
                                        e.target.style.display = "none";
                                    }}
                                />

                                <div>
                                    <h3 className="text-xs font-semibold">
                                        {ride.name}
                                    </h3>

                                    <p className="text-[10px] text-gray-400 mt-1">
                                        {ride.time} away · {ride.capacity} seats
                                    </p>
                                </div>

                            </div>

                            {/* PRICE */}
                            <div className="text-right">
                                <p className="text-xs font-semibold">
                                    ₹{ride.price.toLocaleString("en-IN", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}
                                </p>
                            </div>

                        </div>
                    ))}

                </div>

                {/* PAYMENT */}
                <div className="flex items-center justify-between py-4 mt-2 border-t border-[#292929]">

                    <div className="flex items-center gap-3">
                        <span className="bg-[#b5d96b] text-black p-2 rounded-md">
                            ▣
                        </span>

                        <span className="text-xs">Cash</span>
                    </div>

                    <span className="text-xl text-gray-400">›</span>
                </div>

            </div>

            {/* FIXED BOTTOM BUTTON */}
            <div className="shrink-0 px-3 py-3 bg-[#151515] border-t border-[#292929]">

                <button
                    disabled={!selectedRide}
                    onClick={() => {
                        alert(`You selected ${selectedRide.name}`);
                    }}
                    className={`w-full h-12 rounded-md font-semibold text-sm
                        ${
                            selectedRide
                                ? "bg-[#c7c7c7] text-black"
                                : "bg-[#555555] text-gray-300 cursor-not-allowed"
                        }`}
                >
                    {selectedRide
                        ? `Choose ${selectedRide.name}`
                        : "Select a ride"
                    }
                </button>

            </div>

        </div>
    );
}

export default RideOptionsPanel;
