

function RidePopup({
  ride,
  onAccept,
  onIgnore,
  loading = false
}) {
  if (!ride) return null;

  const customerName =
    ride.customer ||
    ride.user?.fullname ||
    ride.user?.name ||
    "New Customer";

  const customerImage =
    ride.customerImage ||
    ride.user?.profileImage;

  const pickup =
    ride.pickup ||
    ride.pickupAddress ||
    "Pickup location";

  const destination =
    ride.destination ||
    ride.dropoff ||
    ride.destinationAddress ||
    "Destination location";

  const fare = Number(ride.fare || ride.price || 0);

  const distance = ride.distance || 2.2;

  const paymentMethod = ride.paymentMethod || "Cash";

  return (
    <div className="fixed inset-0 z-[3000] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-3 sm:p-5">

      {/* POPUP CARD */}

      <div className="w-full max-w-md bg-white text-[#171717] rounded-[28px] overflow-hidden shadow-2xl animate-[slideUp_0.35s_ease-out]">

        {/* MAP HEADER */}

        <div
          className="h-24 relative overflow-hidden bg-[#e8eceb]"
          style={{
            backgroundImage: `
              linear-gradient(35deg, transparent 45%, #ffffff 46%, #ffffff 49%, transparent 50%),
              linear-gradient(135deg, transparent 40%, #cbd5d1 41%, #cbd5d1 44%, transparent 45%),
              repeating-linear-gradient(0deg, transparent, transparent 25px, #d3dcd7 26px, transparent 28px),
              repeating-linear-gradient(90deg, transparent, transparent 35px, #d3dcd7 36px, transparent 38px)
            `
          }}
        >

          <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent" />

          <div className="relative z-10 flex justify-between items-center p-5">

            <h1 className="text-2xl font-extrabold tracking-tight">
              Uber<span className="text-green-500">.</span>
            </h1>

            <div className="bg-white w-10 h-10 rounded-full shadow flex items-center justify-center">
              <i className="ri-map-pin-user-line text-xl"></i>
            </div>

          </div>

          <div className="absolute bottom-2 left-5 text-[10px] text-gray-500 font-medium">
            NEW TRIP REQUEST
          </div>

        </div>

        <div className="p-5">

          {/* TITLE */}

          <div className="mb-5">

            <div className="flex items-center gap-2">

              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />

              <p className="text-xs font-bold tracking-widest text-gray-500">
                INCOMING REQUEST
              </p>

            </div>

            <h2 className="text-2xl font-extrabold mt-2">
              New Ride Available!
            </h2>

          </div>

          {/* CUSTOMER DETAILS */}

          <div className="bg-[#fff5cc] rounded-2xl p-3 flex justify-between items-center">

            <div className="flex items-center gap-3 min-w-0">

              {customerImage ? (
                <img
                  src={customerImage}
                  alt={customerName}
                  className="w-11 h-11 rounded-full object-cover border-2 border-white"
                />
              ) : (
                <div className="w-11 h-11 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-lg">
                  {customerName.charAt(0).toUpperCase()}
                </div>
              )}

              <div className="min-w-0">
                <h3 className="font-bold text-sm truncate">
                  {customerName}
                </h3>

                <p className="text-[11px] text-gray-500 mt-1">
                  Passenger
                </p>
              </div>

            </div>

            <div className="text-right shrink-0">

              <h3 className="font-extrabold text-lg">
                {distance} KM
              </h3>

              <p className="text-[10px] text-gray-500">
                Pickup distance
              </p>

            </div>

          </div>

          {/* PICKUP AND DROP */}

          <div className="mt-6 space-y-5">

            {/* PICKUP */}

            <div className="flex gap-4 items-start">

              <div className="w-9 h-9 shrink-0 rounded-full bg-green-100 flex items-center justify-center">
                <i className="ri-map-pin-fill text-green-600 text-lg"></i>
              </div>

              <div className="min-w-0 flex-1">

                <p className="text-[10px] text-gray-400 font-bold tracking-widest">
                  PICKUP LOCATION
                </p>

                <h3 className="font-bold text-sm mt-1 break-words">
                  {pickup}
                </h3>

              </div>

            </div>

            {/* DIVIDER */}

            <div className="border-t border-dashed border-gray-300 ml-4" />

            {/* DROP */}

            <div className="flex gap-4 items-start">

              <div className="w-9 h-9 shrink-0 rounded-full bg-red-100 flex items-center justify-center">
                <i className="ri-map-pin-2-fill text-red-500 text-lg"></i>
              </div>

              <div className="min-w-0 flex-1">

                <p className="text-[10px] text-gray-400 font-bold tracking-widest">
                  DROP LOCATION
                </p>

                <h3 className="font-bold text-sm mt-1 break-words">
                  {destination}
                </h3>

              </div>

            </div>

          </div>

          {/* FARE DETAILS */}

          <div className="mt-6 bg-[#f5f5f5] rounded-2xl p-4 flex justify-between items-center">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <i className="ri-wallet-3-line text-xl"></i>
              </div>

              <div>
                <p className="text-[10px] text-gray-400 font-bold">
                  PAYMENT METHOD
                </p>

                <h3 className="font-bold text-sm mt-1">
                  {paymentMethod}
                </h3>
              </div>

            </div>

            <div className="text-right">

              <h2 className="text-2xl font-extrabold">
                ₹{fare.toFixed(2)}
              </h2>

              <p className="text-[10px] text-gray-400">
                Estimated fare
              </p>

            </div>

          </div>

          {/* DISTANCE DETAILS */}

          <div className="flex justify-between mt-4 px-1">

            <div className="flex items-center gap-2 text-gray-500 text-xs">
              <i className="ri-route-line text-lg"></i>
              {ride.totalDistance || "Distance unavailable"}
            </div>

            <div className="flex items-center gap-2 text-gray-500 text-xs">
              <i className="ri-time-line text-lg"></i>
              {ride.duration ? `${ride.duration} min` : "Time unavailable"}
            </div>

          </div>

          {/* ACTION BUTTONS */}

          <div className="mt-6 space-y-3">

            <button
              disabled={loading}
              onClick={() => onAccept?.(ride)}
              className="w-full bg-[#55b65b] hover:bg-[#439f49] active:scale-[0.98] disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-all flex justify-center items-center gap-2"
            >

              <i className="ri-check-double-line text-xl"></i>

              {loading ? "Accepting..." : "CONFIRM RIDE"}

            </button>

            <button
              disabled={loading}
              onClick={() => onIgnore?.(ride)}
              className="w-full bg-[#e5e7eb] hover:bg-[#d1d5db] active:scale-[0.98] disabled:opacity-50 text-gray-700 font-bold py-4 rounded-xl transition-all"
            >
              IGNORE REQUEST
            </button>

          </div>

          <p className="text-center text-[10px] text-gray-400 mt-4">
            Review the trip details before confirming.
          </p>

        </div>

      </div>

      <style>
        {`
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

    </div>
  );
}

export default RidePopup;
