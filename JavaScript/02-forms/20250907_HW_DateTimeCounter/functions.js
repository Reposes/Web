// JavaScript source code
function Power() {
    let base = document.getElementById("base").value;
    let exponent = document.getElementById("exponent").value;
    document.getElementById("power").innerHTML = base ** exponent;
}
document.addEventListener("mousemove", GetMouseCoords);
function GetMouseCoords(event) {
    let x = event.clientX;
    let y = event.clientY;
    document.getElementById("mouse").innerHTML = `X = ${x}, Y = ${y}`;
}
function SwitchBackground() {
    let switchBackground = document.getElementById("switch-background");
    //if(switchBackground.style.backgroundImage === 'url("img/moon.png")')
    //{
    //    switchBackground.style.backgroundImage = 'url("img/sun.png")';
    //    document.body.className = 'dark';
    //}
    //else
    //{
    //    switchBackground.style.backgroundImage = 'url("img/moon.png")';
    //    document.body.className = 'light';
    //}
    let delay = document.getElementById('delay').value;
    document.body.style.transition = `background-color ${delay}s, color ${delay}s`;
    document.getElementById('switch-background').style.transition = `background-image ${delay}s`;
    document.body.className = document.body.className === "light" ? "dark" : "light";
}
function UploadPhoto() {
    let image = document.getElementById('photo');
    let students_photo = document.getElementById('students-photo');
    let filename = students_photo.value.split('\\');
    filename = filename[filename.length - 1];
    image.src = filename;
    alert(filename);
    //alert(students_photo.value);
}

function setImage() {
    let filename = document.getElementById("students-photo");
    let reader = new FileReader();
    reader.onload = function (e)
    {
        document.getElementById("photo").src = e.target.result;
    }
    reader.readAsDataURL(filename.files[0]);
}
/////////////////////////////////////////////////////////////////////
//////////////////          Timer                   /////////////////

/*const endDate = new Date*//*('2026-01-01T00:00:00'); //*//*(targetDateControl + targetTimeControl);*/
let endDate;
let countdownTimver = null;
let countDaysMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
document.body.onload = function tick_timer()
{
    let time = new Date();
    document.getElementById("full-time").innerHTML = time;

    //                  Current time
    document.getElementById("hours").innerHTML = addLeadingZero(time.getHours());
    document.getElementById("minutes").innerHTML = addLeadingZero(time.getMinutes());
    document.getElementById("seconds").innerHTML = addLeadingZero(time.getSeconds());

    //                  Current day
    document.getElementById("years").innerHTML = addLeadingZero(time.getFullYear());
    document.getElementById("month").innerHTML = addLeadingZero(time.getMonth() +1 );
    document.getElementById("day").innerHTML = addLeadingZero(time.getDate());

    //                  Weekday
    document.getElementById("weekday").innerHTML = time.toLocaleDateString("ru", {weekday: 'long'});

    //                  Checkboxes:
    document.getElementById("current-date").style.visibility = document.getElementById("show-date").checked ? "visible" : "hidden";
    document.getElementById("weekday").style.visibility = document.getElementById("show-weekday").checked ? "visible" : "hidden";
    
    setTimeout(tick_timer, 1000);
}
function addLeadingZero(number) {
    return number < 10 ? "0" + number : number;
}

