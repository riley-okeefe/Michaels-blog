/* 
  Authors: Alejandro Bensusan (A00440174)
           Ali Alhusseini (A00431699)
           Mike Warren (A00447652)
           Riley O'keefe (A00460983)

  This file defines the functionality of the P1.html file by hiding and showing elements
  on the screen and by saving the blogs to storage and/or the server.
*/

let shift = false;
let capsLock = false;

// toggle keys
function toggleShift() {
  shift = true;
}

// toggle caps lock
function toggleCapsLock() {
  if (capsLock === false) {
    capsLock = true;
    document.getElementById("capsLock").style.backgroundColor = "red";
  } else {
    capsLock = false;
    document.getElementById("capsLock").style.backgroundColor = "rgb(160, 46, 50)";
  }
}

// add or delete characters to/from input area
function addChar(selection) {
  let currChars = $("#inputBox").val();
  if (selection === "delete") {
      $("#inputBox").val(currChars.substring(0, currChars.length - 1));
  } else {
      if (capsLock === true && isNaN(selection)) {
          $("#inputBox").val(currChars.concat(selection.toUpperCase()));
      } else if (shift === true && isNaN(selection)) {
          $("#inputBox").val(currChars.concat(selection.toUpperCase()));
          shift = false;
      } else {
          $("#inputBox").val(currChars.concat(selection));
      }
  }
}

// save blog to local storage
function saveBlog(blog) {
  if (typeof Storage !== "undefined") {
      window.localStorage.setItem("blog", document.getElementById(blog).value);
      alert("The blog has been saved succesfully!");
  }
}

// delete blog from local storage
function cancelBlog() {
  if (confirm("Are you sure you want to delete the blog entirely?") === true) {
      if (confirm("This action cannot be undone!") === true) {
          window.localStorage.removeItem("blog");
          document.location.reload();
      }
  }
}

// get the blog from local storage to the input box
function getBlog() {
  document.getElementById("inputBox").value = window.localStorage.getItem("blog");
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
  let x = document.getElementById(kbd);
  let y = document.getElementById(input);
  if (x.style.display === "none" && y.style.display === "none") {
    x.style.display = "block";
    y.style.display = "block";
  } else {
    x.style.display = "none";
    y.style.display = "none";
  }
}
