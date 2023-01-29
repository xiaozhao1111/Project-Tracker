
// carete DOM elements 
let currentDayEl = $('#currentDay');
let timeBlockEl = $('#time-block');


// create global varibales
let currentHour = moment().set({minutes: 0, seconds: 0, milliseconds: 0});

//  create empty task object
let taskArr = {};

taskArr = JSON.parse(localStorage.getItem('storedTaskArr'));

// function to show current date
function displayCurrentDay() {
    let today = moment().format('dddd, MMMM Do');
    currentDayEl.text(today);
}


// function completed to display arow at a specific hour
function displayTask(time) {
    
    // create a single row in the table
    let taskRowEl = $('<tr>').addClass('row');
    let hourEl = $('<td>').addClass('hour col-2').text(time.format('h A'));
    let toDoEl = $('<td>').addClass('col-8 p-0');
    let toDoInput = $('<textarea>').addClass('description');
    toDoInput.attr('id', time.format('H')).text(taskArr[time.format('H')]);
    let saveBtnEl = $('<td>').addClass('saveBtn col-2').text('Save 💾');
    saveBtnEl.attr('data-time', time.format('H'))

    // append elements to the table row and table
    toDoEl.append(toDoInput);
    taskRowEl.append( hourEl, toDoEl, saveBtnEl);
    timeBlockEl.append(taskRowEl);

    // check the task slot color 
    if ( time.isBefore(currentHour)) {
        toDoInput.addClass('past')
    } else if (time.isSame(currentHour)) {
        toDoInput.addClass('present')
    } else {
        toDoInput.addClass('future')
    }
}

function renderAllTasks() {
    for( let i = 9; i < 18; i++) {
        let timeSlot = moment().set({hour: i})
        displayTask(timeSlot);
    }
}


// function to manage the tasks to local storage
function manageTask(event) {
    event.preventDefault();
    console.log("The save button was clicked.");

    // get the target element, hour and task 
    let targetEl = event.target;
    let targetHour = targetEl.getAttribute('data-time');  
    let taskToSave = $('#'+targetHour).val();

    if (taskArr === null || taskArr.date != moment().format('DD/MM/YYYY')) {
        taskArr = {};
        taskArr.date = moment().format('DD/MM/YYYY');
        taskArr[targetHour] = taskToSave; 
    } else {
        taskArr[targetHour] = taskToSave; 
    }

    localStorage.setItem('storedTaskArr', JSON.stringify(taskArr));
}



$(function() {
    // dispaly current date
    displayCurrentDay();
    if(taskArr === null) {
        taskArr = {};
    }
    renderAllTasks();
    // event listener for the save button
    timeBlockEl.on('click', '.saveBtn', manageTask);
})
