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
// Отслеживание мыши
//document.addEventListener("mousemove", (e) => {
//    document.getElementById("mouse").textContent = `X:${e.clientX} Y:${e.clientY}`;
//});

// Управление темой
const slider = document.getElementById('slider');
const sliderContainer = document.getElementById('sliderContainer');

// установка начального положения слайдера
slider.style.left = '2px';

// 1).добавляем обработчик события нажатия кнопки мыши на контейнер слайдера
sliderContainer.addEventListener('mousedown', (e) => {
	e.preventDefault();
	// 2). создаем фунцию для перемещения слайдера
	const moveSlider = (e) => {
		// 3).получаем размеры и позицию контейнера слайдера
		const rect = sliderContainer.getBoundingClientRect();
		// 4). вычисляем позицию курсора относительно с контейнера
		let pos = (e.clientX - rect.left) / rect.width;
		// 5). ограничиваем позицию в диапазон от 0 до 1
		pos = Math.max(0, Math.min(1, pos));
		// 6). устанавливаем новую позицию слайдера
		slider.style.left = (pos * (rect.width - slider.offsetWidth)) + 'px';
		/*document.body.classList.toggle('dark', pos > 0.5);*/
		const brightness = Math.round(255 * (1 - pos));

		// постепенное изменение темы
		const darkAmount = pos;
		const lightAmount = 1 - pos;

		// вычисление промежуточных цветов
		const bgR = Math.round(255 * ligthAmount + 34 * darkAmount);
		const bgG = Math.round(255 * ligthAmount + 34 * darkAmount);
		const bgB = Math.round(255 * ligthAmount + 34 * darkAmount);

		const textR = Math.round(0 * ligthAmount + 240 * darkAmount);
		const textG = Math.round(0 * ligthAmount + 240 * darkAmount);
		const textB = Math.round(0 * ligthAmount + 240 * darkAmount);

		// применение цветов 
		document.body.style.backgroundColor = `rgb(${bgR}, ${bgG}, ${bgB})`;
		document.body.style.color = `rgb(${textR}, ${textG}, ${textB})`;

		// обновление картинки

		if (pos > 0.5) {
			document.body.classList.add('dark');
		} else {
			document.body.classList.remove('dark');
		}
		updateSwitchIcon();

	};
	// 8). (сразу обновляем позицию)вызываем функцию для установки начальной позиции
    moveSlider(e);
	// 9). создаем функцию для обработки движения мыши
	const mouseMove = (e) => moveSlider(e);
	// 10). создаем функцию для обработки отпускания кнопки мыши
	const mouseUp = () => {
		// 11). Удаляем обработчики после отпускания кнопки
        document.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mouseup', mouseUp);
    };
	/// 12). добавляем обработчики для движения мыиш и отпускания
    document.addEventListener('mousemove', mouseMove);
	document.addEventListener('mouseup', mouseUp);

	updateSwitchIcon();
});