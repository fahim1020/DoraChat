// Function to show a toast notification
function showToast(message, isSuccess) {
  console.log("Showing toast:", message, isSuccess);
  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "left",
    backgroundColor: isSuccess ? "#00b09b" : "#d9534f",
  }).showToast();
}

// Function to handle form submission
async function handleFormSubmit(event) {
  event.preventDefault(); // Prevent the default form submission

  const form = document.getElementById("registrationForm");
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    // Send data to the API
    const response = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include", // Send cookies with the request
    });

    const result = await response.json();
    if (!response.ok) {
      showToast(result.message, false);
      return;
    }

    showToast(result.message || "Registration successful!", true);
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  } catch (error) {
    console.error("Error:", error);
    showToast(error.message || "Registration failed. Please try again.", false);
  }
}

// Add event listener to the form
document
  .getElementById("registrationForm")
  .addEventListener("submit", handleFormSubmit);
