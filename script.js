// Initiate functions
updateTime();
mainBody();
colourCoding();

// Obtains data from moment.js for current date and time
function headerDate() {
  $("#currentDay").text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
}

// Updates the time every second then displays it on the header
function updateTime() {
  setInterval(function () {
    headerDate();
  }, 1000)
}

// Creates HTML body dynamically using jQuery
function mainBody() {
  var selectContainer = $(".container");
  
  for (var i = 9; i < 18; i++) {
    // Creates new HTML elements and adds class respectively
    var timeBlock = $("<div>").addClass("row time-block");
    var timeRow = $("<div>").addClass("col-md-1 hour d-flex justify-content-end pt-3");
    var textArea = $("<textarea>").addClass("event col-md-10");
    var saveBtn = $("<button>").addClass("saveBtn col-md-1")
    var saveBtnIcon = $("<i>").addClass("fas fa-save fa-lg")
    
    timeBlock.attr("id", i);

    // Conditions for different times of the day
    if (i < 12) {

      // Displays "am" in the morning
      timeRow.text(i + "am");

    } else if (i === 12) {

      // Displays "pm" at noon and later times
      timeRow.text(i + "pm");

    } else {

      // Converts 24hr format to 12hr format for times past 12pm
      timeRow.text(i-12 + "pm")
    }

    // Appends elements to their parent element
    saveBtn.append(saveBtnIcon);
    timeBlock.append(timeRow, textArea, saveBtn);
    selectContainer.append(timeBlock);
  }
}

// Color-coding the text area to indicate whether it is in the past, present or future
function colourCoding() {
  var hour = parseInt(moment().format("HH"));
  $(".time-block").each(function () {

    // Converts string id to a number
    var thisHour = parseInt($(this).attr("id"));

    if (thisHour < hour) {

      // Color-codes to grey for past events
      $(this).addClass("past");
      
    } else if (thisHour === hour) {

      // Color-codes to red for current events
      $(this).addClass("present");

    } else {

      // Color-codes to green for future events
      $(this).addClass("future");
    }
  })
}

// Activates these functions once the document has fully rendered
$(document).ready(function() {
  // Stores input into the local storage according to their id's if the input is not null
  $(".time-block").each(function() {
    var id = $(this).attr("id");
    var getEvent = localStorage.getItem(id);

    if (getEvent !== null) {
      $(this).children(".event").val(getEvent);
    }
  });

  // Pressing the save button saves the input and appends it their respective text area
  $(".saveBtn").on("click", function() {
    var time = $(this).parent().attr("id");
    var setEvent = $(this).siblings(".event").val();

    localStorage.setItem(time, setEvent);
  });
  
});