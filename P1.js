/* 
  Authors: Alejandro Bensusan (A00440174)
		   Ali Alhusseini (A00431699)
		   Mike Warren (A00447652)
		   Riley O'keefe (A00460983)

  This file defines the functionality of the P1.html file by hiding and showing elements
  on the screen and by saving the blogs to storage and/or the server.
*/
const SERVER_URL = "http://140.184.230.209:3172";

let shift = false;
let capsLock = false;
let keyboardButtons = document.getElementsByClassName("keyboardButton");
let inputBoxStatus1 = false;
let inputBoxStatus2 = false;
let inputBoxStatus3 = false;
let wordBankInputStatus = false;

var arrayOfWord = [];

// toggle keys
function toggleShift() {
  if (shift === false) {
    shift = true;
    shiftKeys("true");
  } else {
    shift = false;
    shiftKeys("false");
  }
}

// shift state of keys on the keyboard
function shiftKeys(state) {
  if (state == "true") {
    for (let x = 0; x < keyboardButtons.length; x++) {
      keyboardButtons[x].style.textTransform = "uppercase";
    }
  } else {
    for (let x = 0; x < keyboardButtons.length; x++) {
      keyboardButtons[x].style.textTransform = "lowercase";
    }
  }
}

// toggle caps lock
function toggleCapsLock() {
  if (capsLock === false) {
    capsLock = true;
    shiftKeys("true");
    document.getElementById("capsLock").style.backgroundColor = "#09ff70";
    document.getElementById("capsLock").style.color = "#111111";
  } else {
    capsLock = false;
    shiftKeys("false");
    document.getElementById("capsLock").style.backgroundColor = "#a02e32";
    document.getElementById("capsLock").style.color = "#ffffff";
  }
}
// defines active input box to be used for keyboard input
function activeBox(inputBoxID) {
  if (inputBoxID === "inputBox1") {
    inputBoxStatus1 = true;
  } else if (inputBoxID === "wordbankinput") {
    wordBankInputStatus = true;
  } else if (inputBoxID === "inputBox2"){
    inputBoxStatus2 = true;
  } else if (inputBoxID === "wordBankinput"){
    wordBankInputStatus = true;
  }  else if (inputBoxID === "inputBox3"){
    inputBoxStatus3 = true;
  } else if (inputBoxID === "wordBankinput"){
    wordBankInputStatus = true;
  }
}
// add or delete characters to from input area
function addChar(selection) {
  if (inputBoxStatus1) {
    let currChars = $("#inputBox1").val();
    if (selection === "delete") {
      $("#inputBox1").val(currChars.substring(0, currChars.length - 1));
    } else {
      if (capsLock === true && isNaN(selection)) {
        $("#inputBox1").val(currChars.concat(selection.toUpperCase()));
      } else if (shift === true && isNaN(selection)) {
        $("#inputBox1").val(currChars.concat(selection.toUpperCase()));
        shift = false;
        shiftKeys("false");
      } else {
        $("#inputBox1").val(currChars.concat(selection));
      }
    }
  }
  if (inputBoxStatus2) {
    let currChars = $("#inputBox2").val();
    if (selection === "delete") {
      $("#inputBox2").val(currChars.substring(0, currChars.length - 1));
    } else {
      if (capsLock === true && isNaN(selection)) {
        $("#inputBox2").val(currChars.concat(selection.toUpperCase()));
      } else if (shift === true && isNaN(selection)) {
        $("#inputBox2").val(currChars.concat(selection.toUpperCase()));
        shift = false;
        shiftKeys("false");
      } else {
        $("#inputBox2").val(currChars.concat(selection));
      }
    }
  }
  if (inputBoxStatus3) {
    let currChars = $("#inputBox3").val();
    if (selection === "delete") {
      $("#inputBox3").val(currChars.substring(0, currChars.length - 1));
    } else {
      if (capsLock === true && isNaN(selection)) {
        $("#inputBox3").val(currChars.concat(selection.toUpperCase()));
      } else if (shift === true && isNaN(selection)) {
        $("#inputBox3").val(currChars.concat(selection.toUpperCase()));
        shift = false;
        shiftKeys("false");
      } else {
        $("#inputBox3").val(currChars.concat(selection));
      }
    }
  } else if (wordBankInputStatus) {
    let currChars = $("#wordbankinput").val();
    if (selection === "delete") {
      $("#wordbankinput").val(currChars.substring(0, currChars.length - 1));
    } else {
      if (capsLock === true && isNaN(selection)) {
        $("#wordbankinput").val(currChars.concat(selection.toUpperCase()));
      } else if (shift === true && isNaN(selection)) {
        $("#wordbankinput").val(currChars.concat(selection.toUpperCase()));
        shift = false;
        shiftKeys("false");
      } else {
        $("#wordbankinput").val(currChars.concat(selection));
      }
    }
  }
}
// save blog to local storage
function saveBlog(blog, blogID) {
  if (typeof Storage !== "undefined") {
    window.localStorage.setItem(blogID, document.getElementById(blog).value);
  }

  //$.get(SERVER_URL + "/", callback1("1")).fail(errorCallback1);
  // save to the server
  $("#save1").on("click", function () {
    let x = { input: document.getElementById("inputBox1").value };
    $.post(SERVER_URL + "/blog1", x).fail(errorCallback1);
  });
  $("#save2").on("click", function () {
    let x = { input: document.getElementById("inputBox2").value };
    $.post(SERVER_URL + "/blog2", x).fail(errorCallback1);
  });
  $("#save3").on("click", function () {
    let x = { input: document.getElementById("inputBox3").value };
    $.post(SERVER_URL + "/blog3", x).fail(errorCallback1);
  });
}

