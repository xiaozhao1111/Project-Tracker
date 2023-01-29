// carete DOM elements 
let currentDayEl = $('#currentDay');
let timeBlockEl = $('#time-block');

// create global varibales
let currentHour = moment().hour();

// 
let task = {
    time: '',
    toDo: ''
}

let taskArr = [];

// function to show current date
function displayCurrentDay() {
    let today = moment().format('dddd, MMMM Do');
    currentDayEl.text(today);
}

// function to check if it's a new day. 
// PS: If it's a new day, all the stored tasks will be removed.
function checkIsNewDay() {
    let storedDate = localStorage.getItem('today');
    if(storedDate === null) {
        localStorage.setItem('today', moment().format('D/M/YYYY'))
        return true;
    } else {
        if (storedDate === moment().format('D/M/YYYY')) {
            console.log("It's the same day.");
            return false;
        } else {
            storedDate = moment().format('D/M/YYYY');
            console.log("It's a new day");
            return true;
        }
    }
}

function initialTaskArr() {
    
    for(let i = 9; i < 18; i++) {
        if(i < 13) {
            let temTask = {time: '', toDo: ''}
            temTask.time = i + ' AM';
            taskArr.push(temTask);
        } else {
            let temTask = {time: '', toDo: ''}
            temTask.time = i -12 + ' PM';
            taskArr.push(temTask);
            
        }
    }
}


initialTaskArr();
console.log(taskArr);
taskArr.forEach(task => displayTask(task));


// function completed to display arow at a specific hour
function displayTask(task) {
    // create a single row in the table
    let taskRowEl = $('<tr>');
    let hourEl = $('<td>').addClass('hour col-2').text(task.time);
    let toDoEl = $('<td>').addClass('col-8').text(task.toDo);
    let saveBtnEl = $('<td>').addClass('saveBtn col-2').text('Save');

    // append elements to the table row and table
    taskRowEl.append(
        hourEl,
        toDoEl,
        saveBtnEl
    );
    timeBlockEl.append(taskRowEl);
}








// display the current date every second
setInterval(displayCurrentDay,1000);

// check if the day has
setInterval(checkIsNewDay, 60000);