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