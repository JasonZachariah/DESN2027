alert("Test123");

const button = document.getElementsByClassName("button");
button.type = "button";
button.textContent = "Hover me";
button.style.padding = "0.75rem 1.5rem";
button.style.fontSize = "1rem";
button.style.border = "none";
button.style.borderRadius = "6px";
button.style.background = "#222";
button.style.color = "#fff";
button.style.cursor = "pointer";
button.style.transition = "transform 0.15s ease";

button.addEventListener("mouseenter", function () {
  button.style.transform = "scale(1.25)";
});

button.addEventListener("mouseleave", function () {
  button.style.transform = "scale(1)";
});

document.body.appendChild(button);
