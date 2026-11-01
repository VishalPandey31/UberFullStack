
function RideOptionsPanel({
    pickup,
    destination,
    selectedRide,
    setSelectedRide,
    onBack
}) {

    const rides = [
        {
            id: 1,
            name: "Uber Go AC",
            capacity: 4,
            time: "4 min",
            price: 219.95,
            icon: "🚙"
        },
        {
            id: 2,
            name: "Go Sedan",
            capacity: 4,
            time: "6 min",
            price: 252.07,
            icon: "🚘"
        },
        {
            id: 3,
            name: "UberXL",
            capacity: 6,
            time: "5 min",
            price: 1476.10,
            icon: "🚐"
        },
        {
            id: 4,
            name: "Premier XL",
            capacity: 6,
            time: "5 min",
            price: 1684.83,
            icon: "🚙"
        }
    ];

    return (

<div className="fixed inset-0 z-[4000] bg-[#151515] text-white overflow-y-auto">
            {/* HEADER */}

            <div className="flex items-center justify-between px-4 py-3">

                <button
                    onClick={onBack}
                    className="text-2xl"
                >
                    ←
                </button>

                <div className="text-center">

                    <p className="text-[10px] text-gray-400">
                        Pickup
                    </p>

                    <h3 className="text-xs font-semibold">
                        {pickup}
                    </h3>

                    <p className="text-[10px] text-gray-400 mt-1">
                        Destination: {destination}
                    </p>

                </div>

                <div className="w-6"></div>

            </div>


            {/* PROMOTION */}

            <div className="text-center py-3 border-b border-[#292929]">

                <p className="text-[11px] text-orange-400">
                    🔖 5% promotion applied
                </p>

            </div>


            {/* RIDE OPTIONS */}

            <div className="px-3 py-3 space-y-2">

                {rides.map((ride) => (

                    <div
                        key={ride.id}
                        onClick={() => setSelectedRide(ride)}
                        className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all duration-200
                        ${
                            selectedRide?.id === ride.id
                                ? "border-white bg-[#292929]"
                                : "border-transparent bg-[#202020]"
                        }`}
                    >

                        {/* VEHICLE */}

                        <div className="flex items-center gap-3">

                            <span className="text-3xl">
                                {ride.icon}
                            </span>

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


            {/* PAYMENT SECTION */}

            <div className="px-3 py-3 border-t border-[#292929]">

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                        <span className="bg-[#b5d96b] text-black p-2 rounded-md">
                            ▣
                        </span>

                        <span className="text-xs">
                            Cash
                        </span>

                    </div>

                    <span className="text-xl text-gray-400">
                        ›
                    </span>

                </div>

            </div>


            {/* CHOOSE RIDE BUTTON */}

            <div className="px-3 pb-4">

                <button
                    disabled={!selectedRide}
                    onClick={() => {
                        alert(`You selected ${selectedRide.name}`);
                    }}
                    className={`w-full h-12 rounded-md font-semibold text-sm transition-all
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
