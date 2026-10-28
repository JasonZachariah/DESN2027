alert("Testteststst123");

const quoteSets = [
  [
    "The only way to do great work is to love what you do.",
    "Stay hungry, stay foolish.",
    "Simplicity is the ultimate sophistication.",
  ],
  [
    "Design is how it works.",
    "Less, but better.",
    "Make it simple, but significant.",
  ],
  [
    "Creativity is intelligence having fun.",
    "Every great design begins with an even better story.",
    "Have the courage to be simple.",
  ],
];

let quoteSetIndex = 0;
const quoteList = document.createElement("ul");
quoteList.style.color = "#111";
quoteList.style.backgroundColor = "#000";

quoteList.style.lineHeight = "1.6";
quoteList.style.padding = "0.5rem 1.25rem 0.5rem 2rem";

function renderQuoteList() {
  quoteList.replaceChildren();

  quoteSets[quoteSetIndex].forEach(function (quote) {
    const item = document.createElement("li");
    item.style.color = "#fff";
    item.textContent = quote;
    quoteList.appendChild(item);
  });
}

const changeQuoteButton = document.createElement("button");
changeQuoteButton.type = "button";
changeQuoteButton.textContent = "Change quote list";
changeQuoteButton.style.display = "block";
changeQuoteButton.style.margin = "1rem 0";
changeQuoteButton.addEventListener("click", function () {
  quoteSetIndex = (quoteSetIndex + 1) % quoteSets.length;
  renderQuoteList();
});

renderQuoteList();
document.body.appendChild(changeQuoteButton);
document.body.appendChild(quoteList);

document.querySelectorAll("button").forEach(function (button) {
  const originalBackground = button.style.backgroundColor;

  button.addEventListener("mouseenter", function () {
    button.style.backgroundColor = "red";
  });

  button.addEventListener("mouseleave", function () {
    button.style.backgroundColor = originalBackground;
  });
});
