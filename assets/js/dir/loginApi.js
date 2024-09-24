function showToast(message, isSuccess) {
  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "left",
    backgroundColor: isSuccess ? "#00b09b" : "#d9534f",
  }).showToast();
}

const form = document.querySelector(".login-form");
form.addEventListener("submit", loginHandler);

async function loginHandler(event) {
  event.preventDefault();
  const data = JSON.stringify({
    username: form.username.value,
    password: form.password.value,
  });
  if (form.password.value === "" || form.password.value === "") {
    showToast("All field is required", false);
    return; 
  }

  let response = await fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: data,
  });

  const result = await response.json();

  if (response.ok) {
    showToast(result.message, true);
    localStorage.setItem("email", result.user.email);
    localStorage.setItem("username", result.user.username);
    window.location.href = "/";
  } else {
    showToast(result.message, false);
  }
}
