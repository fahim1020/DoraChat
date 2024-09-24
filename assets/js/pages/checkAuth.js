async function checkAuth() {
  try {
    let res = await fetch("http://localhost:3000/api/checkauth", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!res.ok) {
      if (
        !window.location.pathname.includes("/auth-login.html") &&
        !window.location.pathname.includes("/auth-register.html") &&
        !window.location.pathname.includes("/auth-logout.html") &&
        !window.location.pathname.includes("/auth-recoverpw.html") &&
        !window.location.pathname.includes("/auth-resetpw.html")
      ) {
        document.querySelector(".api-loading").classList.add("hidden");
        window.location.href = "/auth-login.html";
      }
    } else {
      res = await res.json();

      if (
        window.location.pathname.includes("/auth-login.html") ||
        window.location.pathname.includes("/auth-register.html") ||
        window.location.pathname.includes("/auth-logout.html") ||
        window.location.pathname.includes("/auth-recoverpw.html") ||
        window.location.pathname.includes("/auth-resetpw.html")
      ) {
        window.location.href = "/";
      }
      //Manipulation

      //set profile names
      const profileNameElements = document.querySelectorAll(".profile-name");
      profileNameElements.forEach((element) => {
        if (element.tagName === "INPUT") {
          element.value = res.user.username;
        } else {
          element.textContent = res.user.username;
        }
      });
      //set profile email
      const profileEmail = document.querySelectorAll(".profile-email");
      profileEmail.forEach((element) => {
        if (element.tagName === "INPUT") {
          element.value = res.user.email;
        } else {
          element.textContent = res.user.email;
        }
      });
      // set location fields
      document.querySelectorAll(".location").forEach((element) => {
        if (element.tagName === "INPUT") {
          element.value = res.user.location;
        } else {
          element.textContent = res.user.location;
        }
      });
      //Set bio filed
      document.querySelectorAll(".bio").forEach((element) => {
        if (element.tagName === "INPUT") {
          element.value = res.user.bio;
        } else {
          element.textContent = res.user.bio;
        }
      });
      //Check if user email is valid or not
      if (!res.user.verified) {
        if (!window.location.pathname.includes("/email-verify.html")) {
          window.location.href = "/email-verify.html";
        }
      } else {
        if (window.location.pathname.includes("/email-verify.html"))
          window.location.href = "/";
      }

      //Set status
      document.querySelector("#main-status").textContent = res.user.status;
      const statusIcon = document.querySelector(".statusIcon");
      statusIcon.classList.remove("text-success");
      if (res.user.status === "Donotdisturb") {
        statusIcon.classList.add("text-danger");
      } else if (res.user.status === "Away") {
        statusIcon.classList.add("text-warning");
      } else {
        statusIcon.classList.add("text-success");
      }
    }
  } catch (error) {
    if (!window.location.pathname.includes("/auth-login.html")) {
      window.location.href = "/auth-login.html";
    }
    if (window.location.pathname.includes("/auth-login.html")) {
      document.querySelector(".api-loading").classList.remove("hidden");
    }
  }
}

checkAuth();
