const recoverEmail = document.querySelector("#recover-email");

document.querySelector(".recover-btn").addEventListener("click", async () => {
  if (recoverEmail.value === "") {
    return showToast("Email field is required!", false);
  }
  // Send the request to recover the password
  let res = await fetch("http://localhost:3000/api/recover-pass", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: recoverEmail.value,
    }),
  });
  if (res.ok) {
    showToast("Password recovery email sent!", true);
    recoverEmail.value = "";
  }
});
