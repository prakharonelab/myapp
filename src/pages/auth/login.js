const { ipcRenderer } = require("electron");

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  console.log("called");
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Perform validation
  if (!email || !password) {
    alert("Email and Password are required.");
    return;
  }

  try {
    // Send the login data to the Next.js API route
    const response = await fetch(
      "http://localhost:3000/api/auth/callback/credentials",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      // Send success response to main Electron process
      ipcRenderer.send("login-success", data);
    } else {
      alert(data.message || "Login failed.");
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert("An error occurred during login.");
  }
});
