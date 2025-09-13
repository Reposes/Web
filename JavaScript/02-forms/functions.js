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

    } else {
        btnStart.value = "Start";
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

    // сводим даты и время в одну переменную:
    targetTime.setFullYear(targetDate.getFullYear());
    targetTime.setMonth(targetDate.getMonth());
    targetTime.setDate(targetDate.getDate());

    // Debug target datetime:
    document.getElementById("target-date-value").innerHTML = targetDate;
    document.getElementById("target-time-value").innerHTML = targetTime;
}