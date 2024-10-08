function themeColor() {
  switch (window.localStorage.getItem("activeCustomcolor")) {
    case "customizer-color01":
      document.documentElement.style.setProperty(
        "--bs-primary-rgb",
        "97, 83, 204"
      );
      break;
    case "customizer-color02":
      document.documentElement.style.setProperty(
        "--bs-primary-rgb",
        "4, 135, 101"
      );
      break;
    case "customizer-color03":
      document.documentElement.style.setProperty(
        "--bs-primary-rgb",
        "48, 197, 210"
      );
      break;
    case "customizer-color04":
      document.documentElement.style.setProperty(
        "--bs-primary-rgb",
        "25, 176, 236"
      );
      break;
    case "customizer-color05":
      document.documentElement.style.setProperty(
        "--bs-primary-rgb",
        "117, 76, 195"
      );
      break;
    case "customizer-color06":
      document.documentElement.style.setProperty(
        "--bs-primary-rgb",
        "226, 148, 50"
      );
      break;
    case "customizer-color07":
      document.documentElement.style.setProperty(
        "--bs-primary-rgb",
        "14, 126, 211"
      );
      break;
    case "customizer-color08":
      document.documentElement.style.setProperty(
        "--bs-primary-rgb",
        "31, 196, 171"
      );
      break;
    default:
      document.documentElement.style.setProperty("--bs-primary-rgb", "");
  }
}
themeColor();
