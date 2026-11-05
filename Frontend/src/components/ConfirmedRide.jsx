
import React from "react";

function ConfirmedRide({
    pickup,
    destination,
    selectedRide,
    onBack,
    onBook
}) {
    const basePrice = Number(selectedRide?.price || 0);
    const promotion = basePrice * 0.05;
    const totalPrice = basePrice - promotion;

    return (
        <div className="fixed inset-0 z-[5000] bg-[#151515] text-white overflow-y-auto">

            {/* HEADER */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-[#292929]">
                <button
                    onClick={onBack}
                    className="text-2xl"
                >
                    ←
                </button>

                <h2 className="text-lg font-semibold">
                    Review ride
                </h2>
            </div>

            <div className="px-4 pb-28">

              


                {/* SAVINGS BANNER */}
                <div className="bg-[#183c29] text-green-400 rounded-lg py-2 px-3 text-center text-xs mt-4 mb-4">
                    ✓ You're saving ₹{promotion.toFixed(2)} on your ride
                </div>

                {/* SELECTED RIDE */}
                <div className="flex items-center justify-between bg-[#202020] rounded-xl p-3">

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

                            <p className="text-[10px] text-gray-400 mt-1">
                                {selectedRide?.capacity} seats
                            </p>

                            <p className="text-[10px] text-gray-400">
                                {selectedRide?.time} away
                            </p>
                        </div>

                    </div>

                    <div className="text-right">
                        <p className="text-sm font-semibold">
                            ₹{totalPrice.toFixed(2)}
                        </p>
                        <p className="text-[10px] text-gray-400 line-through">
                            ₹{basePrice.toFixed(2)}
                        </p>
                    </div>

                </div>

                {/* TRIP DETAILS */}
                <div className="mt-6">

                    <h3 className="text-sm font-semibold mb-4">
                        One-way trip to {destination}
                    </h3>

                    <div className="flex items-start gap-3">

                        <div className="flex flex-col items-center pt-1">
                            <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                            <span className="h-12 border-l border-dashed border-gray-500"></span>
                            <span className="w-2.5 h-2.5 rounded-sm bg-red-500"></span>
                        </div>

                        <div className="flex-1 space-y-7">

                            <div>
                                <p className="text-[10px] text-gray-400">
                                    Pickup
                                </p>
                                <p className="text-xs font-medium mt-1">
                                    {pickup}
                                </p>
                            </div>

                            <div>
                                <p className="text-[10px] text-gray-400">
                                    Drop
                                </p>
                                <p className="text-xs font-medium mt-1">
                                    {destination}
                                </p>
                            </div>

                        </div>

                    </div>
                </div>

            

                {/* PRICE BREAKDOWN */}
                <div className="mt-7 border-t border-[#292929] pt-5">

                    <h3 className="text-sm font-semibold mb-4">
                        Price breakdown
                    </h3>

                    <p className="text-[10px] text-gray-400 underline mb-5">
                        Your charges explained ⓘ
                    </p>

                    <div className="space-y-4">

                        <div className="flex justify-between text-xs">
                            <span className="text-gray-400">
                                Base price
                            </span>
                            <span>
                                ₹{basePrice.toFixed(2)}
                            </span>
                        </div>

                        <div className="flex justify-between text-xs">
                            <span className="text-gray-400">
                                Promotion
                            </span>
                            <span className="text-green-400">
                                -₹{promotion.toFixed(2)}
                            </span>
                        </div>

                        <div className="flex justify-between text-sm font-semibold border-t border-[#292929] pt-4">
                            <span>Total price</span>
                            <span>
                                ₹{totalPrice.toFixed(2)}
                            </span>
                        </div>

                    </div>
                </div>

                {/* RIDE CONFIDENCE */}
                <div className="mt-7 border-t border-[#292929] pt-5">

                    <h3 className="text-sm font-semibold mb-5">
                        Ride with confidence
                    </h3>

                    <div className="grid grid-cols-3 gap-2 text-center">

                        <div>
                            <span className="text-2xl">◷</span>
                            <p className="text-[10px] mt-2">
                                Quick confirmation
                            </p>
                        </div>

                        <div>
                            <span className="text-2xl">◉</span>
                            <p className="text-[10px] mt-2">
                                24/7 live support
                            </p>
                        </div>

                        <div>
                            <span className="text-2xl">✧</span>
                            <p className="text-[10px] mt-2">
                                Top rated drivers
                            </p>
                        </div>

                    </div>

                    {/* SUPPORT CARD */}
                    <div className="mt-5 border border-[#333] rounded-xl p-3 flex items-center gap-3">

                        <span className="text-xl">♧</span>

                        <div className="flex-1">
                            <p className="text-xs font-medium">
                                Integrity support
                            </p>
                            <p className="text-[10px] text-gray-400 mt-1">
                                We're here to help if you need us
                            </p>
                            <p className="text-[10px] text-gray-500">
                                Available 10 AM – 10 PM
                            </p>
                        </div>

                        <span className="text-gray-400">›</span>

                    </div>

                </div>

                {/* THINGS TO KEEP IN MIND */}
                <div className="mt-7 border-t border-[#292929] pt-5">

                    <h3 className="text-sm font-semibold mb-4">
                        Things to keep in mind
                    </h3>

                    <div className="flex gap-3 mb-4">
                        <span className="text-lg">▢</span>
                        <div>
                            <p className="text-xs font-medium">
                                Tolls and interstate charges are extra
                            </p>
                            <p className="text-[10px] text-gray-400 mt-1">
                                Final charges may vary based on your route.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <span className="text-lg">Ⓟ</span>
                        <div>
                            <p className="text-xs font-medium">
                                Parking charges
                            </p>
                            <p className="text-[10px] text-gray-400 mt-1">
                                Extra charges apply for paid parking.
                            </p>
                        </div>
                    </div>

                </div>

            </div>

            {/* FIXED BOOK BUTTON */}
            <div className="fixed bottom-0 left-0 right-0 bg-[#151515] border-t border-[#292929] p-3">

                <button
                    onClick={onBook}
                    className="w-full h-12 rounded-md bg-[#c7c7c7] text-black font-semibold text-sm"
                >
                    Book Intercity
                </button>

            </div>

        </div>
    );
}

export default ConfirmedRide;
