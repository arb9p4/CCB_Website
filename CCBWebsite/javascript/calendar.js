/*
   Author: Alex Franklin
   Date:   11/4/2016
   File: calendar.js
   
   Function List:
   
	function setMonthYear				-		set the month and year global variables to that on the current date
	function daysInMonth()				-		calculate the number of days in the current month
	function daysInOtherMonth()			-		calculate the number of days in the month before or after the current month
	function updateIDName(counter)		-		updates and returns the idName used to identify the cells of the calendar table
	function writeCalDays()				-		write the dates and events on the calendar for the current month
	function writePrevCalDays()			-		write the dates and events on the calendar for the previous month
	function writeNextCalDays()			-		write the dates and events on the calendar for the next month
	function clearCalendarDays()		-		clears the contents of all cells in the calendar table
	function writePreviousMonth()		-		writes the name of the previous month in the table header	
	function writeNextMonth()			-		writes the name of the next month in the table header
*/

//declare global variables to track the month and the year being displayed
var month;
var year;
var todayCell;

//set the month and year global variables to that on the current date
function setMonthYear(){
	//today's date
	var today = new Date();
	
	//get month (0-11)
	month = today.getMonth();
	
	//get 4 digit year
	year = today.getFullYear();
}

//calculate the number of days in the current month
function daysInMonth() {
	//today's date
	var calendarDay = new Date();
	//array of days in each month
	var dayCount = [31,28,31,30,31,30,31,31,30,31,30,31];
	
	//extract the four digit year value from calendarDay
	var thisYear = calendarDay.getFullYear();
	
	//extract the month value from calendarDay
	var thisMonth = calendarDay.getMonth();
	
	//revise the days in February for leap years
	if (thisYear % 4 == 0) {
		if ((thisYear % 100 != 0) || (thisYear % 400 == 0)) {
			dayCount[1] = 29;
		}
	}
	
	//return the number of days for the current month
	return dayCount[thisMonth];
}

//calculate the number of days in the month before or after the current month
function daysInOtherMonth() {
	//array of days in each month
	var dayCount = [31,28,31,30,31,30,31,31,30,31,30,31];
	
	//extract the four digit year value from calendarDay
	thisYear = year;
	
	//extract the month value from calendarDay
	var thisMonth = month;
	
	//revise the days in February for leap years
	if (thisYear % 4 == 0) {
		if ((thisYear % 100 != 0) || (thisYear % 400 == 0)) {
			dayCount[1] = 29;
		}
	}
	
	//return the number of days for the previous or next month
	return dayCount[thisMonth];
}

//updates and returns the idName used to identify the cells of the calendar table
function updateIDName(counter){
	//update idName
	var idName = "Cell" + counter;
	return(idName);
}

//write the dates and events on the calendar for the current month
function writeCalDays() {
	//find today's date
	var calendarDay = new Date();
	//create the first day of the month
	var day = new Date(calendarDay.getFullYear(), calendarDay.getMonth(), 1);
	//find the weekday the month starts on (0-6)
	var weekDay = day.getDay();
	var cellCount = 1;
	
	//set global month and year variables
	setMonthYear();
	
	//copy the events array for the current month from the appropriate month event array
	switch(month){
		case 0:
			var currentMonthEvents = JanuaryDayEvent.slice(0);
			break;
		case 1:
			var currentMonthEvents = FebruaryDayEvent.slice(0);
			break;
		case 2:
			var currentMonthEvents = MarchDayEvent.slice(0);
			break;
		case 3:
			var currentMonthEvents = AprilDayEvent.slice(0);
			break;
		case 4:
			var currentMonthEvents = MayDayEvent.slice(0);
			break;
		case 5:
			var currentMonthEvents = JuneDayEvent.slice(0);
			break;
		case 6:
			var currentMonthEvents = JulyDayEvent.slice(0);
			break;
		case 7:
			var currentMonthEvents = AugustDayEvent.slice(0);
			break;
		case 8:
			var currentMonthEvents = SeptemberDayEvent.slice(0);
			break;
		case 9:
			var currentMonthEvents = OctoberDayEvent.slice(0);
			break;
		case 10:
			var currentMonthEvents = NovemberDayEvent.slice(0);
			break;
		case 11:
			var currentMonthEvents = DecemberDayEvent.slice(0);
			break;
	}

	//print a blank cell for all days preceding the monthly start date
	if (weekDay > 0){
		for (var i = 1; i <= weekDay; i++) {
			document.getElementById("Cell" + i).innerHTML = "";
			cellCount++;
		}
	}

	//print the date and events for each cell in the table
	for (var i = 1; i < daysInMonth() + 1; i++) {
		document.getElementById("Cell" + cellCount).innerHTML = i + currentMonthEvents[i];
		
		if (i == calendarDay.getDate()){
			document.getElementById("Cell" + cellCount).className = "calendar_today";
			todayCell = "Cell" + cellCount;
		}
		
		cellCount++;
	}
	
	
}

