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

taskArr = JSON.parse(localStorage.getItem('storedTaskArr'));

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


// function completed to display arow at a specific hour
function displayTask(task) {
    // create a single row in the table
    let taskRowEl = $('<tr>').addClass('row');
    let hourEl = $('<td>').addClass('hour col-2 algin-text-middle').text(task.time);
    let toDoEl = $('<td>').addClass('col-8 p-0');
    let toDoInput = $('<input>').val(task.toDo)
    let saveBtnEl = $('<td>').addClass('saveBtn col-2').text('Save 💾');

    // append elements to the table row and table
    toDoEl.append(toDoInput);
    taskRowEl.append(
        hourEl,
        toDoEl,
        saveBtnEl
    );
    timeBlockEl.append(taskRowEl);
}

// function to save the tasks to local storage
function saveTask(event) {
    event.preventDefault();
    

    // get the elements 
    let targetEl = $(event.target);
    let targetParentEl = targetEl.parent('tr'); // get the element of the clicked row
    let targetHourEl = targetParentEl.children('.hour');  // get the element of the hour
    let hour = $((targetHourEl))[0].innerText.trim(); // get the hour in the clicked row
    

    if (taskArr == null) {
        taskArr = [];
        initialTaskArr();
    } else {
        taskArr.forEach(task =>
        {
            if (task.time === hour) {
                task.toDo = $(targetParentEl.find('input')).val();
            }
        })
    }
    localStorage.setItem('storedTaskArr', JSON.stringify(taskArr));
}


// event listener for the save button
timeBlockEl.on('click', '.saveBtn', saveTask);



if (taskArr == null) {
        taskArr = [];
        console.log("No data was stored today.");
        initialTaskArr();
    } else {
        console.log("There is stored data.");
        console.log(taskArr);
        taskArr.forEach(task => displayTask(task));

    }






// display the current date every second
setInterval(displayCurrentDay,1000);

// check if the day has
setInterval(checkIsNewDay, 60000);