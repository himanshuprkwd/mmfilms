// MM Films - Frontend Logic (Connected to Google Forms)
const API_BASE_URL = "https://mmfilms-backend.onrender.com";

// 1. Gallery Access Code Verification (Yeh Render se hi chalega)
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

// 2. Booking Form Submission (Direct to Google Form)
document.querySelector('form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Form data collect karna
    const name = document.querySelector('input[placeholder="Your name"]')?.value || "";
    const phone = document.querySelector('input[placeholder="+91 XXXXX XXXXX"]')?.value || "";
    const email = document.querySelector('input[placeholder="your@email.com"]')?.value || "";
    const date = document.querySelector('input[type="date"]')?.value || "";
    const eventType = document.querySelector('select')?.value || ""; 
    const message = document.querySelector('textarea')?.value || "";

    // Agar Date ya Message ke alag se code nahi hain, toh hum unhe Message wale box mein jod kar bhej rahe hain taaki saara data mile!
    const fullMessage = `Event Date: ${date} | Event Type: ${eventType} | Message: ${message}`;

    // Aapka Google Form URL
    const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdB9oPEsUvItE8xolmuIKWexIPBkTh2uXB93YZHhgYizHLlBQ/formResponse";

    // Data ko Google Form ke format mein pack karna
    const formData = new FormData();
    formData.append('entry.243524310', name);       // Full Name Code
    formData.append('entry.61166254', phone);        // Mobile Number Code
    formData.append('entry.179896706', email);       // Email Code

    try {
        // Google Form ko background mein data bhejna
        await fetch(GOOGLE_FORM_URL, {
            method: 'POST',
            mode: 'no-cors', 
            body: formData
        });

        alert("🎉 Booking request submitted successfully!");
        document.querySelector('form').reset();
    } catch (error) {
        alert("❌ Something went wrong. Please try again.");
    }
});
