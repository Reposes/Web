// JavaScript source code
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
        document.body.classList.add('dark');
    } else {
        switchBackground.style.backgroundImage = 'url("img/moon.png")';
        document.body.classList.remove('dark');
    }
}

// ”правление временем перехода
const slider = document.getElementById('slider');
const sliderContainer = document.getElementById('sliderContainer');
const transitionValue = document.getElementById('transition-value');

// ”становка начального значени€
let transitionTime = 2; // значение по умолчанию в секундах
updateTransitionTime(transitionTime);

sliderContainer.addEventListener('mousedown', (e) => {
    const moveSlider = (e) => {
        const rect = sliderContainer.getBoundingClientRect();
        let pos = (e.clientX - rect.left) / rect.width;
        pos = Math.max(0, Math.min(1, pos));

        // ”станавливаем позицию слайдера
        slider.style.left = (pos * (rect.width - slider.offsetWidth)) + 'px';

        // ¬ычисл€ем врем€ перехода (от 0.5 до 5 секунд)
        transitionTime = 0.5 + pos * 4.5;
        updateTransitionTime(transitionTime);
    };

    moveSlider(e);

    const mouseMove = (e) => moveSlider(e);
    const mouseUp = () => {
        document.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mouseup', mouseUp);
    };

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
});

function updateTransitionTime(time) {
    // ќбновл€ем значение времени перехода
    transitionValue.textContent = time.toFixed(1) + 's';

    // ѕримен€ем новое врем€ перехода к body
    document.body.style.transition = `background ${time}s, color ${time}s`;
}