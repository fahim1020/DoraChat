const verificationCodeInput = document.querySelector("#verificationCode");
const inputCodeContainer = document.querySelector(".inputCode");
const sendCodeButton = document.querySelector(".sendCode");
sendCodeButton.addEventListener("click", async () => {
  let userEmail = document.querySelector(".profile-email").textContent;

  if (sendCodeButton.textContent === "Send Code") {
    // Send request to generate and send verification code
    const res = await fetch(
      "http://localhost:3000/api/send-verification-email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail }),
      }
    );


    if (res.ok) {
      try {
        inputCodeContainer.classList.remove("hidden");
        sendCodeButton.textContent = "Submit Code";
        showToast("Verification email sent successfully", true);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        showToast("Failed to send verification email", false);
      }
    } else {
      console.error("Failed with status:", res.status);
      showToast("Failed to send verification email", false);
    }
  } else {
    const code = verificationCodeInput.value;

    if (code === "") {
      showToast("Please enter your verification code", false);
      return;
    }

    // Send request to verify the code
    const res = await fetch("http://localhost:3000/api/verify-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: userEmail, code }),
    });

    if (res.ok) {
      try {
        const jsonResponse = await res.json();
        console.log("Verification response:", jsonResponse);
        showToast("Verification successful", true);
        window.location.href = "/";
      } catch (error) {
        console.error("Error parsing JSON:", error);
        showToast("Invalid verification code", false);
      }
    } else {
      console.error("Failed with status:", res.status);
      showToast("Invalid verification code", false);
    }
  }
});
