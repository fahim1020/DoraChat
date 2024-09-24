const resetBtn = document.querySelector(".reset-btn");
const newPassword = document.querySelector("#new-pass");
const confirmPassword = document.querySelector("#confirm-pass");

if (window.location.pathname.includes("/auth-resetpw.html")) {
  // Check if token exists in URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  if (!urlParams.has("token")) {
    window.location.href = "/auth-recoverpw.html";
  } else {
    // Define an async function to handle password reset
    resetBtn.addEventListener("click", async () => {
      // Check all fields are not empty
      if (newPassword.value === "" || confirmPassword.value === "") {
        showToast("Passwords must not be empty!", false);
        return;
      }
      // Check passwords match
      if (newPassword.value !== confirmPassword.value) {
        showToast("Passwords do not match!", false);
        return;
      }
      // Check password length
      if (newPassword.value.length < 8) {
        showToast("Password must be at least 8 characters long!", false);
        return;
      }

      const token = urlParams.get("token");
      //   console.log(token);

      try {
        const res = await fetch("http://localhost:3000/api/reset-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token,
            newPass: newPassword.value,
          }),
        });
        console.log(res.ok);
        if (res.ok) {
          //reset form
          newPassword.value = "";
          confirmPassword.value = "";;

          showToast("Password reset successful!", true);
          window.location.href = "/auth-login.html";
        } else {
          const errorData = await res.json();
          showToast(errorData.message || "Invalid token!", false);
        }
      } catch (error) {
        showToast("An error occurred. Please try again later.", false);
        console.error("Error resetting password:", error);
      }
    });
  }
}
