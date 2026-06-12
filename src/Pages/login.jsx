import { HiOutlineBolt, HiOutlineCodeBracket, HiOutlineSparkles, HiOutlineMicrophone } from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";
import logo from "../assets/auravox-removebg-preview.png";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const ServerURL = import.meta.env.VITE_SERVER_URL || "https://aura-vox-backend.onrender.com";
function Login({ setUser }) {
  const navigate = useNavigate();
  const Features = [
    {
      icon: <HiOutlineMicrophone />,
      title: "Aura Vox",
      Description: "Natural real-time voice conversations."
    },
    {
      icon: <HiOutlineSparkles />,
      title: "Smart Navigation",
      Description: "Guides users with interactive voice prompts."
    },
    {
      icon: <HiOutlineCodeBracket />,
      title: "Easy Integration",
      Description: "Seamlessly integrates with any website using one script tag." 
    },
    {
      icon: <HiOutlineBolt />,
      title: "Fast Response",
      Description: "Experience instant response times with our optimized AI."
    }
  ];

const handleLogin = async() => {
  console.log("Google login button clicked!");
  try {
    console.log("Firebase Auth configuration:", { auth, provider });
    const result = await signInWithPopup(auth, provider);
    console.log("Firebase signInWithPopup result:", result);
    const {displayName, email} = result.user;
    console.log("Extracted user info:", { displayName, email });
    const res = await axios.post(ServerURL + "/api/auth/google", {name: displayName, email}, {withCredentials: true});
    setUser(res.data.user);
    toast.success("Login successful!");
    navigate("/");
  } catch (error) {
    console.error("Login handler caught error:", error);
    toast.error("Login failed. Please try again.");
  }
}
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-300 bg-purple-100 
            text-purple-600 text-sm font-medium">
              <HiOutlineSparkles />
              AI Voice Assistant Platform
            </div>
            <h1 className="mt-8 text-5xl lg:text-7xl font-black
            leading-tight text-[#081028]">
              Build AI Assistants
              <span className="block text-transparent bg-clip-text 
              bg-gradient-to-r from-purple-600 to-cyan-500"> For any Website</span>
            </h1>
            <p className="mt-8 text-lg text-[#475569] leading-8">
              Create customizable AI Voice that talk, guide, and assist your users. Integrate seamlessly with your website and provide an interactive experience.
            </p>
            <button onClick={handleLogin} className="mt-10 h-16 px-8 rounded-2xl
            bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold flex items-center
            gap-4 shadow-[0_20px_80px_rgba(139,92,246,0.3)] hover:scale-[1.02] transition-all duration-300 cursor-pointer">
              <FcGoogle className="text-3xl bg-white rounded-full"/>
              Continue with Google
            </button>
            <p className="mt-4 text-sm text-[#64748b]">
              Free Plan includes upto 300 AI responses per month
            </p>
          </div>
          {/* Right Column */}
          <div className="relative">
            {/* Background Blur Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-200/50 to-cyan-200/50 blur-[120px] pointer-events-none" />
            
            {/* Features Card */}
            <div className="relative rounded-[40px] border border-black/5 bg-white shadow-[0_20px_80px_rgba(0,0,0,0.06)] p-8 overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-[#081028]">
                  Features
                </h2>
                <div className="w-20 h-20 rounded-3xl bg-white border border-slate-100 flex items-center justify-center shadow-[0_10px_35px_rgba(0,0,0,0.05)] p-2 shrink-0">
                  <img src={logo} alt="logo" className="w-full h-full object-contain scale-[2.1]" />
                </div>
              </div>
 
              <div className="space-y-6">
                {Features.map((item, index) => (
                  <div key={index} className="flex items-start gap-5 p-5 rounded-2xl border-black/5 bg-[#f8fafc]">
 
                    <div className="min-w-[60px] h-[60px] rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500  text-white flex items-center justify-center 
                    shadow-[0_10px_30px_rgba(139,92,246,0.20)]">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-[#081028]">{item.title}</h3>
                      <p className="text-sm text-[#64748b] mt-1">{item.Description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;