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
            // Yahan aap redirect kar sakte hain apni main client gallery par
            // window.location.href = "/client-gallery.html"; 
        } else {
            messageDiv.innerText = data.message || "Invalid Code.";
            messageDiv.style.color = "red";
        }
    } catch (error) {
        messageDiv.innerText = "Connection error. Please try again later.";
        messageDiv.style.color = "red";
    }
});

// 2. Booking Form Submission
document.getElementById('booking-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const messageDiv = document.getElementById('booking-message');
    
    const bookingData = {
        name: document.getElementById('booking-name')?.value,
        email: document.getElementById('booking-email')?.value,
        service: document.getElementById('booking-service')?.value,
        date: document.getElementById('booking-date')?.value,
        message: document.getElementById('booking-text')?.value
    };

    try {
        messageDiv.innerText = "Sending request...";
        messageDiv.style.color = "orange";

        const response = await fetch(`${API_BASE_URL}/api/bookings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookingData)
        });

        const data = await response.json();

        if (response.ok) {
            messageDiv.innerText = "Booking request submitted successfully!";
            messageDiv.style.color = "green";
            document.getElementById('booking-form').reset();
        } else {
            messageDiv.innerText = data.message || "Failed to submit request.";
            messageDiv.style.color = "red";
        }
    } catch (error) {
        messageDiv.innerText = "Server error. Could not send request.";
        messageDiv.style.color = "red";
    }
});
