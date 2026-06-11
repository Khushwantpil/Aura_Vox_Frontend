(function () {
    // userData
    const script = document.currentScript;
    const userId = script?.dataset?.userId;
    const theme = "dark";

    let assistantConfig = null;

    // load css
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://aura-vox-frontend.vercel.app/assistant.css";
    document.head.appendChild(link);

    //Create Pop-up
    const popUp = document.createElement("div");
    popUp.className = `Aura-popup theme-${theme}`;

    popUp.innerHTML = `
    <div class = "aura-overlay"></div>
    <div class = "aura-content">
    <div class = "aura-top">
    <div class = "aura-orb-wrap">
        <div class ="aura-orb-glow"></div>
        <div class = "aura-orb"></div>
    </div>
    <h2 class = "aura-title">
    Hello I'm Aura Vox</h2>

    <p class="aura-sub">
        Ask any query about the website
    </p>
    <div class = "aura-status">
    Tap button to Speak </div>

    <div class ="aura-wave"> 
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    </div>

    <!-- User Text -->
        <div class = "aura-user-text"> </div>
    <!-- AI Text -->
        <div class = "aura-ai-text"> </div>
    
    </div>

    <div class = "aura-bottom">
        <button class= "aura-mic">
        <svg style="width: 24px; height: 24px; color: white;" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
        </svg>
        </button>
    </div>
    </div>
    `;

    document.body.appendChild(popUp);

    /*Floating Button */
    const button = document.createElement("button");
    button.className = `aura-button theme-${theme}`;
    button.innerHTML = `
        <svg style="width: 32px; height: 32px; color: white;" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
        </svg>
    `;
    document.body.appendChild(button);

    //toggle pop-up
    let isOpen = false;

    button.onclick = () => {
        isOpen = !isOpen;
        popUp.style.display = isOpen ? "block" : "none";
        button.style.display = isOpen ? "none" : "flex";
    };

    const overlay = popUp.querySelector('.aura-overlay');
    if (overlay) {
        overlay.onclick = () => {
            isOpen = false;
            popUp.style.display = "none";
            button.style.display = "flex";
        };
    }

    // Close popup when clicking outside of it
    document.addEventListener("click", (event) => {
        if (isOpen && !popUp.contains(event.target) && !button.contains(event.target)) {
            isOpen = false;
            popUp.style.display = "none";
            button.style.display = "flex";
        }
    });

    //load Assistant 
    const loadAssistant = async () => {
        try {
            if (!userId) return;
            const res = await fetch(`https://aura-vox-backend.onrender.com/api/assistant/config/${userId}`);
            const data = await res.json();
            if (data && data.user){
                assistantConfig = data.user;
                applyConfig();
            }
        } catch (error) {
            console.log("Assistant Load Error:", error);
        }
    };

    const applyConfig = () => {
        if (!assistantConfig) return;
        popUp.className = `Aura-popup theme-${assistantConfig.theme}`;
        button.className = `aura-button theme-${assistantConfig.theme}`;
        const title = popUp.querySelector(".aura-title");
        if (title) title.innerHTML = `Hello I'm ${assistantConfig.assistantName}`;
        
        const subtitle = popUp.querySelector(".aura-sub");
        if (subtitle) {
            subtitle.innerHTML= `Welcome to ${assistantConfig.businessName}.<br/>Ask anything about the website.`;
        }
    };

    loadAssistant();

    //elements 
    const status = popUp.querySelector(".aura-status");
    const wave = popUp.querySelector(".aura-wave");
    const userText = popUp.querySelector(".aura-user-text");
    const aiText = popUp.querySelector(".aura-ai-text");
    const mic = popUp.querySelector(".aura-mic");

    // text-speech 

    const speak = (text) => {
        window.speechSynthesis.cancel();

        //show AI response 
        if(aiText) aiText.innerText = text;
        if(status) status.innerText = "AI Speaking...";
        const speech = new SpeechSynthesisUtterance(text);

        speech.lang = "hi-IN";
        speech.rate = 1; 
        speech.pitch = 1;
        speech.volume = 1;

        //voice end 
        speech.onend = () => {
            if(status) status.innerText = "Tap button to speak";
            if(wave) wave.style.opacity = "0";
        };
        //start speaking 
        window.speechSynthesis.speak(speech);
    };

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition){
        
        const recognition = new SpeechRecognition();

        recognition.lang = "en-US";
        recognition.continuous = false;
        recognition.interimResults = false;

        mic.onclick = () =>{
            wave.style.opacity = "1";
            status.innerText = "Listening...";
            userText.innerText = "";
            recognition.start();
        };

        recognition.onresult = (e) =>{
            const text = e.results[0][0].transcript;
            userText.innerText = "You: "+text;
            recognition.stop();

            (async () => {
                try {
                    status.innerText = "Thinking...";

                    const res = await fetch("https://aura-vox-backend.onrender.com/api/assistant/ask", {
                        method : "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            message:text,
                            userId
                        })
                    });
                    const data = await res.json();
                    console.log(data);

                    if (data.success){
                        if (data.action == "navigate"){
                            speak(data.response);

                            setTimeout(() =>{
                                window.location.href = data.path;
                            }, 800);
                        } else {
                            speak(data.aiResponse);
                        }
                    } else {
                        speak(data.message || "Response Error Please Check Your Plan ");
                    }
                } catch (error) {
                    console.log(error);
                    speak("AI Server Error");
                }
            })();
        };
        
        recognition.onerror = () =>{
            status.innerText = "Tap to speak";
            wave.style.opacity = "0";
        };  
    }
    else {
        if(status) status.innerText = "Speech Recognition not supported";
    }
})();
