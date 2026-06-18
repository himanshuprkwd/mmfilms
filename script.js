// MM Films - Frontend Logic
const API_BASE_URL = "https://mmfilms-backend.onrender.com";

// 1. Gallery Access Code Verification
document.getElementById('access-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const codeInput = document.getElementById('access-code');
    const messageDiv = document.getElementById('access-message');
    const code = codeInput.value.trim();

    if (!code) return;

    try {
        messageDiv.innerText = "Verifying code...";
        messageDiv.style.color = "orange";

        const response = await fetch(`${API_BASE_URL}/api/gallery/access?code=${code}`);
        const data = await response.json();

        if (response.ok) {
            messageDiv.innerText = `Access Granted! Welcome ${data.clientName}. Redirecting...`;
            messageDiv.style.color = "green";
        } else {
            messageDiv.innerText = data.message || "Invalid Code.";
            messageDiv.style.color = "red";
        }
    } catch (error) {
        messageDiv.innerText = "Connection error. Please try again later.";
        messageDiv.style.color = "red";
    }
});
/* ── GALLERY ACCESS ── */
const validCodes=['ADI2026WED123','MM2026EVT456','ADITYA2025GOLD'];
function checkAccess(){
  const code=document.getElementById('accessCode').value.trim().toUpperCase();
  const res=document.getElementById('access-result');
  if(validCodes.includes(code)){
    res.innerHTML='<div class="access-success"><i class="fas fa-check-circle"></i> Access Granted! Your gallery is ready. <a href="#portfolio" style="color:inherit;text-decoration:underline">View Photos →</a></div>';
  } else if(!code){
    res.innerHTML='<div class="access-error">Please enter your access code.</div>';
  } else {
    res.innerHTML='<div class="access-error"><i class="fas fa-times-circle"></i> Invalid access code. Please check with your photographer.</div>';
  }
}
document.getElementById('accessCode').addEventListener('keydown',e=>{ if(e.key==='Enter') checkAccess(); });

// 2. Booking Form Submission (Sahi Se Google Form Se Connected)
document.getElementById('google-booking-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    alert("Sending your booking request... Please wait.");
    
    // Saare extra fields ka data hum details ke sath extract kar rahe hain
    const name = document.getElementById('bf-name')?.value || "";
    const phone = document.getElementById('bf-phone')?.value || "";
    const email = document.getElementById('bf-email')?.value || "";
    const date = document.getElementById('bf-date')?.value || "";
    const eventType = document.getElementById('bf-type')?.value || "";
    const packageSelected = document.getElementById('bf-package')?.value || "None";
    const location = document.getElementById('bf-location')?.value || "Not Specified";
    const userMsg = document.getElementById('bf-message')?.value || "No message";

    // Baaki bache fields ka data Mobile Number wale section mein ek sath combine ho jayega taaki Google sheet mein sab mile!
    const combinedDetails = `${phone} | Date: ${date} | Event: ${eventType} | Pkg: ${packageSelected} | Venue: ${location} | Msg: ${userMsg}`;

    // Aapka exact Google Form Response link
    const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdB9oPEsUvItE8xolmuIKWexIPBkTh2uXB93YZHhgYizHLlBQ/formResponse";

    const formData = new FormData();
    formData.append('entry.243524310', name);             // Full Name
    formData.append('entry.61166254', combinedDetails);   // Phone + Saari Extra Details Ek Sath
    formData.append('entry.179896706', email);            // Email Address

    try {
        // Google server ko fetch request bhej rahe hain
        await fetch(GOOGLE_FORM_URL, {
            method: 'POST',
            mode: 'no-cors', 
            body: formData
        });

        alert("🎉 Booking request submitted successfully!");
        document.getElementById('google-booking-form').reset();
    } catch (error) {
        alert("❌ Something went wrong. Please try again.");
    }
});
