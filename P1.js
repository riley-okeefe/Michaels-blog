let shift = false;

function addChar(selection) {
    var currChars = $("#words").val();
    if (selection === "bksp") {
        $("#words").val(currChars.substring(0, currChars.length - 1));
    } else {
         if (shift === true) {
                $("#words").val(currChars.concat(selection.toUpperCase()));
        } else {
            $("#words").val(currChars.concat(selection));
        }
    }
}

function toggleShift() {
    shift = true;
}

function enter() {
    var content = $("#words").val();
    console.log(content);
    $("words").val("");
}

function hide(toHide1, toHide2) {
    document.getElementById(toHide1).style.display = "none";
    document.getElementById(toHide2).style.display = "none";
}

function showKeyboard(name) {
    var x = document.getElementById(name);
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }

}