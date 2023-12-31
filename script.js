// im going to use the local storage function to be able to save my jsscript to my html 
function saveEventToLocalStorage() {
    localStorage.setItem('events',JSON.stringify(events));
}

// to be able to load my events from localS. i could use session storage but it wont store my data  after my browser is closed so its not as efficent/
function loadEventsFromLocalStorage() {
    var savedEvents = JSON.parse(localStorage.getItem('events)'));
    events = savedEvents ? savedEvents : {};
    // using the JSON.parse will be able to convert my text into a js obj
}

// this funvrion will start the appplication 
function initApp() {
    loadEventsFromLocalStorage();
    // initiating the application will set the function into the works hopefully. My saved events will be pulled from my local storage 
    renderEvents();
    // i hope that with "render" and my elemnent of events that it will pull info from my already existing html that has specified.
    updateCurrentDay();
    setInterval(updateCurrentDay, 6000);
    // with the setI it willupdate the current day every min
}

// function that will be used to ren events
function renderEvents() {
    var currentHour = dayjs().hour();  

    // for (initilazation; conditon; afterthought;)
    //                    statement
for (var hour = 9; hour <=17; hour++) {
    var eventText = events[hour] || '';
    var timeBlock = $('#hour-' + hour);

    // going to get rid of classes that are already ex 
    timeBlock.removeClass('past present future');


    // adding the prop 4 curr tm
    if (hour < currentHour){
        timeBlock.addClass('past');
    }else if (hour === currentHour) {
        timeBlock.addClass('present');
    }else {
        timeBlock.addClass('future');
    }
    // updated tecarea con for every hr
    timeBlock.find('description').val(eventText);
    }
 }

//  for saving event 
function savedEvent(hour, event) {
    events[hour] = event;
    saveEventToLocalStorage();
    renderEvents();
}

// function to update cur date in header 
function updateCurrentDay(){
    var CurrentDay = dayjs().format('dddd, MMMM D, YYYY, h:mm A');
    $('#currentDay').text('Current Time: ' +CurrentDay);

}

// the EL for the save btn 
$(document).on('click', '.saveBtn',function() {
    var hour = parse($(this).parent().attr(id).replace('hour-',  ''),10);
    var event = $(this).siblings('.description').val();
    saveEventToLocalStorage(hour, event);
});

// int app when dom is rdy
$(document).ready(function () {
    innitApp();
});

var events = {};