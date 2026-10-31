
    import { CaptainDataContext } from '../context/captainContext';
    import { Link, useNavigate } from 'react-router-dom';
    import { useContext, useState } from 'react';
    import axios from 'axios';

    function CaptainSignup() {
        const [showPassword, setShowPassword] = useState(false);

        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [firstname, setFirstName] = useState('');
        const [lastname, setLastName] = useState('');
        const [color, setColor] = useState('');
        const [plate, setPlate] = useState('');
        const [number, setNumber] = useState('');
        const [vehicleType, setVehicleType] = useState('');

        const { setCaptain } = useContext(CaptainDataContext);
        const navigate = useNavigate();

        const handleChange = async (e) => {
            e.preventDefault();

           const newUser = {
                firstname,
                lastname,
                email,
                password,
                vehicle: {
                    color,
                    plate,
                    capacity: Number(number),
                    vehicletype: vehicleType
                }
            };

            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_BASE_URL}/api/captain/register`,
                    newUser
                );

                if (response.status === 200 || response.status === 201) {
                    const data = response.data;

                    setCaptain(data.user);
                    localStorage.setItem('token', data.token);

                    navigate('/captain-home');

                    setEmail('');
                    setPassword('');
                    setFirstName('');
                    setLastName('');
                    setColor('');
                    setPlate('');
                    setNumber('');
                    setVehicleType('');
                }
            } catch (error) {
                console.log(
                    "Captain Signup Error:",
                    error.response?.data || error.message
                );
            }
        };

        return (
            <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-4">

                <div className="w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-xl">

                    {/* Header Image */}
                    <div
                        className="h-40 sm:h-44 w-full bg-cover bg-center"
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

                        <span className="inline-block bg-[#D1FAE5] text-[#065F46] text-xs font-bold px-3 py-1 rounded-full mb-3">
                            CAPTAIN REGISTRATION
                        </span>

                        <h2 className="text-3xl font-bold text-gray-900">
                            Join as Captain
                        </h2>

                        <p className="text-gray-500 text-sm mt-1 mb-5">
                            Enter your details to get started
                        </p>

                        <form className="flex flex-col gap-3" onSubmit={handleChange}>

                            {/* First Name */}
                            <input
                                onChange={(e) => setFirstName(e.target.value)}
                                value={firstname}
                                type="text"
                                name="firstname"
                                placeholder="First Name"
                                required
                                className="w-full bg-gray-100 px-4 py-3 rounded-xl text-sm outline-none border border-transparent focus:border-[#10B981] focus:bg-white transition"
                            />

                            {/* Last Name */}
                            <input
                                onChange={(e) => setLastName(e.target.value)}
                                value={lastname}
                                type="text"
                                name="lastname"
                                placeholder="Last Name"
                                required
                                className="w-full bg-gray-100 px-4 py-3 rounded-xl text-sm outline-none border border-transparent focus:border-[#10B981] focus:bg-white transition"
                            />

                            {/* Email */}
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                required
                                className="w-full bg-gray-100 px-4 py-3 rounded-xl text-sm outline-none border border-transparent focus:border-[#10B981] focus:bg-white transition"
                            />

                            {/* Password */}
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    name="password"
                                    placeholder="Create Password"
                                    required
                                    className="w-full bg-gray-100 px-4 py-3 rounded-xl text-sm outline-none border border-transparent focus:border-[#10B981] focus:bg-white transition"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                                >
                                    {showPassword ? "🙈" : "👁️"}
                                </button>
                            </div>

                            {/* Vehicle Details */}
                            <h3 className="text-sm font-bold text-gray-800 mt-3">
                                Vehicle Details
                            </h3>

                            {/* Color */}
                            <input
                                onChange={(e) => setColor(e.target.value)}
                                value={color}
                                type="text"
                                name="color"
                                placeholder="Vehicle Color"
                                required
                                className="w-full bg-gray-100 px-4 py-3 rounded-xl text-sm outline-none border border-transparent focus:border-[#10B981] focus:bg-white transition"
                            />

                            {/* Plate */}
                            <input
                                onChange={(e) => setPlate(e.target.value)}
                                value={plate}
                                type="text"
                                name="plate"
                                placeholder="Vehicle Number (e.g. MH35 1234)"
                                required
                                className="w-full bg-gray-100 px-4 py-3 rounded-xl text-sm outline-none border border-transparent focus:border-[#10B981] focus:bg-white transition"
                            />

                            {/* Capacity */}
                            <input
                                onChange={(e) => setNumber(e.target.value)}
                                value={number}
                                type="number"
                                name="capacity"
                                placeholder="Passenger Capacity"
                                min="1"
                                required
                                className="w-full bg-gray-100 px-4 py-3 rounded-xl text-sm outline-none border border-transparent focus:border-[#10B981] focus:bg-white transition"
                            />

                            {/* Vehicle Type */}
                            <select
                                value={vehicleType}
                                onChange={(e) => setVehicleType(e.target.value)}
                                required
                                className="w-full bg-gray-100 px-4 py-3 rounded-xl text-sm outline-none border border-transparent focus:border-[#10B981] focus:bg-white transition"
                            >
                                <option value="" disabled>
                                    Select Vehicle Type
                                </option>
                                <option value="car">Car</option>
                                <option value="motorcycle">Motorcycle</option>
                                <option value="auto">Auto</option>
                            </select>

                            {/* Register Button */}
                            <button
                                type="submit"
                                className="w-full bg-[#D1FAE5] text-[#065F46] py-3 rounded-xl font-bold text-sm mt-3 hover:bg-[#A7F3D0] active:scale-[0.98] transition"
                            >
                                Create Captain Account
                            </button>

                        </form>

                        {/* Login Link */}
                        <p className="text-center text-sm text-gray-500 mt-5">
                            Already registered?
                            <Link
                                to="/captainlogin"
                                className="text-[#065F46] font-bold ml-1 hover:underline"
                            >
                                Login
                            </Link>
                        </p>

                    </div>
                </div>
            </div>
        );
    }

    export default CaptainSignup;
