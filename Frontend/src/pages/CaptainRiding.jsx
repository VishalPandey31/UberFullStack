
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

// Demo coordinates
const pickupCoords = [19.42, 72.82];
const destinationCoords = [19.45, 72.85];

function MapUpdater() {
  const map = useMap();

  React.useEffect(() => {
    map.fitBounds(
      [pickupCoords, destinationCoords],
      { padding: [60, 60] }
    );
  }, [map]);

  return null;
}

function CaptainRiding() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const ride = state?.ride || {};

  const pickup = ride.pickup || "Pickup Location";
  const destination = ride.destination || "Drop Location";

  const distance = ride.totalDistance || "8.5 KM";
  const duration = ride.duration || 15;
  const fare = ride.fare || 193.20;

  const completeRide = () => {
    alert("Ride completed successfully!");
    navigate("/captain-home");
  };

  return (
    <div className="h-[100dvh] w-full bg-[#151515] text-white flex flex-col overflow-hidden">

      {/* MAP - 68% */}

      <div className="h-[68%] relative shrink-0">

        <MapContainer
          center={pickupCoords}
          zoom={14}
          zoomControl={false}
          className="h-full w-full"
        >

          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />

          <MapUpdater />

          {/* PICKUP */}
          <Marker position={pickupCoords} />

          {/* DESTINATION */}
          <Marker position={destinationCoords} />

          {/* ROUTE */}
          <Polyline
            positions={[pickupCoords, destinationCoords]}
            pathOptions={{
              color: "#22c55e",
              weight: 5,
              opacity: 0.9
            }}
          />

        </MapContainer>

        {/* TOP HEADER */}

        <div className="absolute top-5 left-5 right-5 z-[1000] flex justify-between items-center">

          <button
            onClick={() => navigate(-1)}
            className="w-11 h-11 bg-white text-black rounded-full shadow-xl"
          >
            <i className="ri-arrow-left-line text-xl"></i>
          </button>

          <div className="bg-black/80 px-4 py-2 rounded-full text-sm font-bold">
            <span className="w-2 h-2 bg-green-500 rounded-full inline-block mr-2"></span>
            On Trip
          </div>

        </div>

        {/* MAP LABEL */}

        <div className="absolute bottom-5 left-5 z-[1000] bg-black/80 rounded-xl px-4 py-3">
          <p className="text-xs text-gray-400">CURRENT TRIP</p>
          <h2 className="font-bold text-lg">{distance}</h2>
        </div>

      </div>

      {/* BOTTOM PANEL - 32% */}

      <div className="h-[32%] bg-[#151515] rounded-t-[28px] -mt-5 relative z-[1001] overflow-y-auto p-5">

        {/* HANDLE */}

        <div className="w-12 h-1 bg-gray-600 rounded-full mx-auto mb-5"></div>

        {/* TRIP INFO */}

        <div className="flex justify-between items-center">

          <div>
            <p className="text-gray-400 text-xs">
              Passenger
            </p>

            <h2 className="text-lg font-bold">
              {ride.customer || ride.user?.fullname || "Harsh Patel"}
            </h2>
          </div>

          <div className="text-right">
            <h2 className="text-xl font-extrabold">
              ₹{Number(fare).toFixed(2)}
            </h2>

            <p className="text-gray-400 text-xs">
              Cash payment
            </p>
          </div>

        </div>

        {/* DISTANCE */}

        <div className="grid grid-cols-2 gap-3 mt-5">

          <div className="bg-[#252525] rounded-xl p-3">
            <i className="ri-route-line text-green-400 text-xl"></i>
            <h3 className="font-bold text-lg mt-1">{distance}</h3>
            <p className="text-gray-400 text-xs">Total Distance</p>
          </div>

          <div className="bg-[#252525] rounded-xl p-3">
            <i className="ri-time-line text-yellow-400 text-xl"></i>
            <h3 className="font-bold text-lg mt-1">{duration} min</h3>
            <p className="text-gray-400 text-xs">Estimated Time</p>
          </div>

        </div>
                   {/* OTP VERIFICATION */}
                   <div className="bg-[#202020] rounded-lg p-3 mt-3 border border-green-500/50">
                   
                     <div className="flex items-center gap-2 mb-1">
                       <span className="text-sm">🔐</span>
                       <h3 className="text-sm font-semibold">
                         Ride Verification OTP
                       </h3>
                     </div>
                   
                     <p className="text-[10px] text-gray-400 mb-2">
                       Enter customer's 4-digit OTP
                     </p>
                   
                     <input
                       type="text"
                       inputMode="numeric"
                       maxLength={4}
                       placeholder="Enter OTP"
                       className="w-full h-10 bg-[#151515] border border-gray-600 rounded-lg px-3 text-center text-base tracking-[6px] text-white outline-none focus:border-green-500"
                     />
                   
                   </div>

        {/* LOCATIONS */}

        <div className="mt-4 space-y-3">

          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            <p className="text-xs truncate">{pickup}</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-sm bg-red-500"></span>
            <p className="text-xs truncate">{destination}</p>
          </div>

        </div>

        {/* COMPLETE RIDE */}

        <button
          onClick={completeRide}
          className="w-full mt-5 mb-2 bg-green-500 hover:bg-green-600 text-white font-extrabold py-4 rounded-xl transition"
        >
          <i className="ri-checkbox-circle-line mr-2"></i>
          COMPLETE RIDE
        </button>

      </div>

    </div>
  );
}

export default CaptainRiding;
