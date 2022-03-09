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

function display(toBeShown, toBeHid1, toBeHid2) {
    document.getElementById(toBeShown).style.display = "";
    document.getElementById(toBeHid1).style.display = "none";
    document.getElementById(toBeHid2).style.display = "none";
  }

  // By: Riley OKeefe - creating variables to add event listeners
//   var switch1 = document.getElementById("firstEditSwitch");
//   var switch2 = document.getElementById("secondEditSwitch");
//   var switch3 = document.getElementById("thirdEditSwitch");

//   switch1.addEventListener("change", function(){
//     display('firstEditSwitch', 'secondEditSwitch', 'thirdEditSwitch');
//   });

//   switch2.addEventListener("change", function(){
//     display('secondEditSwitch', 'thirdEditSwitch', 'firstEditSwitch');
//   });

//   switch3.addEventListener("change", function(){
//       display('thirdEditSwitch', 'secondEditSwitch', 'firstEditSwitch');
//   });
