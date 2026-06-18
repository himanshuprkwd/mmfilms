// MM Films - Frontend Logic
const API_BASE_URL = "https://mmfilms-backend.onrender.com";

function checkAccess() {
    // 1. Element ko get karo
    const codeInput = document.getElementById('accessCode');
    const res = document.getElementById('access-result');
    
    // 2. Check karo ki input mila ya nahi
    if (!codeInput) {
        alert("Error: Input box nahi mila! ID check karo.");
        return;
    }

    const code = codeInput.value.trim().toUpperCase();
    
    // 3. Test karo ki kya code sahi se read ho raha hai
    console.log("Input value is:", code); 

    if (code === 'ADI2026WED123' || code === 'MM2026EVT456' || code === 'ADITYA2025GOLD') {
        alert("Code Sahi Hai! Ab Redirect ho raha hai...");
        window.location.href = "https://drive.google.com/drive/folders/1bIywrE6SS-I8JP-s1Weti0jLkJO1FH63?usp=sharing";
    } else {
        res.innerHTML = "Invalid Code!";
        alert("Code Galat hai, check karo.");
    }
}
// Enter key ke liye event listener
document.getElementById('accessCode')?.addEventListener('keydown', e => { 
    if (e.key === 'Enter') checkAccess(); 
});

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
