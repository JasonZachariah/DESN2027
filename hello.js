alert("Test123");

document.querySelectorAll("button").forEach(function (button) {
  const originalBackground = button.style.backgroundColor;

  button.addEventListener("mouseenter", function () {
    button.style.backgroundColor = "red";
  });

  button.addEventListener("mouseleave", function () {
    button.style.backgroundColor = originalBackground;
  });
});