//write the dates and events on the calendar for the previous month
function writePrevCalDays() {
	//create the first day of the previous month
	var day = new Date(year, month, 1);
	//get today's date
	var today = new Date();
	//find the start day of the month (0-6)
	var weekDay = day.getDay();
	var cellCount = 1;

	//create the array of current month events if the previous month is after today's date else print a blank calendar
	if (((month >= today.getMonth()) && (year >= today.getFullYear())) || ((month < today.getMonth()) && (year > today.getFullYear()))){
		switch(month){
			case 0:
				var currentMonthEvents = JanuaryDayEvent.slice(0);
				break;
			case 1:
				var currentMonthEvents = FebruaryDayEvent.slice(0);
				break;
			case 2:
				var currentMonthEvents = MarchDayEvent.slice(0);
				break;
			case 3:
				var currentMonthEvents = AprilDayEvent.slice(0);
				break;
			case 4:
				var currentMonthEvents = MayDayEvent.slice(0);
				break;
			case 5:
				var currentMonthEvents = JuneDayEvent.slice(0);
				break;
			case 6:
				var currentMonthEvents = JulyDayEvent.slice(0);
				break;
			case 7:
				var currentMonthEvents = AugustDayEvent.slice(0);
				break;
			case 8:
				var currentMonthEvents = SeptemberDayEvent.slice(0);
				break;
			case 9:
				var currentMonthEvents = OctoberDayEvent.slice(0);
				break;
			case 10:
				var currentMonthEvents = NovemberDayEvent.slice(0);
				break;
			case 11:
				var currentMonthEvents = DecemberDayEvent.slice(0);
				break;
		}
	}
	else {
		var currentMonthEvents = blankMonth.slice(0);
	}
	
	//print empty cells for the days preceding the start of the month
	if (weekDay > 0){
		for (var i = 1; i <= weekDay; i++) {
			document.getElementById("Cell" + i).innerHTML = "";
			cellCount++;
		}
	}
	
	//print the date and events to all of the remaining cells in the calendar
	for (var i = 1; i < (daysInOtherMonth() + 1); i++) {
		document.getElementById("Cell" + cellCount).innerHTML = i + currentMonthEvents[i];
			
		cellCount++;
	}	
}

//write the dates and events on the calendar for the next month
function writeNextCalDays() {
	//create start day for the next month
	var day = new Date(year, month, 1);
	//create today's date
	var today = new Date();
	//find the day of the week for the first day of the next month
	var weekDay = day.getDay();
	var cellCount = 1;

	//print the next month dates and events if the month is within 1 year following today's month else print a blank month
	if (((month < today.getMonth()) && (year == (today.getFullYear() + 1))) || ((month >= today.getMonth()) && (year == today.getFullYear()))){	
		switch(month){
			case 0:
				var currentMonthEvents = JanuaryDayEvent.slice(0);
				break;
			case 1:
				var currentMonthEvents = FebruaryDayEvent.slice(0);
				break;
			case 2:
				var currentMonthEvents = MarchDayEvent.slice(0);
				break;
			case 3:
				var currentMonthEvents = AprilDayEvent.slice(0);
				break;
			case 4:
				var currentMonthEvents = MayDayEvent.slice(0);
				break;
			case 5:
				var currentMonthEvents = JuneDayEvent.slice(0);
				break;
			case 6:
				var currentMonthEvents = JulyDayEvent.slice(0);
				break;
			case 7:
				var currentMonthEvents = AugustDayEvent.slice(0);
				break;
			case 8:
				var currentMonthEvents = SeptemberDayEvent.slice(0);
				break;
			case 9:
				var currentMonthEvents = OctoberDayEvent.slice(0);
				break;
			case 10:
				var currentMonthEvents = NovemberDayEvent.slice(0);
				break;
			case 11:
				var currentMonthEvents = DecemberDayEvent.slice(0);
				break;
		}
	}
	else {
		var currentMonthEvents = blankMonth.slice(0);
	}
	
	//print blank cells for the days of the week prior to the start of the month
	if (weekDay > 0){	
		for (var i = 1; i <= weekDay; i++) {
			document.getElementById("Cell" + i).innerHTML = "";
			cellCount++;
		}
	}
	
	//print the dates and events for the remaining cells on the calendar
	for (var i = 1; i < (daysInOtherMonth() + 1); i++) {
		document.getElementById("Cell" + cellCount).innerHTML = i + currentMonthEvents[i];
			
		cellCount++;
	}
	
}

//clears the contents of all cells in the calendar table
function clearCalendarDays(){
	//clear table
	for(i = 1; i < 43; i++) {
		document.getElementById("Cell" + i).innerHTML = "";
	}
}

//writes the name of the previous month in the table header
function writePreviousMonth(){
	//create an array of month names to reference; note: array element 0 is January, not 1.
	var monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	
	//update the month variable with the array element position of the previous month
	month = month - 1;
	if (month == -1){
		month = 11;
		year--;
	}

	//change month name in title
	document.getElementById("calendar_head").innerHTML = monthName[month] + " " + year;

	//clear the cells within the calendar table
	clearCalendarDays();
	//change the class name of today to calendar_dates to remove the highlighting style
	document.getElementById(todayCell).className = "calendar_dates";
	//write the days of the previous month to the calendar
	writePrevCalDays();
	
}

//writes the name of the next month in the table header
function writeNextMonth(){
	//create an array of month names to reference. note: january starts at array element position 0, not 1.
	var monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	
	//update month global variable with the array position of the next month
	month = month + 1;
	if (month == 12){
		month = 0;
		year++;
	}
	
	//change month name in title
	document.getElementById("calendar_head").innerHTML = monthName[month] + " " + year;

	//clear the contents of the cells in the calendar table
	clearCalendarDays();
	//change the class name of the highlighted cell to calendar_dates
	document.getElementById(todayCell).className = "calendar_dates";
	//write the events and dates of the next month
	writeNextCalDays();
	
}
