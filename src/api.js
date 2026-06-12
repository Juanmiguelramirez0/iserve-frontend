// src/api.js
const API_URL = "https://iserve-backend-xxxx.onrender.com/api";

export const submitRequest = async (requestData) => {
    // 1. Get the token saved by your LoginModal/useAuth hook
    const token = localStorage.getItem("token");

    // 2. Send the request to your Node.js backend
    const response = await fetch(`${API_URL}/requests`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // This tells the backend WHO you are
        },
        body: JSON.stringify(requestData)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to submit request");
    }

    return data;
};