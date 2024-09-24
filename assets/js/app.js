!(function () {
  "use strict";
  var e, t;

  // Check and apply theme from local storage
  function applyStoredTheme() {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      document.body.setAttribute("data-bs-theme", storedTheme);
    }
  }

  applyStoredTheme();

  // Initialize tooltips
  [].slice
    .call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    .map(function (t) {
      return new bootstrap.Tooltip(t);
    });

  // Initialize popovers
  [].slice
    .call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    .map(function (t) {
      return new bootstrap.Popover(t);
    });

  e = document.getElementsByTagName("body")[0];
  t = document.querySelectorAll(".light-dark-mode");

  if (t && t.length) {
    t.forEach(function (t) {
      t.addEventListener("click", function (t) {
        var newTheme;
        if (
          e.hasAttribute("data-bs-theme") &&
          "dark" == e.getAttribute("data-bs-theme")
        ) {
          newTheme = "light";
        } else {
          newTheme = "dark";
        }
        document.body.setAttribute("data-bs-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      });
    });
  }

  Waves.init();
})();
