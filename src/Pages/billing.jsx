import React from 'react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ServerURL } from '../App';
import axios from 'axios';

function Billing({user, setuser}) {
const navigate = useNavigate
    useEffect (()=> {
        if(user && !user.isSetupComplete){
            toast.error("Setup your Assistant first");
        }
    }, [])
     const remainingMessages = 
    Math.max(
      0, (user?.requestLimit || 0) - (user?.totalMessages || 0)
    );

  const remainingDays = user?.proExpiresAt
    ? Math.max(0, Math.ceil((new Date(user.proExpiresAt) - new Date()) / (1000 * 60 * 60 * 24)))
    : 0;

    const handlePay = async () => {
        try {
            const res = await axios.post(ServerURL + "/api/billing/order", {plan: "pro"}, {withCredentials: true})
            
            const order = res.data.order
            const options  = {
                key:import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "Aura Vox",
                description: "Pro Plan",
                order_id: order.id,

                handler: async (response) => {
                    const verifyRes = await axios.post(ServerURL + "/api/billing/verify",
                        response, {withCredentials:true})
                    if(verifyRes.data.success){
                        toast.success("Payment is Successful")
                        setuser(verifyRes.data.user)
                        
                    }
                   
                },
                theme:{color: "#0891b2"},
            }
            const razorpay = new window.Razorpay(options)
            razorpay.open()
        } catch (error) {
            toast.error("payment Failed")

            console.log(error);
        }
    }
    return (   
        <div className='min-h-screen bg-[#f7f8fc] px-4 py-10'>
            <div className='max-w-5xl mx-auto'>
                <div className='mb-8'>
          <h2 className='text-3xl font-bold text-[#081028]'>
            Billing & Subscription
          </h2>
          <p className='text-gray-500 mt-1 '> Manage your AI assistant plan and usage. </p>
        </div>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6'>
              <div className='bg-white rounded-2xl border border-gray-100 bg-[#f8fafc] p-4'>
                <p className='text-sm text-gray-400'> Current Plan</p>
                <h2 className='text-xl font-bold text-[#081028] mt-1 capitalize'>
                  {user?.plan}
                </h2>
              </div>
              <div className='bg-white rounded-2xl border border-gray-100 bg-[#f8fafc] p-4'>
                <p className='text-sm text-gray-400'> Gemini Status</p>
                <h2 className={`text-xl font-bold mt-1 capitalize ${
                  user?.geminiStatus === "active"
                    ? "text-cyan-600"
                    : user?.geminiStatus === "invalid_key"
                    ? "text-red-500"
                    : "text-amber-500"
                }`}>
                  {user?.geminiStatus}
                </h2>
              </div>
              <div className='bg-white rounded-2xl border border-gray-100 bg-[#f8fafc] p-4'>
                <p className='text-sm text-gray-400'>
                  {user?.plan === "free" ? "Messages Left" : "Plan Expiry in"}
                </p>
                <h2 className='text-xl font-bold text-[#081028] mt-1 capitalize'>
                  {user?.plan === "free" ? remainingMessages : `${remainingDays} Days`}
                </h2>
              </div>
            </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-10'>
                    {/* Free Plan */}
                        <div className='bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col'> 
                            <h2 className='text-xl font-semibold text-gray-500 tracking-wide uppercase text-sm'>Free Plan</h2>
                            <div className='flex items-baseline mt-4'>
                                <h3 className='text-5xl font-bold text-gray-900'>₹0</h3>
                                <span className='text-gray-400 font-medium ml-2'>/ forever</span>
                            </div>
                            <ul className='mt-8 space-y-5 text-gray-600 flex-grow font-medium'>
                                <li className="flex items-center gap-3">
                                    <div className="bg-gray-100 p-1.5 rounded-full"><svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg></div>
                                    200 AI messages
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="bg-gray-100 p-1.5 rounded-full"><svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg></div>
                                    Voice assistant
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="bg-gray-100 p-1.5 rounded-full"><svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg></div>
                                    Navigation support
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="bg-gray-100 p-1.5 rounded-full"><svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg></div>
                                    Basic Customization
                                </li>
                            </ul>
                            <div className="mt-8 h-14 w-full rounded-2xl border border-gray-200 flex items-center justify-center font-semibold text-gray-400 cursor-default bg-gray-50/50">
                                Current Default
                            </div>
                        </div>

                    {/* Pro Plan */}
                        <div className='bg-gradient-to-b from-cyan-50 to-cyan-50 rounded-3xl p-8 border-2 border-cyan-200 shadow-[0_8px_30px_rgb(8,145,178,0.15)] hover:shadow-[0_15px_40px_rgb(8,145,178,0.25)] transition-all duration-300 flex flex-col relative overflow-hidden'>
                            {/* Premium Badge */}
                            <div className="absolute top-6 right-6 bg-cyan-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md">
                                MOST POPULAR
                            </div>

                            <h2 className='text-xl font-semibold text-cyan-600 tracking-wide uppercase text-sm'>Pro Plan</h2>
                            <div className='flex items-baseline mt-4'>
                                <h3 className='text-5xl font-extrabold text-cyan-900'>₹10</h3>
                                <span className='text-cyan-900/60 font-medium ml-2'>/ 3 months</span>
                            </div>
                            
                            <ul className='mt-8 space-y-5 text-cyan-900/80 flex-grow font-medium'>
                                <li className="flex items-center gap-3">
                                    <div className="bg-white p-1.5 rounded-full shadow-sm"><svg className="w-4 h-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg></div>
                                    Unlimited AI messages
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="bg-white p-1.5 rounded-full shadow-sm"><svg className="w-4 h-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg></div>
                                    Advanced AI logic
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="bg-white p-1.5 rounded-full shadow-sm"><svg className="w-4 h-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg></div>
                                    Priority email support
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="bg-white p-1.5 rounded-full shadow-sm"><svg className="w-4 h-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg></div>
                                    Unlimited Navigation
                                </li>     
                                <li className="flex items-center gap-3">
                                    <div className="bg-white p-1.5 rounded-full shadow-sm"><svg className="w-4 h-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg></div>
                                    Personalized Setup
                                </li>                         
                            </ul>

                            <button 
                                onClick={handlePay}
                                disabled={user?.plan === "pro"} 
                                className={`mt-8 h-14 w-full rounded-2xl font-bold tracking-wide transition-all duration-300 ${
                                    user?.plan === "pro"
                                    ? "bg-cyan-200 text-cyan-600 cursor-default"
                                    :"bg-gradient-to-r from-[#00C2CB] to-[#00D28E] text-white shadow-lg shadow-purple-/ hover:shadow-purple-/ hover:scale-[1.02] active:scale-95 cursor-pointer"
                                }`}>
                                {user?.plan === "pro" ? "Active Plan" : "Upgrade to Pro"}
                            </button>
                        </div>
                    </div>
            </div>
        </div>
    );
}

export default Billing;