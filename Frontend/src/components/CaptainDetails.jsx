import React, { useContext } from "react";
import { CaptainDataContext } from "../context/captainContext";

function CaptainDetails({ stats }) {
  const { captain } = useContext(CaptainDataContext);

  const captainStats = stats || {
    earnings: 295.20,
    hours: 10.2,
    distance: 45.8,
    trips: 12
  };

  const fullName = captain?.firstname
    ? `${captain.firstname} ${captain.lastname || ""}`.trim()
    : "Ashish Sharma";

  return (
    <div>
      {/* PROFILE HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#303030] flex items-center justify-center text-xl text-yellow-400 shrink-0">
            <i className="ri-user-3-fill"></i>
          </div>
          <div>
            <h4 className="text-lg font-bold capitalize text-white">
              {fullName}
            </h4>
            <p className="text-xs text-green-400 flex items-center gap-1 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Online • Verified Captain
            </p>
          </div>
        </div>

        <div className="text-right">
          <h4 className="text-2xl font-bold text-white">
            ₹{typeof captainStats.earnings === "number" ? captainStats.earnings.toFixed(2) : captainStats.earnings}
          </h4>
          <p className="text-xs text-gray-400">Earned</p>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="flex p-4 mt-6 bg-[#252525] rounded-2xl justify-between items-center text-center">
        <div className="flex-1">
          <i className="text-2xl mb-1 text-yellow-400 ri-timer-2-line block"></i>
          <h5 className="text-base font-bold text-white">{captainStats.hours}</h5>
          <p className="text-[10px] text-gray-400 mt-0.5">Hours Online</p>
        </div>

        <div className="w-[1px] h-9 bg-gray-700"></div>

        <div className="flex-1">
          <i className="text-2xl mb-1 text-yellow-400 ri-speed-up-line block"></i>
          <h5 className="text-base font-bold text-white">{captainStats.distance} KM</h5>
          <p className="text-[10px] text-gray-400 mt-0.5">Distance</p>
        </div>

        <div className="w-[1px] h-9 bg-gray-700"></div>

        <div className="flex-1">
          <i className="text-2xl mb-1 text-yellow-400 ri-booklet-line block"></i>
          <h5 className="text-base font-bold text-white">{captainStats.trips}</h5>
          <p className="text-[10px] text-gray-400 mt-0.5">Trips Done</p>
        </div>
      </div>
    </div>
  );
}

export default CaptainDetails;
