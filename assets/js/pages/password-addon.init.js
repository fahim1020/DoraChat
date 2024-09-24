document
  .getElementById("password-addon")
  .addEventListener("click", function () {
    var e = document.getElementById("password-input");
    "password" === e.type ? (e.type = "text") : (e.type = "password");
  });

const oldPass = document.querySelector("#oldpassword-input");
const pass = document.querySelector("#password-input");
const confirmPass = document.querySelector("#confirmpassword-input");
const saveBtn = document.querySelector(".save-Btn");
const cancelBtn = document.querySelector(".cancel-Btn");

saveBtn.addEventListener("click", async () => {
  // Check if any fields are empty
  if (oldPass.value === "" || pass.value === "" || confirmPass.value === "") {
    return showToast("All fields are required!", false);
  }
  if (pass.value.length < 8) {
    return showToast("Passwords must be at least 8 characters", false);
  }

  // Check if the new password and confirmation match
  if (pass.value !== confirmPass.value) {
    return showToast("Passwords do not match!", false);
  }

  // Send the request to change the password
  let res = await fetch("http://localhost:3000/api/change-pass", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      oldPass: oldPass.value,
      newPass: pass.value,
    }),
  });
  const data = await res.json();
  if (res.ok) {
    // reset all
    oldPass.value == "";
    newPass.value == "";
    confirmPass.value = "";
    showToast("Password changed successfully!", true);
    // Optionally, redirect or reset the form here
  } else {
    showToast(data.message || "Failed to change password!", false);
  }
});

cancelBtn.addEventListener("click", () => {
  window.location.href = "/";
});

