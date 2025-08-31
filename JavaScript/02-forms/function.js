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

function switchTheme() {
	document.body.classList.toggle('dark');
	updateSwitchIcon();
}
function updateSwitchIcon() {
	let switchBackground = document.getElementById('switchTheme');
	if (document.body.classList.contains('dark')) {
		switchTheme.style.backgroundImage = 'url("img/sun.png")';
		//document.body.style.backgroundColor = "#333"
		//document.body.style.color = "#fff";

	}
	else {
		switchTheme.style.backgroundImage = 'url("img/moon.png")';
		//document.body.style.backgroundColor = "#fff"
		//document.body.style.color = "#000";
	}
}
// ������������ ����
//document.addEventListener("mousemove", (e) => {
//    document.getElementById("mouse").textContent = `X:${e.clientX} Y:${e.clientY}`;
//});

// ���������� �����
const slider = document.getElementById('slider');
const sliderContainer = document.getElementById('sliderContainer');

// ��������� ���������� ��������� ��������
slider.style.left = '2px';

// 1).��������� ���������� ������� ������� ������ ���� �� ��������� ��������
sliderContainer.addEventListener('mousedown', (e) => {
	e.preventDefault();
	// 2). ������� ������ ��� ����������� ��������
	const moveSlider = (e) => {
		// 3).�������� ������� � ������� ���������� ��������
		const rect = sliderContainer.getBoundingClientRect();
		// 4). ��������� ������� ������� ������������ � ����������
		let pos = (e.clientX - rect.left) / rect.width;
		// 5). ������������ ������� � �������� �� 0 �� 1
		pos = Math.max(0, Math.min(1, pos));
		// 6). ������������� ����� ������� ��������
		slider.style.left = (pos * (rect.width - slider.offsetWidth)) + 'px';
		/*document.body.classList.toggle('dark', pos > 0.5);*/
		const brightness = Math.round(255 * (1 - pos));

		// ����������� ��������� ����
		const darkAmount = pos;
		const lightAmount = 1 - pos;

		// ���������� ������������� ������
		const bgR = Math.round(255 * ligthAmount + 34 * darkAmount);
		const bgG = Math.round(255 * ligthAmount + 34 * darkAmount);
		const bgB = Math.round(255 * ligthAmount + 34 * darkAmount);

		const textR = Math.round(0 * ligthAmount + 240 * darkAmount);
		const textG = Math.round(0 * ligthAmount + 240 * darkAmount);
		const textB = Math.round(0 * ligthAmount + 240 * darkAmount);

		// ���������� ������ 
		document.body.style.backgroundColor = `rgb(${bgR}, ${bgG}, ${bgB})`;
		document.body.style.color = `rgb(${textR}, ${textG}, ${textB})`;

		// ���������� ��������

		if (pos > 0.5) {
			document.body.classList.add('dark');
		} else {
			document.body.classList.remove('dark');
		}
		updateSwitchIcon();

	};
	// 8). (����� ��������� �������)�������� ������� ��� ��������� ��������� �������
    moveSlider(e);
	// 9). ������� ������� ��� ��������� �������� ����
	const mouseMove = (e) => moveSlider(e);
	// 10). ������� ������� ��� ��������� ���������� ������ ����
	const mouseUp = () => {
		// 11). ������� ����������� ����� ���������� ������
        document.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mouseup', mouseUp);
    };
	/// 12). ��������� ����������� ��� �������� ���� � ����������
    document.addEventListener('mousemove', mouseMove);
	document.addEventListener('mouseup', mouseUp);

	updateSwitchIcon();
});