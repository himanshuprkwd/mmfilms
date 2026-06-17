// MM Films - Frontend Logic (Connected to Google Forms)
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

// 2. Booking Form Submission (Sahi Form Target Kiya Hai)
// Hum us button ko dhoondh rahe hain jisme "SEND BOOKING REQUEST" likha hai
document.querySelectorAll('form').forEach((form) => {
    // Check karte hain ki kya is form ke andar booking wala button hai
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn && submitBtn.innerText.toUpperCase().includes("BOOKING")) {
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Data collect karna aapke inputs se
            const name = form.querySelector('input[placeholder="Your name"]')?.value || "";
            const phone = form.querySelector('input[placeholder="+91 XXXXX XXXXX"]')?.value || "";
            const email = form.querySelector('input[placeholder="your@email.com"]')?.value || "";
            const date = form.querySelector('input[type="date"]')?.value || "";
            const eventType = form.querySelector('select')?.value || ""; 
            const message = form.querySelector('textarea')?.value || "";

            // Chunki baaki entries ke code nahi hain, hum Mobile Number wale column mein hi phone aur extra details jod kar bhej rahe hain taaki Google Sheet mein sab dikhe!
            const combinedPhoneDetails = `${phone} | Date: ${date} | Event: ${eventType} | Msg: ${message}`;

            const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdB9oPEsUvItE8xolmuIKWexIPBkTh2uXB93YZHhgYizHLlBQ/formResponse";

            const formData = new FormData();
            formData.append('entry.243524310', name);                // Full Name
            formData.append('entry.61166254', combinedPhoneDetails);  // Phone + All Details combined
            formData.append('entry.179896706', email);               // Email

            try {
                // Google Form ko background mein hit karna
                await fetch(GOOGLE_FORM_URL, {
                    method: 'POST',
                    mode: 'no-cors', 
                    body: formData
                });

                alert("🎉 Booking request submitted successfully!");
                form.reset();
            } catch (error) {
                alert("❌ Something went wrong. Please try again.");
            }
        });
    }
});
