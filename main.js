// Initialize Firebase (ADD YOUR OWN DATA)
var fconfig = {
  apiKey: "AIzaSyDrUaHf9hr1GQEEmi6WKWgR6B197XQUZ_M",
  authDomain: "form-application-640ec.firebaseapp.com",
  databaseURL: "https://form-application-640ec.firebaseio.com",
  projectId: "form-application-640ec",
  storageBucket: "form-application-640ec.appspot.com",
  messagingSenderId: "486904912418",
  appId: "1:486904912418:web:73fdf990a918087e9a087b",
  measurementId: "G-94RDJ8WL3J"
};
// Initialize Firebase
firebase.initializeApp(fconfig);
// firebase.analytics();
// Reference messages collection
var usersRef = firebase.database().ref('users');

let user1Score = 0;
let user2Score = 0;
var user1ScoreSpan = document.getElementById('user1score')
var user2ScoreSpan = document.getElementById('user2score')
var scoring_board = document.getElementById('.scoring-board')
var result = document.querySelector('.result')
var rock = document.getElementById('rock')
var paper = document.getElementById('paper')
var scissor = document.getElementById('scissor')


// Listen for form submit

$(document).ready(function() {
  $('#add-user1').on('click', function (e) {
    e.preventDefault();
  
    var user1 = $('#username1').val().trim();

    $('#user1-display').text(user1);

    $('#username1').hide();
    $('#add-user1').hide();

    saveUsers(user1)

    function saveUsers(user1) {
      var newUsersRef = usersRef.push();
      newUsersRef.set({
        user1: user1
      })
    }
  })

  $('#add-user2').on('click', function (e) {
    e.preventDefault();
    
    var user2 = $('#username2').val().trim();
    console.log(user2);
    $('#user2-display').text(user2);
    $('#username2').hide();
    $('#add-user2').hide();

    saveUsers(user2)

    function saveUsers(user2) {
      var newUsersRef = usersRef.push();
      newUsersRef.set({
        user2: user2
      })
    }
  })

  function resultGame(letter) {
    if (letter === "r") 
      return "Rock";
    if (letter === "p") 
      return "Paper";
    return "Scissors";
  }


  function win(playerOneChoice,playerTwoChoice) {
    user1Score++;
    user1ScoreSpan.innerHTML = user1Score;
    user2ScoreSpan.innerHTML = user2Score;
    result.innerHTML = `${resultGame(playerOneChoice)}(user1) beats ${resultGame(playerTwoChoice)}(user2). You Win!`;
  }

  function lost() {

  }

  function draw() {
    console.log("draw")
  }




  function getPlayerTwoChoice() {
    var choices = ['r', 'p', 's']
    const randomWeapon = Math.floor(Math.random() *3);
    return choices[randomWeapon]
  }

  function weapon(playerOneChoice) {
    var playerTwoChoice = getPlayerTwoChoice()
    switch (playerOneChoice + playerTwoChoice) {
      case "rs":
      case "pr":
      case "sp":
        win(playerOneChoice + playerTwoChoice)
        break;
      case "rp":
      case "ps":
      case "sr":
        lost(playerOneChoice + playerTwoChoice)
        break;
      case "rr":
      case "pp":
      case "ss":
        draw(playerOneChoice + playerTwoChoice)
        break;
    }
  }



 function main() {
  rock.addEventListener('click', function() {
    weapon("r")
  })

  paper.addEventListener('click', function() {
    weapon("p")
  })

  scissor.addEventListener('click', function() {
    weapon("s")
  })
 }

 main();
})