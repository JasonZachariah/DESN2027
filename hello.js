

const SUPABASE_URL = "https://xtjhtiygsdfuwsstgter.supabase.co";
const SUPABASE_KEY = "sb_publishable_BDkOPpb5mDfpIhMrTujHvw_0XD5JXtq";
const SUPABASE_TABLE = "live_quotes";

async function loadQuoteSetsFromApiTest() {
  if (typeof supabase === "undefined") {
    return;
  }

  const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  const { data, error } = await client.from(SUPABASE_TABLE).select("quote,name,stream");
  

  if (error || !data) {
    return;
  }

  const quotes = data
    .map(function (row) {
      const text = typeof row.quote === "string" ? row.quote.trim() : "";
      const name = typeof row.name === "string" ? row.name.trim() : "";
      const stream = typeof row.stream === "string" ? row.stream.trim() : "";
      if (!text) {
        return null;
      }
      return {
        text: name ? text + " - " + name : text,
        stream: stream
      };
    })
    .filter(function (quote) {
      return quote;
    });

  if (!quotes.length) {
    return;
  }

  quoteSets.splice(0, quoteSets.length);
  quotes.forEach(function (quote) {
    quoteSets.push(quote);
  });

}

const quoteSets = [
  
  
  
];

const quoteList = document.createElement("p");



quoteList.style.lineHeight = "1.2";
quoteList.style.padding = "0.5rem 1.rem 0.5rem 1rem";

let typingToken = 0;
let quoteIndex = 0;
let oldQuote = -1;
function renderQuoteList() {
  const token = ++typingToken;
  quoteList.replaceChildren();

  if (!quoteSets.length) {
    return;
  }

  quoteIndex = Math.floor(Math.random() * quoteSets.length);
  if (quoteSets.length > 1) {
    while (quoteIndex === oldQuote) {
      quoteIndex = Math.floor(Math.random() * quoteSets.length);
    }
  }
  const chosenQuotes = quoteSets[quoteIndex];

  typeQuotes([chosenQuotes], 0, token);


  oldQuote= quoteIndex;
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

  item.style.textAlign = "justify";
  quoteList.appendChild(item);

  typeWords(item, items[quoteIndex].text, items[quoteIndex].stream, token, function () {
    typeQuotes(items, quoteIndex + 1, token);
  });
}

function typeWords(item, quote, stream, token, done) {
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
        
      }, 1500);
      return;
    }

    if (charIndex === 0) {
      if (wordIndex > 0) {
        item.appendChild(document.createTextNode(" "));
      }
      wordSpan = document.createElement("span");
      if (stream === "The Townsquare") {
        wordSpan.style.backgroundColor = "#ff42c8";
        item.style.color = "#7b0045";
      }
      else if (stream === "The Garden") {
        wordSpan.style.backgroundColor = "#ffe900";
        item.style.color = "#f70";
      }
      else if (stream === "The Library") {
        wordSpan.style.backgroundColor = "deepskyblue";
        item.style.color = "#0e2f97";
      }
      else{
        wordSpan.style.backgroundColor = "#8ff068";
        item.style.color = "#1b714c";
      }
      
      

      const angleAmount = 8;
      const randomAngle = Math.floor(Math.random() * (angleAmount - (-angleAmount) + 1)) + (-angleAmount);
  console.log(randomAngle); 
      wordSpan.style.display = 'inline-block';
      wordSpan.animate(
        [
          { transform: `translate(-40px, -40px) scale(0.5) rotate(${randomAngle}deg)` },
          { transform: `translate(0px, -40px) scale(0.5) rotate(${randomAngle}deg)` },
          { transform: "translate(0px, 0px) scale(1) rotate(0deg)" }
        ],
        {
          duration: 400,        // Duration in milliseconds (0.4s)
          easing: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)',
          fill: 'both'      // Keeps the final big size after animation
        }
      );  

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
  console.log("tick started");
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
  console.log("reverseQuote started");
}

function changeQuoteList() {
  renderQuoteList();
}

loadQuoteSetsFromApiTest().then(function () {
  document.getElementById("2027_p1_input").appendChild(quoteList);
  changeQuoteList();
});
