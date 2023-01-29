// carete DOM elements 
let currentDay = $('#currentDay');


// function to show current date
function displayCurrentDay() {
    let today = moment().format('dddd, MMMM Do');
    currentDay.text(today);
}








// display the current date every second
setInterval(displayCurrentDay,1000);