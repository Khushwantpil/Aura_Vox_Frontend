import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { FiCopy, FiPlus, FiTrash2 } from 'react-icons/fi';
import { ServerURL } from './login';
import toast from 'react-hot-toast';
import { CLIENT_URL } from '../App';

const TONES = ["Professional", "Casual", "Friendly", "Formal", "Humorous"];
const THEMES = ["light", "dark", "glass", "neon"];

function Builder({ user, setUser }) {
  console.log("Builder rendered with user:", user);
  const [EditAssistant, setEditAssistant] = useState(!user?.isSetupComplete)
  const [assistantName, setAssistantName] = useState(user?.assistantName || "");
  const [businessName, setBusinessName] = useState(user?.businessName || "");
  const [businessType, setbusinessType] = useState(user?.businessType || "")
  const [businessDescription, setbusinessDescription] = useState(user?.businessDescription || "");
  const [theme, settheme] = useState(user?.theme?.toLowerCase() || "dark");
  const [tone, settone] = useState(user?.tone || "Professional")
  const [geminiApiKey, setgeminiApiKey] = useState(user?.geminiApiKey || "");
  const [pages, setpages] = useState(user?.pages || []);
  const [pageName, setPageName] = useState("");
  const [pagePath, setPagePath] = useState("");
  const [pageKeywords, setpageKeywords] = useState("");
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      setAssistantName(user.assistantName || "");
      setBusinessName(user.businessName || "");
      setbusinessType(user.businessType || "");
      setbusinessDescription(user.businessDescription || "");
      settheme(user.theme?.toLowerCase() || "dark");
      settone(user.tone || "Professional");
      setgeminiApiKey(user.geminiApiKey || "");
      setpages(user.pages || []);
    }
  }, [user]);
  const addPage = () =>{
    if(!pageName || !pagePath) return;
    const newPage = {
      name:pageName,
      path: pagePath,
      keywords: pageKeywords.split(",").map((k) =>k.trim())
    }
    setpages ([...pages, newPage])
    setPageName("")
    setPagePath("")
    setpageKeywords("")
  }
  const removePage = (index) => {
    const updatePages = pages.filter((_, i) => i !== index)
    setpages(updatePages)
  }
  const saveAssistant = async () => {
    setLoading(true)
    try {
      const data = {
        assistantName,
        businessName,
        businessType,
        businessDescription,
        tone,
        theme,
        geminiApiKey,
        pages,
      }
      const res = await axios.post(ServerURL + "/api/user/save-assistant", data , {withCredentials: true})
      console.log(res.data)
      setUser(res.data.user)
      setEditAssistant(false)
      toast.success("Assistant Saved Sucessfully")
      setLoading(false)
    } catch (error) {
      toast.error("Failed to save assistant")
      console.log(error)
      setLoading(false)
    }
  }
  const remainingMessages = 
    Math.max(
      0, (user?.requestLimit || 0) - (user?.totalMessages || 0)
    );

  const remainingDays = user?.proExpiresAt
    ? Math.max(0, Math.ceil((new Date(user.proExpiresAt) - new Date()) / (1000 * 60 * 60 * 24)))
    : 0;

  const embedCode = `<script src = "${CLIENT_URL}/assistant.js" 
  data-user-id = "${user?._id}"></script>`;
  return (
    <div className='min-h-screen bg-[#f7f8fc] px-4 py-8'>
      <div className='max-w-4xl mx-auto'>
        <div className='mb-8'>
          <h2 className='text-3xl font-bold text-[#081028]'>
            Assistant Builder
          </h2>
          <p className='text-gray-500 mt-1 '> Customize Your virtual assistant </p>
        </div>
        {user.isSetupComplete && !EditAssistant && (
          <div className='bg-white rounded-3xl border border-gray-100 shadow-sm p-6 mb-6'> 
            <p className='text-sm text-gray-400'>
                  Assistant
            </p>
            <h2 className='text-3xl font-bold text-[#081028] mt-1'>
              {user.assistantName}
            </h2>
            <p className='text-gray-500 mt-3 leading-7'>
              Your assistant is ready to be used on your website 
            </p>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6'>
              <div className='rounded-2xl border border-gray-100 bg-[#f8fafc] p-4'>
                <p className='text-sm text-gray-400'> Current Plan</p>
                <h2 className='text-xl font-bold text-[#081028] mt-1 capitalize'>
                  {user?.plan}
                </h2>
              </div>
              <div className='rounded-2xl border border-gray-100 bg-[#f8fafc] p-4'>
                <p className='text-sm text-gray-400'> Gemini Status</p>
                <h2 className={`text-xl font-bold mt-1 capitalize ${
                  user?.geminiStatus === "active"
                    ? "text-emerald-600"
                    : user?.geminiStatus === "invalid_key"
                    ? "text-red-500"
                    : "text-amber-500"
                }`}>
                  {user?.geminiStatus}
                </h2>
              </div>
              <div className='rounded-2xl border border-gray-100 bg-[#f8fafc] p-4'>
                <p className='text-sm text-gray-400'>
                  {user?.plan === "free" ? "Messages Left" : "Plan Expiry in"}
                </p>
                <h2 className='text-xl font-bold text-[#081028] mt-1 capitalize'>
                  {user?.plan === "free" ? remainingMessages : `${remainingDays} Days`}
                </h2>
              </div>
            </div>
            <div className='mt-7 '> 
              <div className='mt-4 rounded-2xl bg-amber-50 border border-amber-200 p-4'>
                <p className='text-sm font-semibold text-amber-900'>
                  Where to paste this script
                </p>
                <p className='text-sm text-amber-700 mt-2 leading-2'>
                  Paste this script before the closing {" "}
                  <span className='font-semibold'> {"</body>"}</span>
                  {" "}
                  tag of your website HTML file.
                  <br/>
                  <br/>
                  Example:
                </p>

                <pre className='mt-3 bg-[#0b1020] text-emerald-300 rounded-xl p-3 text-xs font-mono overflow-x-auto'>
                  {`<body>
                    
    Your Website Content 
    <script src="${CLIENT_URL}/assistant.js" data-user-id="${user?._id}"></script>

</body>`}
                </pre>
                 </div>

                 <p className='text-sm font-medium text-[#081028] mb-3 mt-3'> 
                    Embed Code
                 </p>
            </div>
            <div className='relative'>
              <textarea readOnly value = {embedCode} className='w-full h-28 bg-[#0b1020] text-emerald-400
              rounded-2xl p-4 text-sm font-mono resize-none outline-none'/>
              <button  onClick={() =>{
                navigator.clipboard.writeText(embedCode);
                toast.success("Copied")
              }} className='absolute top-4 right-4 w-10 h-10 rounded-xl bg-white flex items-center justify-center'>
                <FiCopy/>
              </button>
               </div>
               <button onClick={() => setEditAssistant(true)}
               className='mt-6 w-full sm:w-auto px-8 h-14 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-600
               text-white font-medium hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer'>
                  Edit Assistant
               </button>
          </div>
        )}
        
        {EditAssistant && (
        <div className='space-y-6'>
          <div className='bg-white rounded-3xl border border-gray-100 shadow-sm p-6'>
            <h2 className='text-lg font-semibold mb-5'> Basic Information</h2>
            <div className='space-y-4'>
              <input type="text"
                onChange={(e) => setAssistantName(e.target.value)}
                value={assistantName}
                placeholder='Assistant Name'
                className='w-full border border-gray-200 rounded-2xl px-4 py-3 font-normal text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-purple-500 transition-colors' />

              <input type="text"
                onChange={(e) => setBusinessName(e.target.value)}
                value={businessName}
                placeholder='Business Name'
                className='w-full border border-gray-200 rounded-2xl px-4 py-3 font-normal text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-purple-500 transition-colors' />

              <input type="text"
                onChange={(e) => setbusinessType(e.target.value)}
                value={businessType}
                placeholder='Business Type'
                className='w-full border border-gray-200 rounded-2xl px-4 py-3 font-normal text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-purple-500 transition-colors' />

              <textarea type="text" rows={4}
                onChange={(e) => setbusinessDescription(e.target.value)}
                value={businessDescription}
                placeholder='Business Description'
                className='w-full border border-gray-200 rounded-2xl px-4 py-3 resize-none font-normal text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-purple-500 transition-colors' />

            </div>
          </div>
          <div className='bg-white rounded-3xl border border-gray-100 shadow-sm p-6'>
            <h2 className='text-lg font-semibold mb-5'>
              Appearance
            </h2>
            <div>
              <label className='text-sm text-gray-600 mb-3 block'>Theme</label>
              <div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
                {THEMES.map((item) => (
                  <button key={item} onClick={() => settheme(item)}
                    className={`py-3 rounded-2xl border-2 capitalize ${theme === item
                      ? "border-purple-500 bg-purple-50 text-purple-700"
                      : "border-gray-200"}`}>
                    {item}
                  </button>
                ))}
              </div>

            </div>
            <div className='mt-6'>
              <label className='text-sm text-gray-600 mb-3 block'>Assistant Tone</label>
              <div className='grid grid-cols-2 sm:grid-cols-5 gap-3'>
                {TONES.map((item) => (
                  <button key={item} onClick={() => settone(item)}
                    className={`py-3 rounded-2xl border-2 capitalize ${tone === item
                      ? "border-purple-500 bg-purple-50 text-purple-700"
                      : "border-gray-200"}`}>
                    {item}
                  </button>
                ))}
              </div>

            </div>
          </div>

          <div className='bg-white rounded-3xl border border-gray-100 shawdow-sm p-6'>
            <div className='flex items-center justify-between mb-5 gap-4 flex-wrap'>
              <div>
                <h2 className='text-lg font-semibold'> Gemini API KEY </h2>
                <p className='text-sm text-gray-400 mt-1'> Add your Gemini API key to power your assistant </p>
              </div>
              <a href="https://aistudio.google.com/app/apikey" target="_blank"
              rel = "noopener noreferrer"
              className='px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-sm 
              font-medium hover:scale-[1.02] transition-all cursor-pointer'> Get API KEY</a>
            </div>
            <input type = "password" 
            placeholder='AIza.....'
            onChange={((e) => setgeminiApiKey(e.target.value))}
            value = {geminiApiKey}
            className='w-full border-gray-200 rounded-2xl px-4 py-3'/>
            <p className='text-xs text-gray-400 mt-3 leading-6'>
              Your API key is securely stored and used only for generating AI responses.
            </p>
          </div>
        <div className='bg-white rounded-3xl border border-gray-100 shadow-sm p-6'>
          <div className='flex items-center justify-between mb-5 flex-wrap'>
            <div>
              <h2 className='text-lg font-semibold'> Navigation Pages </h2>
                <p className='text-sm text-gray-400'> Assistant Can Redirect Users</p>             
            </div>
<button onClick = {addPage} className='flex items-center gap-2 px-4 py-2 
rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-sm'>
  <FiPlus/> Add
</button>
          </div>
<div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
    <input type= "text" placeholder='Page Name'
    className='border border-gray-200 rounded-2xl px-4 py-3'
    onChange={((e) => setPageName(e.target.value))}
    value={pageName}/>
    
    <input type= "text" placeholder='/pricing'
    className='border border-gray-200 rounded-2xl px-4 py-3'
    onChange={((e) => setPagePath(e.target.value))}
    value={pagePath}/>
    <input type= "text" placeholder='Plan'
    className='border border-gray-200 rounded-2xl px-4 py-3'
    onChange={((e) => setpageKeywords(e.target.value))}
    value={pageKeywords}/>
</div>
        <div className='mt-5 space-y-3'>
        {
          pages.map((page, index) => (
            <div key = {index}
            className='flex items-center justify-between border border-gray-100
            rounded-2xl p-4'> 
            <div>
              <p className='font-medium'> {page.name}</p>
              <p className='text-sm text-gray-400'> {page.path}</p>
              <p className='text-sm text-gray-400'>{page.keywords}</p>
              </div>
              <button onClick = {() =>removePage(index)}className='text-red-500'>
                <FiTrash2/>
              </button>
            </div>
          ))
        }
        </div>
        </div>
        <button onClick={saveAssistant} disabled ={loading || !assistantName||
        !businessName||
        !businessType||
        !businessDescription||
        !tone||
        !theme||
        !geminiApiKey} className='w-full h-14 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-500
        text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed'>
          {
            loading ? "Saving..." : user.isSetupComplete ? "Update Assistant" : "Save Assistant "
          }
        </button>
        </div>)}
      </div>
    </div>
  )
}

export default Builder;