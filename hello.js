

const quoteSets = [
  
    "The only way to do great work is to love what you do.",
    "Stay hungry, stay foolish.",
    "Simplicity is the ultimate sophistication.",
  
 
    "Design is how it works.",
    "Less, but better.",
    "Make it simple, but significant.",
  
  
    "Creativity is intelligence having fun.",
    "Every great design begins with an even better story.",
    "Have the courage to be simple.",
  
];

const quoteList = document.createElement("p");
quoteList.style.color = "#111";


quoteList.style.lineHeight = "1.6";
quoteList.style.padding = "0.5rem 1.25rem 0.5rem 2rem";

let typingToken = 0;
let quoteIndex = 0;

function renderQuoteList() {
  const token = ++typingToken;
  quoteList.replaceChildren();

  quoteIndex = Math.floor(Math.random() * quoteSets.length);
  const chosenQuotes = quoteSets[quoteIndex];

  typeQuotes([chosenQuotes], 0, token);
}

function typeQuotes(items, quoteIndex, token) {
  if (token !== typingToken) {
    return;
  }

  if (quoteIndex >= items.length) {
    setTimeout(function () {
      if (token !== typingToken) {
        return;
      }
      renderQuoteList();
    }, 1200);
    return;
  }

  const item = document.createElement("p");
  item.style.color = "#111";
  item.style.textAlign = "justify";
  quoteList.appendChild(item);

  typeWords(item, items[quoteIndex], token, function () {
    typeQuotes(items, quoteIndex + 1, token);
  });
}

function typeWords(item, quote, token, done) {
  const words = quote.split(" ");
  let wordIndex = 0;
  let charIndex = 0;
  let wordSpan = null;

  function tick() {
    if (token !== typingToken) {
      return;
    }

    if (wordIndex >= words.length) {
      setTimeout(function () {
        reverseQuote(item, token, done);
        
      }, 500);
      return;
    }

    if (charIndex === 0) {
      if (wordIndex > 0) {
        item.appendChild(document.createTextNode(" "));
      }
      wordSpan = document.createElement("span");
      if (quoteIndex % 2 === 0) {
        wordSpan.style.backgroundColor = "";
      } else {
        wordSpan.style.backgroundColor = "blue";
      }
      const randomAngle = Math.floor(Math.random() * (15 - (-15) + 1)) + (-15);
  console.log(randomAngle);
      wordSpan.style.display = 'inline-block';
      wordSpan.animate(
        [
          { transform: 'scale(0.5)' }, // Small
          { transform: 'scale(1)', rotate: `${randomAngle}deg` }  // Big
        ],
        {
          duration: 400,        // Duration in milliseconds (0.4s)
          easing: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)',
          fill: 'both'      // Keeps the final big size after animation
        }
      );  

      wordSpan.style.color = "#111";
      wordSpan.style.padding = "0 0.15rem";
      item.appendChild(wordSpan);
    }

    wordSpan.textContent += words[wordIndex][charIndex];
    
    charIndex += 1;

    if (charIndex >= words[wordIndex].length) {
      wordIndex += 1;
      charIndex = 0;
    }

    setTimeout(tick, 45);
  }

  tick();
}

function reverseQuote(item, token, done) {
  function tick() {
    if (token !== typingToken) {
      return;
    }

    const last = item.lastChild;
    if (!last) {
      item.remove();
      done();
      return;
    }

    if (last.textContent.length > 1) {
      last.textContent = last.textContent.slice(0, -1);
    } else {
      last.remove();
    }

    setTimeout(tick, 45);
  }

  tick();
}

function changeQuoteList() {
  renderQuoteList();
}


changeQuoteList();
document.getElementById("2027_p1_input").appendChild(quoteList);
changeQuoteList();
