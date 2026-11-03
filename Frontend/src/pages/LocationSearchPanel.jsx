import React, { useEffect, useRef } from "react";
function LocationSearchPanel({ 
    showRidePanel,
    setShowRidePanel,
    pickup,
    setPickup,
    destination,
    setDestination,
    onSearch}){
    
      const places = [
        ["Bandra Terminus", "Navpada, Bandra East, Mumbai, Maharashtra"],
        ["Terminal 2", "Navpada, Vile Parle East, Andheri East, Mumbai"],
        ["BOM Terminal 2", "Navpada, Vile Parle East, Mumbai"],
        ["Chhatrapati Shivaji Maharaj International Airport Mumbai", "Mumbai, Maharashtra"],
        ["Maharashtra", "Mumbai"]
    ];

const hasSearched = useRef(false);

useEffect(() => {
    if (
        pickup.trim() &&
        destination.trim() &&
        !hasSearched.current
    ) {
        hasSearched.current = true;
        onSearch();
    }
}, [pickup, destination]);
return(


    <div
    className={`fixed inset-0 z-[2000] text-white overflow-y-auto
    transition-transform duration-500 ease-in-out
    ${showRidePanel ? "translate-y-0" : "translate-y-full pointer-events-none"}`}
>

    {/* Top Map Strip */}
    <div className="h-[52px]  "></div>

<div className="px-6 pt-5 bg-[#151515] min-h-[calc(100%-52px)]">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">

            <button
                onClick={() => setShowRidePanel(false)}
                className="text-2xl"
            >
                ←
            </button>

            <h2 className="text-sm font-semibold mr-20">
                Plan your ride
            </h2>

        </div>

        {/* Pickup Options */}
        <div className="flex gap-2 mb-3">
            <button className="bg-[#292929] rounded-full px-3 py-2 text-xs">
                ◷ Pickup now ⌄
            </button>

            <button className="bg-[#292929] rounded-full px-3 py-2 text-xs">
                ♟ For me ⌄
            </button>
        </div>

        {/* Pickup and Destination */}
        <div className="border-2 border-[#d5d5d5] rounded-xl p-3">

            <div className="flex items-center gap-3 h-9 border-b border-[#353535]">
                <div className="h-3 w-3 rounded-full border-[3px] border-gray-300"></div>
               <input
                        type="text"
                        placeholder="Enter pickup location"
                        value={pickup}
                        onChange={(e) => setPickup(e.target.value)}
                        className="bg-transparent outline-none text-xs w-full"
                    />
            </div>

            <div className="flex items-center gap-3 h-9">
                <div className="h-3 w-3 rounded-sm bg-gray-300"></div>
                <input
                    type="text"
                    placeholder="Where to?"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="bg-transparent outline-none text-xs w-full"
                />
            </div>

        </div>

        {/* Saved Places */}
        <div className="flex gap-2 mt-3 mb-3">
            <button className="bg-[#202020] rounded-full px-3 py-2 text-[10px]">
                🏠 Add Home
            </button>
            <button className="bg-[#202020] rounded-full px-3 py-2 text-[10px]">
                💼 Add Work
            </button>
            <button className="bg-[#202020] rounded-full px-3 py-2 text-[10px]">
                ☆ Saved places
            </button>
        </div>

        {/* RECENT LOCATIONS */}

                <div>

                    {places.map((place, index) => (

                        <div
                            key={index}
                            onClick={() => setDestination(place[0])}
                            className="flex gap-3 py-3 border-b border-[#292929] cursor-pointer"
                        >

                            <span className="text-gray-300">◷</span>

                            <div>

                                <h4 className="text-[11px] font-medium">
                                    {place[0]}
                                </h4>

                                <p className="text-[9px] text-gray-400 mt-1">
                                    {place[1]}
                                </p>

                            </div>

                        </div>

                    ))}

                </div>


                {/* BOTTOM OPTIONS */}

                <div className="mt-3">

                    <div className="flex items-center gap-3 py-3 border-b border-[#292929]">
                        <span className="bg-[#292929] rounded-full p-2">◎</span>
                        <p className="text-[11px]">Search in a different city</p>
                    </div>

                    <div className="flex items-center gap-3 py-3">
                        <span className="bg-[#292929] rounded-full p-2">⊙</span>
                        <p className="text-[11px]">Set location on map</p>
                    </div>

                </div>


                {/* SEARCH BUTTON */}

             

            </div>

</div>
)

}

export default LocationSearchPanel;