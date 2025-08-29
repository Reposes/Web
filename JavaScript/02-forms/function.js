// JavaScript source code
function Power() {
	let base = document.getElementById("base").value;
	let exponent = document.getElementById("exponent").value;
	document.getElementById("power").innerHTML = base ** exponent;
}

function GetMouseCoords(event) {
	let x = event.clientX;
	let y = event.clientY;
	document.getElementById("mouse").innerHTML = `X = ${x}, Y = ${y}`;
}
document.addEventListener("mousemove", GetMouseCoords);

function SwitchBackground() {
	let switchBackground = document.getElementById('switch-background');
	if (switchBackground.style.backgroundImage === 'url("img/moon.png")') {
		switchBackground.style.backgroundImage = 'url("img/sun.png")';
		document.body.style.backgroundColor = "#333"
		document.body.style.color = "#fff";
		
	}
	else {
		switchBackground.style.backgroundImage = 'url("img/moon.png")';
		document.body.style.backgroundColor = "#fff"
		document.body.style.color = "#000";
	}
}