document.getElementById("btn-start").onclick = function startCountdownTimer() {
    let targetDateControl = document.getElementById("target-date");
    let targetTimeControl = document.getElementById("target-time");
    let btnStart = document.getElementById("btn-start");
    targetDateControl.disabled = targetTimeControl.disabled = !targetDateControl.disabled;
    if (btnStart.value === "Start") {
        btnStart.value = "Stop";
        tickCountdown();
        //document.getElementById("target-date-value").innerHTML = targetDateControl.valueAsDate;
        /*document.getElementById("target-time-value").innerHTML = targetTimeControl.valueAsDate;*/
        //запускаем таймер
        countdownTimer = setInterval(updateCountdown, 1000);

    } else {
        btnStart.value = "Start";

        // останавливаем таймер
        clearInterval(countdownTimer);
        countdownTimer = null;

        document.getElementById("target-date-value").innerHTML = "Weiting....";
        document.getElementById("target-time-value").innerHTML = "Weiting....";
    }
}
function tickCountdown() {
    if (!document.getElementById("target-time").disabled) return;

    let now = new Date();
    let targetDateControl = document.getElementById("target-date");
    let targetTimeControl = document.getElementById("target-time");
    let targetDate = targetDateControl.valueAsDate;
    let targetTime = targetTimeControl.valueAsDate;

    //Выравнивание часового пояса:
    console.log(targetDate.getTimezoneOffset());
    targetDate.setHours(targetDate.getHours() + targetDate.getTimezoneOffset() / 60); // getTimezoneOffset() возвращает значение в минутах, поэтому делим на 60
    targetTime.setHours(targetTime.getHours() + targetTime.getTimezoneOffset() / 60);

    if (!targetDate || !targetTime) {
        console.log("Дата и время не выбраны");
        return;
    }

    // сводим даты и время в одну переменную:
    //targetTime.setFullYear(targetDate.getFullYear());
    //targetTime.setMonth(targetDate.getMonth());
    //targetTime.setDate(targetDate.getDate());
   
    endDate = new Date(
        targetDate.getFullYear(),
        targetDate.getMonth(),
        targetDate.getDate(),
        targetTime.getHours(),
        targetTime.getMinutes(),
        targetTime.getSeconds(),
        0
    );
    // Debug target datetime:
    document.getElementById("target-date-value").innerHTML = targetDate;
    document.getElementById("target-time-value").innerHTML = targetTime;


    fillArrays();
}

function fillArrays() {
    const now = new Date();

    let years = endDate.getFullYear() - now.getFullYear();
    let months = endDate.getMonth() - now.getMonth();
    let days = endDate.getDate() - now.getDate();
    let hours = endDate.getHours() - now.getHours();
    let minutes = endDate.getMinutes() - now.getMinutes();
    let seconds = endDate.getSeconds() - now.getSeconds();

    // --- kорректировки (если получилась "отрицательная часть", то занимаем у старшей единицы) ---
    if (seconds < 0) {
        seconds += 60;
        minutes--;
    }
    if (minutes < 0) {
        minutes += 60;
        hours--;
    }
    if (hours < 0) {
        hours += 24;
        days--;
    }
    if (days < 0) {
        //// берем количество дней в предыдущем месяце
        //const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        //days += prevMonth;
        //months--;
        let monthIndex = now.getMonth() - 1;
        let year = now.getFullYear();

        if (monthIndex < 0) {
            monthIndex = 11;
            year--;
        }
        // копия массива
        let daysInMonths = countDaysMonths;
        // учитываем високосный год
        if (isLeapYear(year)) {
            daysInMonths[1] = 29;
        }

        days += daysInMonths[monthIndex];
        months--;
    }

    if (months < 0) {
        months += 12;
        years--;
    }

    return { years, months, days, hours, minutes, seconds };
}
function updateCountdown() {
    if (!endDate) return;

    const now = new Date().getTime();
    const distance = endDate - now;

    if (distance < 0) {
        clearInterval(countdownTimer);
        document.getElementById('timer').innerHTML = 'Время вышло';
        return;
    }

    const timeLeft = fillArrays();

    function toggleBlock(id, value) {
        const block = document.getElementById(id).parentElement;
        document.getElementById(id).textContent = value;
        block.style.display = value === 0 ? "none" : "block";
    }

    //document.getElementById('years-unit').textContent = timeLeft.years;
    //document.getElementById('months-unit').textContent = timeLeft.months;
    //document.getElementById('days-unit').textContent = timeLeft.days;
    //document.getElementById('hours-unit').textContent = timeLeft.hours;
    //document.getElementById('minutes-unit').textContent = timeLeft.minutes;
    //document.getElementById('seconds-unit').textContent = timeLeft.seconds;

    toggleBlock('years-unit', timeLeft.years);
    toggleBlock('months-unit', timeLeft.months);
    toggleBlock('days-unit', timeLeft.days);
    toggleBlock('hours-unit', timeLeft.hours);
    toggleBlock('minutes-unit', timeLeft.minutes);
    toggleBlock('seconds-unit', timeLeft.seconds);

    document.getElementById('timer').textContent =
        `${timeLeft.days}д ${timeLeft.hours}ч ${timeLeft.minutes}м ${timeLeft.seconds}с`;
}

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}
//const countdownTimer = setInterval(updateCountdown, 1000);
///*updateCountdown();*/