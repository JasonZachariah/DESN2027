

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

 function changeQuoteList() {
  renderQuoteList();
  setInterval(() => {
    quoteSetIndex = (quoteSetIndex + 1) % quoteSets.length;
    renderQuoteList();
  }, 1000);
}


changeQuoteList();
document.getElementById("2027_p1_input").appendChild(quoteList);
