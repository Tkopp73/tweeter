/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// import {format} from '../index.html';
// const {format} = require('../index.html');


// reading through an array to create tweets
const renderTweet = (tweets) => {
  for (const tweet of tweets) {
    $(".theTweets").append(createTweetElement(tweet));
  }
}

// creates the tweet element
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

// cleans up the content to prevent code being used in the text area
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// creates the tweet from the text line
const newTweet = () => {
  const name = $("#name").text();
  const handle = $("#handle").text();
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


// when the document is ready
$(document).ready(() => {
  $("#errorMessage").css("display", "none");
  // -------when the submit button is clicked -------
  const handlingSubmit = event => {
    event.preventDefault();
    if ($('#tweet-text').val().length > 140) {
      $("#errorMessage").text('🚨Tweet too long. Use less words or create two posts🚨');
      $("#errorMessage").css("display", "");
      return;
    } else if ($('#tweet-text').val().length === 0) {
      $("#errorMessage").text('🚨Please write something. Not even going to try?🚨');
      $("#errorMessage").css("display", "");
      return;
    }
    
    $("#errorMessage").css("display", "none");
    newTweet();
    $("#tweet-text").val("");
    let output = document.querySelector(".counter");
    output.innerHTML = 140;
  }
  // ------------------------------------------------

  // gets the pre loaded tweets
  const loadTweets = () => {$.ajax("/tweets/", {method: "GET"})
    .then((data) => {
      renderTweet(data);
    })}
    loadTweets();

    // on click
  $("#addTweet").submit(handlingSubmit);
});