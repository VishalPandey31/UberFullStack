
import React, { useEffect } from "react";
import {
    MapContainer,
    TileLayer,
    CircleMarker,
    Polyline,
    useMap
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

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

function FindingDriver({
  pickup,
    destination,
    pickupPosition,
    destinationPosition,
    selectedRide,
    onCancel,
    onDriverFound
}) {

   React.useEffect(() => {
    const timer = setTimeout(() => {
        onDriverFound?.();
    }, 5000);

    return () => clearTimeout(timer);
}, [onDriverFound]);



    return (
        <div className="fixed inset-0 z-[6000] bg-[#151515] text-white flex flex-col">

            {/* MAP */}
            <div className="relative h-[55%] shrink-0">

                <MapContainer
                    center={pickupPosition}
                    zoom={13}
                    zoomControl={false}
                    className="h-full w-full"
                >
                    <TileLayer
                        attribution="&copy; OpenStreetMap &copy; CARTO"
                        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    />

                    <CircleMarker
                        center={pickupPosition}
                        radius={9}
                        pathOptions={{
                            color: "white",
                            weight: 3,
                            fillColor: "#22c55e",
                            fillOpacity: 1
                        }}
                    />

                    <CircleMarker
                        center={destinationPosition}
                        radius={8}
                        pathOptions={{
                            color: "white",
                            weight: 2,
                            fillColor: "#ef4444",
                            fillOpacity: 1
                        }}
                    />

                    <Polyline
                        positions={[pickupPosition, destinationPosition]}
                        pathOptions={{
                            color: "#60a5fa",
                            weight: 4,
                            dashArray: "8 8"
                        }}
                    />

                    <FitBounds
                        pickupPosition={pickupPosition}
                        destinationPosition={destinationPosition}
                    />
                </MapContainer>

                {/* BACK BUTTON */}
                <button
                    onClick={onCancel}
                    className="absolute top-5 left-4 z-[1000] w-10 h-10 rounded-full bg-[#202020] text-xl"
                >
                    ←
                </button>

                {/* SEARCHING INDICATOR */}
                <div className="absolute top-5 right-4 z-[1000] bg-[#202020] rounded-full px-3 py-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-xs">Searching</span>
                </div>

            </div>

            {/* BOTTOM SEARCH PANEL */}
            <div className="flex-1 rounded-t-3xl -mt-5 relative z-[1000] bg-[#151515] px-5 pt-6 pb-5 flex flex-col">

                {/* LOADING ANIMATION */}
                <div className="flex items-center gap-4">

                    <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">

                        <div className="absolute inset-0 rounded-full bg-green-500/20 animate-ping"></div>

                        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>

                    </div>

                    <div>
                        <h2 className="text-xl font-bold">
                            Finding your driver
                        </h2>

                        <p className="text-xs text-gray-400 mt-1">
                            Connecting you with nearby drivers...
                        </p>
                    </div>

                </div>

                {/* PROGRESS BAR */}
                <div className="w-full h-1 bg-[#333] rounded-full mt-6 overflow-hidden">
                    <div className="h-full w-1/2 bg-green-500 rounded-full animate-pulse"></div>
                </div>

                {/* RIDE DETAILS */}
                <div className="mt-6 bg-[#202020] rounded-xl p-4">

                    <div className="flex items-center justify-between">

                        <div className="flex items-center gap-3">

                            <img
                                src={selectedRide?.img}
                                alt={selectedRide?.name}
                                className="w-20 h-14 object-contain"
                                onError={(e) => {
                                    e.target.style.display = "none";
                                }}
                            />

                            <div>
                                <h3 className="text-sm font-semibold">
                                    {selectedRide?.name}
                                </h3>

                                <p className="text-xs text-gray-400 mt-1">
                                    {selectedRide?.capacity} seats
                                </p>
                            </div>

                        </div>

                        <p className="text-sm font-semibold">
                            ₹{Number(selectedRide?.price || 0).toFixed(2)}
                        </p>

                    </div>

                    <div className="border-t border-[#333] mt-4 pt-4 space-y-3">

                        <div className="flex gap-3 items-center">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            <p className="text-xs text-gray-300 truncate">
                                {pickup}
                            </p>
                        </div>

                        <div className="flex gap-3 items-center">
                            <span className="w-2 h-2 rounded-sm bg-red-500"></span>
                            <p className="text-xs text-gray-300 truncate">
                                {destination}
                            </p>
                        </div>

                    </div>

                </div>

                <div className="mt-5 text-center">
                    <p className="text-xs text-gray-400">
                        Please wait while we find an available driver for you.
                    </p>
                </div>

                {/* CANCEL */}
                <button
                    onClick={onCancel}
                    className="mt-auto w-full h-12 rounded-lg border border-[#555] text-white font-semibold text-sm"
                >
                    Cancel request
                </button>

            </div>

        </div>
    );
}

export default FindingDriver;
