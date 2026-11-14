import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const pickupCoords = [19.42, 72.82];
const destinationCoords = [19.45, 72.85];

function MapUpdater() {
  const map = useMap();
  React.useEffect(() => {
    map.fitBounds([pickupCoords, destinationCoords], { padding: [60, 60] });
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

  const [otp, setOtp] = useState("");
  const [isRideStarted, setIsRideStarted] = useState(ride.status === "ongoing");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Start Ride with OTP verification
  const handleStartRide = async () => {
    if (otp.length !== 4) {
      setErrorMessage("Please enter valid 4-digit OTP");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/rides/start-ride`,
        {
          rideId: ride._id,
          otp: otp
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.status === 200) {
        setIsRideStarted(true);
        alert("OTP Verified! Ride has started 🚗");
      }
    } catch (err) {
      console.error("Error starting ride:", err);
      setErrorMessage(err.response?.data?.message || "Invalid OTP! Ask passenger.");
    } finally {
      setLoading(false);
    }
  };

  const completeRide = () => {
    alert("Ride completed successfully!");
    navigate("/captain-home");
  };

  return (
    <div className="h-[100dvh] w-full bg-[#151515] text-white flex flex-col overflow-hidden">

      {/* MAP */}
      <div className="h-[55%] relative shrink-0">
        <MapContainer
          center={pickupCoords}
          zoom={14}
          zoomControl={false}
          className="h-full w-full"
        >
          <TileLayer
            url={`https://api.mapbox.com/styles/v1/mapbox/navigation-night-v1/tiles/256/{z}/{x}/{y}@2x?access_token=${import.meta.env.VITE_MAPBOX_TOKEN}`}
          />
          <MapUpdater />
          <Marker position={pickupCoords} />
          <Marker position={destinationCoords} />
          <Polyline
            positions={[pickupCoords, destinationCoords]}
            pathOptions={{ color: "#22c55e", weight: 5, opacity: 0.9 }}
          />
        </MapContainer>

        {/* TOP STATUS */}
        <div className="absolute top-5 left-5 right-5 z-[1000] flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="w-11 h-11 bg-white text-black rounded-full shadow-xl flex items-center justify-center font-bold"
          >
            ←
          </button>
          <div className="bg-black/80 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${isRideStarted ? "bg-green-500 animate-pulse" : "bg-yellow-400"}`}></span>
            {isRideStarted ? "Ride In Progress" : "Reached Pickup Spot"}
          </div>
        </div>
      </div>

      {/* BOTTOM CONTROL PANEL */}
      <div className="h-[45%] bg-[#1c1c1c] rounded-t-[28px] -mt-4 relative z-[1001] overflow-y-auto p-5 flex flex-col justify-between">
        
        {/* PASSENGER & FARE INFO */}
        <div>
          <div className="flex justify-between items-center border-b border-gray-700 pb-3">
            <div>
              <p className="text-gray-400 text-xs">Passenger</p>
              <h2 className="text-lg font-bold">
                {ride.user?.firstname ? `${ride.user.firstname} ${ride.user.lastname || ''}` : "Customer"}
              </h2>
            </div>
            <div className="text-right">
              <h2 className="text-xl font-extrabold text-green-400">
                ₹{Number(fare).toFixed(2)}
              </h2>
              <p className="text-gray-400 text-xs">Cash on arrival</p>
            </div>
          </div>

          <div className="mt-3 space-y-1">
            <p className="text-xs text-gray-300 truncate">🟢 <b>Pickup:</b> {pickup}</p>
            <p className="text-xs text-gray-300 truncate">🔴 <b>Drop:</b> {destination}</p>
          </div>
        </div>

        {/* STEP 1: ENTER OTP (If ride not started yet) */}
        {!isRideStarted ? (
          <div className="bg-[#282828] rounded-2xl p-4 my-2 border border-gray-700">
            <p className="text-xs text-yellow-400 font-bold mb-2">
              Ask passenger for 4-digit PIN:
            </p>
            
            <div className="flex gap-2">
              <input
                type="text"
                inputMode="numeric"
                maxLength={4}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="OTP"
                className="w-32 bg-white text-black font-extrabold text-center text-xl tracking-widest rounded-xl outline-none"
              />
              <button
                disabled={loading}
                onClick={handleStartRide}
                className="flex-1 bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition"
              >
                {loading ? "Verifying..." : "START RIDE"}
              </button>
            </div>
            {errorMessage && (
              <p className="text-xs text-red-400 mt-2 font-semibold">{errorMessage}</p>
            )}
          </div>
        ) : (
          /* STEP 2: COMPLETE RIDE (When ride is in progress) */
          <div className="mt-4">
            <button
              onClick={completeRide}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-extrabold py-4 rounded-xl transition"
            >
              FINISH / COMPLETE RIDE
            </button>
          </div>
        )}

      </div>

    </div>
  );
}

export default CaptainRiding;