/* 
  Authors: Alejandro Bensusan (A00440174)
           Ali Alhusseini (A00431699)
           Mike Warren (A00447652)
           Riley O'keefe (A00460983)

  This file defines the functionality of the P1.html file by hiding and showing elements
  on the screen and by saving the blogs to storage and/or the server.
*/

/*
  This variable defines the state of the caps button. 
  Set to false by default, meaning the shift key is not pressed.
*/
let caps = false;

/*
  This function adds characters to the "words" input area.
  The funcion checks if the backspace key is pressed, then it deletes a letter. 
  The function also checks if caps is on, then it adds uppercase letters instead
  of lowercase. 

  selectoin: word or letter to be added.
*/
function addChar(selection) {
  var currChars = $("#words").val();
  if (selection === "bksp") {
    $("#words").val(currChars.substring(0, currChars.length - 1));
  } else {
    if (caps === true && isNaN(selection)) {
      $("#words").val(currChars.concat(selection.toUpperCase()));
      caps = false;
    } else {
      $("#words").val(currChars.concat(selection));
    }
  }
}

/*
  This function toggles caps (shift).
*/
function toggleCaps() {
  caps = true;
}

/*
  This function console logs the value of the input area.
*/
function enter() {
  var content = $("#words").val();
  console.log(content);
  $("words").val("");
}

/*
  This function hides the other edit switches when one of them is switched on. 

  toHide1: first edit switch to be hidden.
  toHide2: second edit switch to be hidden. 
*/
function hide(toHide1, toHide2) {
  var x = document.getElementById(toHide1);
  var v = document.getElementById(toHide2);
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
  if (v.style.display === "none") {
    v.style.display = "block";
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
function showKeyboard(kbd, input) {
  var x = document.getElementById(kbd);
  var y = document.getElementById(input);
  if (x.style.display === "none" && y.style.display === "none") {
    x.style.display = "block";
    y.style.display = "block";
  } else {
    x.style.display = "none";
    y.style.display = "none";
  }
}

/*
  This function saves the blog that is inputted in the input area box to local storage.

  blog: id of the text inputted in the input area.
*/
function saveBlog(blog) {
  if (typeof Storage !== "undefined") {
    window.localStorage.setItem("blog", document.getElementById(blog).value);
    console.log("saved to local storage");
    console.log(document.getElementById(blog).value);
  } else {
    console.log("Local storage is not available.");
  }
}

/*
  This funciton removes the blog from local storage. 
*/
function cancelBlog() {
  window.localStorage.removeItem("blog");
  console.log("removed blog");
}

/*
  This function gets the value of the input box from local storage and puts back in the input area
  after the browser refreshes.
  The value gets deleted only if the browser cache is deleted.
*/
function getBlog() {
  document.getElementById("words").value = window.localStorage.getItem("blog");
}
