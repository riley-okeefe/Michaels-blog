let caps = false;

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

function toggleCaps() {
  caps = true;
}

function enter() {
  var content = $("#words").val();
  console.log(content);
  $("words").val("");
}

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
