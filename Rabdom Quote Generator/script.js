const quote = document.getElementById("quote");
const author = document.getElementById("author");
const api_url = "https://go-quote.azurewebsites.net/docs/";

 async function getquote(url) {
    const response = await fetch(url);
        var data = await response.json();
        console.log(data);
        quote.innerHTML = data.text;
        author.innerHTML = data.author;
 }

 getquote(api_url);

 function tweetX() {
    window.open("https://twitter.com/intent/tweet?text=" + quote.innerHTML + "-- by " + author.innerHTML, "X Window", "width=600, height=300");
 }

 function insta() {
    window.open("https://www.instagram.com/", "Insta Window", "width=600, height=300")
 }