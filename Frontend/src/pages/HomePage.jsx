
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleContinue = () => {
        if (loading) return;

        setLoading(true);

        setTimeout(() => {
            navigate('/login');
        }, 450);
    };

    return (
        <div className="min-h-screen w-full bg-black flex items-center justify-center p-0 sm:p-5 lg:p-8">

            <div className="relative w-full max-w-6xl min-h-screen sm:min-h-[650px] sm:h-[85vh] sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between">

                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/eb8088182519763.652f3604b9e99.png')"
                    }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-black/60" />

                {/* Header */}
                <div className="relative z-10 p-6 sm:p-8 lg:p-10">
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                        Uber
                    </h1>
                </div>

                {/* Bottom Content */}
                <div className="relative z-10 bg-white p-6 sm:p-10 lg:p-12 rounded-t-3xl sm:rounded-t-none sm:rounded-b-3xl md:rounded-3xl md:m-8 lg:m-12 md:max-w-lg">

                    <p className="text-xs font-bold text-gray-400 uppercase tracking-[3px] mb-3">
                        Welcome to Uber
                    </p>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                        Get Started
                        <br />
                        With Uber
                    </h2>

                    <p className="text-gray-500 text-sm sm:text-base mt-3 mb-7">
                        Your journey begins here. Travel smarter, easier and better.
                    </p>

                    {/* Animated Continue Button */}
                    <button
                        onClick={handleContinue}
                        disabled={loading}
                        className="group flex items-center justify-center gap-3 bg-black text-white w-full py-4 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 hover:bg-gray-800 hover:shadow-xl active:scale-95 disabled:opacity-80 overflow-hidden"
                    >
                        <span className={`transition-all duration-300 ${loading ? 'opacity-0 -translate-x-4' : 'opacity-100 translate-x-0'}`}>
                            Continue
                        </span>

                        {loading ? (
                            <span className="absolute flex items-center gap-2">
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                <span>Loading...</span>
                            </span>
                        ) : (
                            <span className="text-xl transition-transform duration-300 group-hover:translate-x-2">
                                →
                            </span>
                        )}
                    </button>

                    <p className="text-center text-xs text-gray-400 mt-5">
                        By continuing, you agree to our Terms and Privacy Policy.
                    </p>

                </div>
            </div>
        </div>
    );
}

export default HomePage;
