
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMap
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import RidePopup from "../components/RidePopup";

const DEFAULT_LOCATION = [19.42, 72.82];

// Map updater
function MapUpdater({ location }) {
  const map = useMap();

  useEffect(() => {
    if (location) {
      map.flyTo(location, 16, { duration: 1.5 });
    }
  }, [location, map]);

  return null;
}

function CaptainHome({ socket = null }) {

  const navigate = useNavigate();

  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [isOnline, setIsOnline] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");

  const [incomingRide, setIncomingRide] = useState(null);
  const [showRidePopup, setShowRidePopup] = useState(false);
  const [acceptingRide, setAcceptingRide] = useState(false);

  const [stats, setStats] = useState({
    earnings: 255.90,
    hours: 10.2,
    distance: 45.8,
    trips: 12
  });

  // Demo ride
  const testRide = {
    _id: "ride123",
    customer: "Harsh Patel",
    customerImage: "",
    pickup: "562/11-A, Kankariya Talab, Bhopal",
    destination: "Railway Station, Bhopal",
    fare: 193.20,
    distance: 2.2,
    duration: 15,
    paymentMethod: "Cash",
    totalDistance: "8.5 KM"
  };

  // Listen for incoming rides
  useEffect(() => {

    if (!socket) return;

    const handleNewRide = (ride) => {
      setIncomingRide(ride);
      setShowRidePopup(true);
    };

    socket.on("new-ride", handleNewRide);

    return () => {
      socket.off("new-ride", handleNewRide);
    };

  }, [socket]);

  // GPS tracking
  useEffect(() => {

    if (!isOnline) return;
    if (!navigator.geolocation) return;

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLocation([
          position.coords.latitude,
          position.coords.longitude
        ]);
      },
      (error) => {
        console.error("GPS Error:", error.message);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 3000,
        timeout: 15000
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };

  }, [isOnline]);

  // Current location
  const getCurrentLocation = () => {

    if (!navigator.geolocation) {
      alert("GPS not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation([
          position.coords.latitude,
          position.coords.longitude
        ]);
      },
      () => alert("Unable to access location")
    );

  };

  // Accept ride and navigate to CaptainRiding
  const handleAcceptRide = (ride) => {

    if (acceptingRide) return;

    navigate("/captain-riding", {
      state: { ride }
    });

    setIncomingRide(null);
    setShowRidePopup(false);

  };

  // Ignore ride
  const handleIgnoreRide = (ride) => {

    if (socket) {
      socket.emit("reject-ride", {
        rideId: ride._id
      });
    }

    setIncomingRide(null);
    setShowRidePopup(false);

  };

  // Online / Offline
  const toggleOnline = () => {

    const nextStatus = !isOnline;

    setIsOnline(nextStatus);

    if (socket) {
      socket.emit("update-status", {
        isOnline: nextStatus
      });
    }

  };

  // Navigation tabs
  const tabs = [
    { name: "Home", icon: "ri-home-5-line" },
    { name: "Earnings", icon: "ri-wallet-3-line" },
    { name: "Activity", icon: "ri-history-line" },
    { name: "Account", icon: "ri-user-3-line" }
  ];

  const hour = new Date().getHours();

  const greeting =
    hour < 12 ? "Good morning" :
    hour < 17 ? "Good afternoon" :
    "Good evening";

  return (

    <div className="h-[100dvh] w-full bg-[#151515] text-white flex flex-col overflow-hidden">

      {/* MAP */}

      <div className="h-[55%] min-h-[250px] relative shrink-0">

        <MapContainer
          center={DEFAULT_LOCATION}
          zoom={15}
          zoomControl={false}
          className="h-full w-full"
        >

          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />

          <MapUpdater location={location} />

          <Marker position={location} />

        </MapContainer>

        {/* TOP HEADER */}

        <div className="absolute top-5 left-5 right-5 z-[1000] flex justify-between items-center">

          <button
            onClick={() => setActiveTab("Account")}
            className="w-12 h-12 rounded-full bg-[#202020] flex items-center justify-center shadow-xl"
          >
            <i className="ri-menu-line text-2xl"></i>
          </button>

          <button
            onClick={toggleOnline}
            className="px-5 py-3 rounded-full bg-[#202020] flex items-center gap-2 font-bold shadow-xl"
          >

            <span className={`w-3 h-3 rounded-full ${
              isOnline ? "bg-green-500 animate-pulse" : "bg-red-500"
            }`} />

            {isOnline ? "Online" : "Offline"}

            <i className="ri-toggle-line text-xl"></i>

          </button>

        </div>

        {/* GPS BUTTON */}

        <button
          onClick={getCurrentLocation}
          className="absolute bottom-8 right-5 z-[1000] w-12 h-12 rounded-full bg-white text-black shadow-xl text-2xl"
        >
          <i className="ri-focus-3-line"></i>
        </button>

        {/* TEST RIDE BUTTON */}

        {!incomingRide && (
          <button
            onClick={() => {
              setIncomingRide(testRide);
              setShowRidePopup(true);
            }}
            className="absolute bottom-8 left-5 z-[1000] bg-yellow-400 text-black px-4 py-3 rounded-xl font-bold shadow-xl text-xs"
          >
            <i className="ri-notification-3-line mr-2"></i>
            TEST NEW RIDE
          </button>
        )}

      </div>

      {/* DASHBOARD */}

      <div className="flex-1 min-h-0 overflow-y-auto bg-[#151515] rounded-t-[28px] -mt-5 relative z-[1001]">

        <div className="p-5 pb-8">

          <div className="w-12 h-1 bg-gray-600 rounded-full mx-auto mb-6"></div>

          {/* PROFILE */}

          <div className="flex justify-between items-center">

            <div className="flex items-center gap-3">

              <div className="w-14 h-14 rounded-full bg-[#303030] flex items-center justify-center text-2xl">
                <i className="ri-user-3-fill"></i>
              </div>

              <div>
                <p className="text-gray-400 text-sm">
                  {greeting},
                </p>

                <h2 className="text-xl font-bold">
                  Ashish Sharma
                </h2>

                <p className="text-green-500 text-xs mt-1">
                  {isOnline ? "Available for rides" : "Currently offline"}
                </p>
              </div>

            </div>

            <div className="text-right">
              <h2 className="text-2xl font-bold">
                ₹{stats.earnings.toFixed(2)}
              </h2>

              <p className="text-gray-400 text-xs">
                Today's Earnings
              </p>
            </div>

          </div>

          {/* STATS */}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-7">

            {[
              {
                icon: "ri-timer-2-line",
                value: stats.hours,
                label: "Hours Online"
              },
              {
                icon: "ri-dashboard-3-line",
                value: stats.distance,
                label: "Km Travelled"
              },
              {
                icon: "ri-booklet-line",
                value: stats.trips,
                label: "Trips Completed"
              },
              {
                icon: "ri-star-line",
                value: "4.8",
                label: "Your Rating"
              }
            ].map((item) => (

              <div
                key={item.label}
                className="bg-[#252525] rounded-2xl p-4"
              >

                <i className={`${item.icon} text-2xl text-yellow-400`}></i>

                <h3 className="text-2xl font-bold mt-3">
                  {item.value}
                </h3>

                <p className="text-gray-400 text-xs mt-1">
                  {item.label}
                </p>

              </div>

            ))}

          </div>

          {/* STATUS */}

          <div className="bg-[#252525] rounded-2xl p-5 mt-5">

            <h3 className="font-bold">
              Driving Status
            </h3>

            <p className="text-gray-400 text-xs mt-2">
              {isOnline
                ? "You are ready to receive ride requests."
                : "Go online to start receiving rides."}
            </p>

            <button
              onClick={toggleOnline}
              className={`w-full mt-5 py-3 rounded-xl font-bold ${
                isOnline
                  ? "bg-red-500"
                  : "bg-yellow-400 text-black"
              }`}
            >
              {isOnline ? "GO OFFLINE" : "GO ONLINE"}
            </button>

          </div>

          {/* QUICK ACTIONS */}

          <h3 className="font-bold text-lg mt-7 mb-4">
            Quick Actions
          </h3>

          <div className="grid grid-cols-3 gap-3">

            {tabs.slice(1).map((tab) => (

              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className="bg-[#252525] rounded-xl p-4 flex flex-col items-center gap-2"
              >

                <i className={`${tab.icon} text-2xl text-yellow-400`}></i>

                <span className="text-xs">
                  {tab.name}
                </span>

              </button>

            ))}

          </div>

          <p className="text-center text-gray-600 text-xs mt-8">
            Drive safely. Earn more.
          </p>

        </div>

      </div>

      {/* BOTTOM NAVIGATION */}

      <div className="shrink-0 bg-[#101010] border-t border-gray-800 px-3 py-3 flex justify-around z-[1100]">

        {tabs.map((tab) => (

          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex flex-col items-center gap-1 min-w-[65px] ${
              activeTab === tab.name
                ? "text-yellow-400"
                : "text-gray-400"
            }`}
          >

            <i className={`${tab.icon} text-xl`}></i>

            <span className="text-xs">
              {tab.name}
            </span>

          </button>

        ))}

      </div>

      {/* RIDE POPUP */}

      {showRidePopup && incomingRide && (
        <RidePopup
          ride={incomingRide}
          loading={acceptingRide}
          onAccept={handleAcceptRide}
          onIgnore={handleIgnoreRide}
        />
      )}

    </div>
  );
}

export default CaptainHome;