// delete blog from local storage
function cancelBlog(blogID) {
  if (confirm("Are you sure you want to delete the blog entirely?") === true) {
    if (confirm("This action cannot be undone!") === true) {
      window.localStorage.removeItem(blogID);
      document.location.reload();
    }
  }
}

// get the blog from local storage to the input box
function getBlog(blogID) {
  document.getElementById("inputBox1").value =
    window.localStorage.getItem(blogID);
}

function getServer1(){
  $.get(SERVER_URL + "/blog", callback1).fail(errorCallback1);
}

function callback1(returnedData) {
  console.log(returnedData);
  document.getElementById("inputBox1").value = returnedData[0];
  document.getElementById("inputBox2").value = returnedData[1];
  document.getElementById("inputBox3").value = returnedData[2];
}

function errorCallback1(err) {
  console.log(err.responseText);
}

/*
	This function hides the other edit switches when one of them is switched on. 
  
	toHide1: first edit switch to be hidden.
	toHide2: second edit switch to be hidden. 
  */
function hide(toHide1, toHide2) {
  let x = document.getElementById(toHide1);
  let v = document.getElementById(toHide2);
  if (x.style.display === "none") {
    x.style.display = "flex";
  } else {
    x.style.display = "none";
  }
  if (v.style.display === "none") {
    v.style.display = "flex";
  } else {
    v.style.display = "none";
  }
}

/*
	This function shows the keyboard and the text input area when an edit switch is toggled.
  
	kbd: id of the keyboard.
	input: id of the input area box.
	x: the content of the keyboard area.
	y: the content of the input area.
  */
function showKeyboard(kbd, input, buttons) {
  let x = document.getElementById(kbd);
  let y = document.getElementById(input);
  let z = document.getElementById(buttons);
  if (
    x.style.display === "none" &&
    y.style.display === "none" &&
    z.style.display === "none"
  ) {
    x.style.display = "block";
    y.style.display = "block";
    z.style.display = "block";
  } else {
    x.style.display = "none";
    y.style.display = "none";
    z.style.display = "none";
  }
}

function show(hidden) {
  let a = document.getElementById(hidden);
  if (a.style.display === "none") {
    a.style.display = "block";
  } else {
    a.style.display = "none";
  }
}

// function setup(){
//   $("#save").on("click", function (){
//     let x = {input: document.getElementById("inputBox").value};
//      $.post(SERVER_UR + "/inputBox", x).fail(errorCallback1);
//  });
// }

function errorCallback1(err) {
  console.log(err.responseText);
}

function saveWords() {
  var input = document.getElementById("wordbankinput").value;
  if (input.length != 0) {
    arrayOfWord.push(input);
  }
  document.getElementById("wordbankinput").value = "";
}

/*
this is where the issue is, when the word banks buttons are pressed it only returns the most recent word entered rather than 
the one specified on the button.
*/
function displayWords() {
  var display = arrayOfWord;
  arrayOfWord = [];

  for (var i = 0; i < display.length; i++) {
    var btn = document.createElement("button");
    var t = document.createTextNode(display[i]);
    btn.appendChild(t);
    document.body.appendChild(btn);
    btn.className = "wordbutton";
    btn.onclick = function addWord() {
      let currChars = $("#inputBox").val();
      $("#inputBox").val(currChars.concat(t.nodeValue) + " ");
    };
  }
}

// hides wordbank button
function hideButtons() {
  $(".wordbutton").hide();
}
// shows wordbank button
function showButtons() {
  $(".wordbutton").show();
}
// hides a single wordbank button
function hideSingle(shown) {
  let x = document.getElementById(shown);
  if (x.style.display === "none") {
    x.style.display = "flex";
  } else {
    x.style.display = "none";
  }
}
