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

// 2. Booking Form Submission (Updated for MM Films Form)
document.querySelector('form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Alag se koi div na ho toh alert dikhane ke liye status
    alert("Sending your booking request... Please wait.");
    
    // Aapke form ke inputs se data uthana
    const bookingData = {
        name: document.querySelector('input[placeholder="Your name"]')?.value,
        phone: document.querySelector('input[placeholder="+91 XXXXX XXXXX"]')?.value,
        email: document.querySelector('input[placeholder="your@email.com"]')?.value,
        date: document.querySelector('input[type="date"]')?.value,
        eventType: document.querySelector('select')?.value, 
        message: document.querySelector('textarea')?.value
    };

    try {
        const response = await fetch(`${API_BASE_URL}/api/bookings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookingData)
        });

        if (response.ok) {
            alert("🎉 Booking request submitted successfully!");
            document.querySelector('form').reset();
        } else {
            alert("❌ Failed to submit request. Please try again.");
        }
    } catch (error) {
        alert("❌ Server error. Could not send request.");
    }
});
