/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// import {format} from '../index.html';
// const {format} = require('../index.html');

const renderTweet = (tweets) => {
  for (const tweet of tweets) {
    $(".theTweets").append(createTweetElement(tweet));
  }
}

const createTweetElement = (data) => {
  const tweetElement = `
  <article class="tweetContainer">
  <header class="tweetHeader">
  <div class="tweetProfile">
  <img src=${data.user.avatars} class="avatar">
  <h3>${data.user.name}</h3>
  </div>
  <p class="profileTag">${data.user.handle}</p>
  </header>
  <div class="contentContainer">
  <p class="tweetContent">${data.content.text}</p>
  </div>
  <footer class="tweetFooter">
  <p class="datePosted">${jQuery.timeago(data.created_at)}</p>
  <div class="reactContainer">
  <p class="reaction"><i class="fa-solid fa-flag"></i></p>
  <p class="reaction"><i class="fa-solid fa-retweet"></i></p>
  <p class="reaction"><i class="fa-solid fa-heart"></i></p>
  </div>
  </footer>
  </article>
  `
  return tweetElement;
}

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const newTweet = () => {
  const name = document.getElementById("name").innerHTML;
  const handle = document.getElementById("handle").innerHTML;
  const safeHTML = escape($("#tweet-text").val());
  const newData = {
    "user": {
      "name": name, 
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": handle,
    },
    "content": {
      "text": safeHTML,
    },
    "created_at": new Date(),

  }
  $(".theTweets").append(createTweetElement(newData));
}

$(document).ready(() => {
  document.getElementById("errorMessage").style.display = "none";
  
  const handlingSubmit = event => {
    event.preventDefault();
    if ($('#tweet-text').val().length > 140) {
      document.getElementById("errorMessage").innerHTML = '🚨Tweet too long. Use less words or create two posts🚨';
      document.getElementById("errorMessage").style.display = "";
      return;
    } else if ($('#tweet-text').val().length === 0) {
      document.getElementById("errorMessage").innerHTML = '🚨Please write something. Not even going to try?🚨';
      document.getElementById("errorMessage").style.display = "";
      return;
    }
    
    document.getElementById("errorMessage").style.display = "none";
    newTweet();
    $("#tweet-text").val("");
    const output = document.querySelector("output");
    output.innerHTML = 140;
  }

  const loadTweets = () => {$.ajax("http://localhost:8080/tweets/", {method: "GET"})
    .then((data) => {
      renderTweet(data);
    })}


    loadTweets();

  $("#addTweet").submit(handlingSubmit);
});