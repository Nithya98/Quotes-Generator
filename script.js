// DOM manipulation
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById("loader");

let apiQuotes = [];

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden=true;
}
function removeLoadingSpinner(){
    quoteContainer.hidden=false;
    loader.hidden = true;
}

function newQuotes(){
    showLoadingSpinner();
    const quotes = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
// check the author field if it's null, replace it with unknown quote
    if(!quotes.author){
        quoteAuthor.textContent = "Unknown";
    }else{
        quoteAuthor.textContent = quotes.author;
    }
// check the quote size and add the style to make it smaller
    if(quotes.text.length > 150){
        quoteText.classList.add("long-quote");
    }else{
        quoteText.classList.remove("long-quote");
    }
    //set quote, hide loader.
    quoteText.textContent = quotes.text;
    removeLoadingSpinner();
}

// Get Quotes from API Key

async function getQuotes() {
    showLoadingSpinner();
    const apiUrl ="https://type.fit/api/quotes"
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuotes();
    } catch (error) {
        //catch error here
        alert("Error occured.  Check the API URL")
    }
}

// Tweet Quotes
function tweetQuotes(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent}-${quoteAuthor.textContent}`;
    window.open(twitterUrl, "__blank");
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuotes);
twitterBtn.addEventListener('click',tweetQuotes);

// onLoad
getQuotes();
