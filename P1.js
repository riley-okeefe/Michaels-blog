/* 
  Authors: Alejandro Bensusan (A00440174)
           Ali Alhusseini (A00431699)
           Mike Warren (A00447652)
           Riley O'keefe (A00460983)

  This file defines the functionality of the P1.html file by hiding and showing elements
  on the screen and by saving the blogs to storage and/or the server.
*/
const SERVER_URL = "http://140.184.230.209:3039";

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
    document.getElementById("capsLock").style.backgroundColor = "#09ff70";
    document.getElementById("capsLock").style.color = "#111111";
  } else {
    capsLock = false;
    document.getElementById("capsLock").style.backgroundColor = "#a02e32";
    document.getElementById("capsLock").style.color = "#ffffff";
  }
}

// add or delete characters to/from input area
function addChar(selection) {
  let currChars1 = $("#inputBox1").val();
  if (selection === "delete") {
      $("#inputBox1").val(currChars1.substring(0, currChars1.length - 1));
  } else {
      if (capsLock === true && isNaN(selection)) {
          $("#inputBox1").val(currChars1.concat(selection.toUpperCase()));
      } else if (shift === true && isNaN(selection)) {
          $("#inputBox1").val(currChars1.concat(selection.toUpperCase()));
          shift = false;
      } else {
          $("#inputBox1").val(currChars1.concat(selection));
      }
  }
  let currChars2 = $("#inputBox2").val();
  if (selection === "delete") {
      $("#inputBox2").val(currChars2.substring(0, currChars2.length - 1));
  } else {
      if (capsLock === true && isNaN(selection)) {
          $("#inputBox2").val(currChars2.concat(selection.toUpperCase()));
      } else if (shift === true && isNaN(selection)) {
          $("#inputBox2").val(currChars2.concat(selection.toUpperCase()));
          shift = false;
      } else {
          $("#inputBox2").val(currChars2.concat(selection));
      }
  }
  let currChars3 = $("#inputBox3").val();
  if (selection === "delete") {
      $("#inputBox3").val(currChars3.substring(0, currChars3.length - 1));
  } else {
      if (capsLock === true && isNaN(selection)) {
          $("#inputBox3").val(currChars3.concat(selection.toUpperCase()));
      } else if (shift === true && isNaN(selection)) {
          $("#inputBox3").val(currChars3.concat(selection.toUpperCase()));
          shift = false;
      } else {
          $("#inputBox3").val(currChars3.concat(selection));
      }
  }
}

// save blog to local storage
function saveBlog1() {
  window.localStorage.setItem('text1', "inputBox1")
  }
  function saveBlog2(){
    window.localStorage.setItem('text2', "inputBox2")
  }
  function saveBlog3(){
    window.localStorage.setItem('text', "inputBox")
  }
  // $.get(SERVER_URL + "/inputBox", callback1).fail(errorCallback1);
  // // save to the server
  // $("#save").on("click", function () {
  //   let x = {input: document.getElementById("inputBox").value};
  //   $.post(SERVER_URL + "/inputBox", x).fail(errorCallback1);
  // });


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
function getBlog1() {
 window.localStorage.getItem("text1");
}
function getBlog2(){
  window.localStorage.getItem("text2");
}
function getBlog3() {
  window.localStorage.getItem("text");
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

// function setup(){
//   $("#save").on("click", function (){
//     let x = {input: document.getElementById("inputBox").value};
//      $.post(SERVER_UR + "/inputBox", x).fail(errorCallback1);
//  });
// }

function callback1(returnedData) {
  console.log(returnedData);
  document.getElementById("inputBox").value = returnedData[0];
}

function errorCallback1(err) {
  console.log(err.responseText);
}