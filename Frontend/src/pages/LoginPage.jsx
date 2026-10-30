
import { Link } from 'react-router-dom';

function LoginPage() {
    return (
        <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-4">

            <div className="w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-xl">

                {/* Header Image */}
                <div
                    className="h-44 sm:h-48 w-full bg-cover bg-center relative"
                    style={{
                        backgroundImage: "url('https://www.tackgps.app/cdn/shop/articles/1_f3c0191f-7c1e-43b4-8672-3e7f843d8e29.png?v=1788243858')"
                    }}
                >
                    <h1 className="text-3xl font-extrabold text-white p-5">
                        Uber
                    </h1>
                </div>

                {/* Login Form */}
                <div className="p-6 sm:p-8">

                    <h2 className="text-3xl font-bold text-gray-900">
                        Welcome Back
                    </h2>

                    <p className="text-gray-500 text-sm mt-1 mb-6">
                        Login to your account
                    </p>

                    <form className="flex flex-col gap-4">

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-2">
                                Email
                            </label>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-gray-100 px-4 py-3 rounded-xl text-sm outline-none border border-transparent focus:border-black focus:bg-white transition"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-2">
                                Password
                            </label>

                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="w-full bg-gray-100 px-4 py-3 rounded-xl text-sm outline-none border border-transparent focus:border-black focus:bg-white transition"
                            />
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full bg-black text-white py-3 rounded-xl font-semibold text-sm mt-2 hover:bg-gray-800 active:scale-[0.98] transition"
                        >
                            Login
                        </button>

                    </form>

                    {/* Signup */}
                    <p className="text-center text-sm text-gray-500 mt-5">
                        Don't have an account?
                        <Link
                            to="/signup"
                            className="text-black font-bold ml-1 hover:underline"
                        >
                            Signup
                        </Link>
                    </p>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-5">
                        <div className="h-px bg-gray-200 flex-1"></div>
                        <span className="text-xs text-gray-400">OR</span>
                        <div className="h-px bg-gray-200 flex-1"></div>
                    </div>

                    {/* Captain Login */}
                    <Link
                        to="/captainlogin"
                        className="flex items-center justify-center w-full bg-[#D1FAE5] text-[#065F46] py-3 rounded-xl font-bold text-sm hover:bg-[#A7F3D0] active:scale-[0.98] transition"
                    >
                        Sign in as Captain
                    </Link>

                </div>
            </div>

        </div>
    );
}

export default LoginPage;
