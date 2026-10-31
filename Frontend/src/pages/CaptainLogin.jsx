
import { Link } from 'react-router-dom';
import {useState} from 'react';
import {CaptainDataContext} from '../context/captainContext'
import {useNavigate} from 'react-router-dom'
import {useContext} from 'react';
import axios from 'axios';

function CaptainLogin() {


    
 const [email,setEmail]=useState('');
  const [Password,setPassword]=useState('');
const [showPassword, setShowPassword] = useState(false);


const {  setCaptain } = useContext(CaptainDataContext);
  const navigate=useNavigate();

 const handleChange=async (e)=>{

        e.preventDefault();

        const userData={
          email:email,
          password:Password
         }

         const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/captain/login`,userData);

        if(response.status==200){
           const data=response.data
           setCaptain(data.user)
           localStorage.setItem('token',data.token);
           navigate('/captain-home');
        }

         setEmail('');
         setPassword('');
        
}

    return (
        <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-4">

            <div className="w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-xl">

                {/* Header Image */}
                <div
                    className="h-44 sm:h-48 w-full bg-cover bg-center"
                    style={{
                        backgroundImage: "url('https://www.tackgps.app/cdn/shop/articles/1_f3c0191f-7c1e-43b4-8672-3e7f843d8e29.png?v=1788243858')"
                    }}
                >
                    <h1 className="text-3xl font-extrabold text-white p-5">
                        Uber
                    </h1>
                </div>

                {/* Captain Login Form */}
                <div className="p-6 sm:p-8">

                    <span className="inline-block bg-[#D1FAE5] text-[#065F46] text-xs font-bold px-3 py-1 rounded-full mb-3">
                        CAPTAIN LOGIN
                    </span>

                    <h2 className="text-3xl font-bold text-gray-900">
                        Welcome Captain
                    </h2>

                    <p className="text-gray-500 text-sm mt-1 mb-6">
                        Login to your captain account
                    </p>

                    <form className="flex flex-col gap-4" onSubmit={handleChange}>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-2">
                                Email
                            </label>

                            <input
                            value={email}
                            onChange={(e)=>{setEmail(e.target.value)}}
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-gray-100 px-4 py-3 rounded-xl text-sm outline-none border border-transparent focus:border-[#10B981] focus:bg-white transition"
                            />
                        </div>

                     {/* Password */}
<div>
    <label className="block text-sm font-semibold text-gray-800 mb-2">
        Password
    </label>

    <div className="relative">

        <input
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            value={Password}
            placeholder="Enter your password"
            className="w-full bg-gray-100 px-4 py-3 pr-12 rounded-xl text-sm outline-none border border-transparent focus:border-black focus:bg-white transition"
        />

        <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
        >
            {showPassword ? "🙈" : "👁️"}
        </button>

    </div>
</div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full bg-[#D1FAE5] text-[#065F46] py-3 rounded-xl font-bold text-sm mt-2 hover:bg-[#A7F3D0] active:scale-[0.98] transition"
                        >
                            Sign in as Captain
                        </button>

                    </form  >

                    {/* Signup Link */}
                    <p className="text-center text-sm text-gray-500 mt-5">
                        New to Uber Captain?
                        <Link
                            to="/captainsignup"
                            className="text-[#065F46] font-bold ml-1 hover:underline"
                        >
                            Create Account
                        </Link>
                    </p>

                    {/* User Login */}
                    <div className="border-t border-gray-100 mt-5 pt-4 text-center">
                        <Link
                            to="/login"
                            className="text-sm text-gray-500 hover:text-black transition"
                        >
                            Login as User
                        </Link>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default CaptainLogin;
