
import { Link } from 'react-router-dom';

function SignupPage() {
    return (
        <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-4">

            <div className="w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-xl">

                {/* Header Image */}
                <div
                    className="h-40 sm:h-44 w-full bg-cover bg-center relative"
                    style={{
                        backgroundImage: "url('https://www.tackgps.app/cdn/shop/articles/1_f3c0191f-7c1e-43b4-8672-3e7f843d8e29.png?v=1788243858')"
                    }}
                >
                    <h1 className="text-3xl font-extrabold text-white p-5">
                        Uber
                    </h1>
                </div>

                {/* Signup Form */}
                <div className="p-6 sm:p-8">

                    <h2 className="text-3xl font-bold text-gray-900">
                        Create Account
                    </h2>

                    <p className="text-gray-500 text-sm mt-1 mb-5">
                        Get started with Uber
                    </p>

                    <form className="flex flex-col gap-3">

                        {/* First Name */}
                        <input
                            type="text"
                            placeholder="Enter your first name"
                            className="w-full bg-gray-100 px-4 py-3 rounded-xl text-sm outline-none border border-transparent focus:border-black focus:bg-white transition"
                        />

                        {/* Last Name */}
                        <input
                            type="text"
                            placeholder="Enter your last name"
                            className="w-full bg-gray-100 px-4 py-3 rounded-xl text-sm outline-none border border-transparent focus:border-black focus:bg-white transition"
                        />

                        {/* Email */}
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full bg-gray-100 px-4 py-3 rounded-xl text-sm outline-none border border-transparent focus:border-black focus:bg-white transition"
                        />

                        {/* Password */}
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full bg-gray-100 px-4 py-3 rounded-xl text-sm outline-none border border-transparent focus:border-black focus:bg-white transition"
                        />

                        {/* Create Account Button */}
                        <button
                            type="submit"
                            className="w-full bg-black text-white py-3 rounded-xl font-semibold text-sm mt-2 hover:bg-gray-800 active:scale-[0.98] transition"
                        >
                            Create Account
                        </button>

                    </form>

                    {/* Login Link */}
                    <p className="text-center text-sm text-gray-500 mt-5">
                        Already have an account?
                        <Link
                            to="/login"
                            className="text-black font-bold ml-1 hover:underline"
                        >
                            Login
                        </Link>
                    </p>

                </div>
            </div>

        </div>
    );
}

export default SignupPage;
