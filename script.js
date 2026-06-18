// MM Films - Frontend Logic
const API_BASE_URL = "https://mmfilms-backend.onrender.com";

// Password aur Link ka mapping
const linkMap = {
    'ADI2026WED123': 'https://drive.google.com/drive/folders/1bIywrE6SS-I8JP-s1Weti0jLkJO1FH63?usp=sharing',
    'MM2026EVT456': 'https://yahan_dusra_link_dalein.com',
    'ADITYA2025GOLD': 'https://yahan_teesra_link_dalein.com'
};

// Main function (naam checkAccess rakha hai kyunki aapka event listener isi naam ka hai)
function checkAccess() {
    const inputCode = document.getElementById('accessCode')?.value.trim(); // Aapki ID 'accessCode' use ki
    
    if (linkMap.hasOwnProperty(inputCode)) {
        window.open(linkMap[inputCode], '_blank');
    } else {
        alert("Galat code! Kripya sahi password dalein.");
    }
}

// Enter key ke liye event listener (Jo aapke paas pehle se tha)
document.getElementById('accessCode')?.addEventListener('keydown', e => { 
    if (e.key === 'Enter') {
        checkAccess(); 
    }
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
