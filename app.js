const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twiterBtn = document.getElementById('twitter');
const newquote = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//show loading

function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
//Hidden loading
 function complete(){
     if (!loader.hidden){
            quoteContainer.hidden = false;
            loader.hidden = true;
     }
 }

//Get Quote from API
async function getQuote(){
    loading();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl ='http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    //if ahutor is blank
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        if(data.quoteAuthor ===''){
            authorText.innerText = 'Unknown';
        }else{
            authorText.innerText = data.quoteAuthor;
        }
       //Reduce font size for long quotes
       if (data.quoteText.length>50){
           quoteText.classList.add('long-quote');
       }else{
           quoteText.classList.remove('long-quote');
       }
        quoteText.innerText = data.quoteText;
        //stop loader show code
        complete();
    }
    catch (error){
        getQuote();
         }
}

function tweetQuote(){
    const quote= quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl,'_blank');
}

//Even Listeners

newquote.addEventListener('click', getQuote);
twiterBtn.addEventListener('click',tweetQuote);

//on load

getQuote();