import React, { useState } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Polyline,
    CircleMarker,
    useMap
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Driver car marker icon
const driverIcon = new L.DivIcon({
    html: `<div style="font-size:25px;background:white;border-radius:50%;width:38px;height:38px;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px #000">🚘</div>`,
    className: "",
    iconSize: [38, 38],
    iconAnchor: [19, 19]
});

// Map automatically adjusts to driver and pickup
function FitBounds({ driverPosition, pickupPosition }) {
    const map = useMap();

    React.useEffect(() => {
        if (driverPosition && pickupPosition) {
            map.fitBounds(
                [driverPosition, pickupPosition],
                { padding: [50, 50] }
            );
        }
    }, [map, driverPosition, pickupPosition]);

    return null;
}

function WaitingForDriver({
    ride, // 👈 Real ride data from parent
    pickup,
    destination,
    pickupPosition = [19.42, 72.82],
    destinationPosition = [19.43, 72.85],
    selectedRide,
    onCancel
}) {
    const [message, setMessage] = useState("");

    // Dynamic details from accepted captain
    const captainName = ride?.captain 
        ? `${ride.captain.firstname} ${ride.captain.lastname || ''}`.trim()
        : "Captain Assigned";

    const vehiclePlate = ride?.captain?.vehicle?.plate || "Vehicle No.";
    const vehicleInfo = ride?.captain?.vehicle 
        ? `${ride.captain.vehicle.color} ${ride.captain.vehicle.vehicletype}` 
        : "Cab";
        
    const otp = ride?.otp || "----";

    // Driver location near pickup
    const driverPosition = [
        pickupPosition[0] + 0.003,
        pickupPosition[1] + 0.003
    ];

    const handleSendMessage = () => {
        if (!message.trim()) return;
        alert("Message sent: " + message);
        setMessage("");
    };

    return (
        <div className="fixed inset-0 z-[7000] bg-[#151515] text-white">

            {/* MAP SECTION */}
            <div className="absolute inset-0">
                <MapContainer
                    center={pickupPosition}
                    zoom={15}
                    zoomControl={false}
                    className="h-full w-full"
                >
                    <TileLayer
                        url={`https://api.mapbox.com/styles/v1/mapbox/navigation-night-v1/tiles/256/{z}/{x}/{y}@2x?access_token=${import.meta.env.VITE_MAPBOX_TOKEN}`}
                    />

                    {/* Pickup marker */}
                    <CircleMarker
                        center={pickupPosition}
                        radius={9}
                        pathOptions={{
                            color: "white",
                            weight: 3,
                            fillColor: "#2563eb",
                            fillOpacity: 1
                        }}
                    />

                    {/* Driver marker */}
                    <Marker
                        position={driverPosition}
                        icon={driverIcon}
                    />

                    {/* Driver to pickup route */}
                    <Polyline
                        positions={[driverPosition, pickupPosition]}
                        pathOptions={{
                            color: "#222222",
                            weight: 5,
                            opacity: 0.9
                        }}
                    />

                    <FitBounds
                        driverPosition={driverPosition}
                        pickupPosition={pickupPosition}
                    />
                </MapContainer>

                {/* BACK BUTTON */}
                <button
                    onClick={onCancel}
                    className="absolute top-5 left-4 z-[1000] bg-white text-black w-10 h-10 rounded-full shadow-lg text-xl flex items-center justify-center font-bold"
                >
                    ←
                </button>

                {/* PICKUP SPOT LABEL */}
                <div className="absolute top-[25%] left-[35%] z-[1000] bg-white text-black rounded-lg px-3 py-2 shadow-lg text-xs font-semibold">
                    📍 Pickup spot
                </div>

                {/* DISTANCE LABEL */}
                <div className="absolute top-[38%] left-[15%] z-[1000] bg-white text-black rounded-lg px-3 py-2 shadow-lg text-xs font-semibold">
                    1 km away
                </div>

                {/* MAP CONTROLS */}
                <div className="absolute right-4 bottom-[46%] z-[1000] flex flex-col gap-2">
                    <button
                        onClick={() => alert("Map location")}
                        className="w-10 h-10 bg-white text-black rounded-full shadow-lg flex items-center justify-center text-lg"
                    >
                        ⦿
                    </button>
                    <button
                        onClick={() => alert("Safety tools")}
                        className="w-10 h-10 bg-white text-blue-600 rounded-full shadow-lg flex items-center justify-center text-lg"
                    >
                        ◉
                    </button>
                </div>
            </div>

            {/* BOTTOM DRIVER PANEL */}
            <div className="absolute bottom-0 left-0 right-0 z-[1100] bg-white text-black rounded-t-2xl shadow-2xl">

                {/* PICKUP INFO */}
                <div className="px-4 pt-4 pb-3 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="flex-1 pr-3">
                            <h2 className="text-sm font-bold">
                                Meet at your pickup spot
                            </h2>
                            <p className="text-xs font-semibold mt-1 text-gray-700 truncate">
                                {pickup}
                            </p>
                            <p className="text-blue-600 text-xs mt-1">
                                🚶 2 min walk
                            </p>
                        </div>

                        <div className="bg-black text-white w-12 h-12 rounded-lg flex flex-col items-center justify-center">
                            <span className="text-lg font-bold leading-none">
                                5
                            </span>
                            <span className="text-[10px]">
                                min
                            </span>
                        </div>
                    </div>
                </div>

                {/* DRIVER DETAILS */}
                <div className="px-4 py-4">
                    <div className="flex items-center justify-between gap-3">

                        {/* DRIVER AVATAR */}
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 shrink-0 border border-gray-300">
                            <img
                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(captainName)}&background=0D8ABC&color=fff&bold=true`}
                                alt="Driver"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* VEHICLE IMAGE */}
                        <div className="flex-1 min-w-0">
                            <img
                                src={selectedRide?.img || "https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"}
                                alt={selectedRide?.name || "Vehicle"}
                                className="w-full h-14 object-contain"
                                onError={(e) => {
                                    e.target.style.display = "none";
                                }}
                            />
                        </div>

                        {/* DRIVER INFO (DYNAMIC) */}
                        <div className="text-right shrink-0">
                            <p className="text-xs font-semibold text-gray-800">
                                {captainName}
                            </p>

                            <h3 className="text-sm font-black tracking-wider text-black">
                                {vehiclePlate}
                            </h3>

                            <p className="text-[11px] text-gray-500 capitalize">
                                {vehicleInfo}
                            </p>
                        </div>
                    </div>

                    {/* DYNAMIC OTP DISPLAY BANNER */}
                    <div className="mt-3 bg-gray-100 rounded-xl p-2.5 flex items-center justify-between border border-gray-200">
                        <span className="text-xs font-bold text-gray-600">Share OTP with Captain:</span>
                        <span className="text-base font-black tracking-widest bg-black text-white px-3 py-0.5 rounded-lg">
                            {otp}
                        </span>
                    </div>

                    <p className="text-[10px] text-green-600 font-semibold mt-2">
                        ⭐ 4.9 · Driver accepted your ride and is on the way!
                    </p>

                    {/* MESSAGE + CALL + SAFETY */}
                    <div className="flex items-center gap-2 mt-3">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleSendMessage();
                            }}
                            placeholder="Send a message"
                            className="flex-1 min-w-0 bg-gray-100 border border-gray-200 rounded-full px-4 py-2.5 text-xs outline-none text-black"
                        />

                        <button
                            onClick={handleSendMessage}
                            className="w-9 h-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-black text-sm"
                        >
                            ➤
                        </button>

                        <button
                            onClick={() => alert("Calling driver...")}
                            className="w-9 h-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-black text-sm"
                        >
                            ☎
                        </button>

                        <button
                            onClick={() => alert("Safety options")}
                            className="w-9 h-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-blue-600 text-sm"
                        >
                            ✳
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WaitingForDriver;