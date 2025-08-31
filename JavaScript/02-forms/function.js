// JavaScript source code
let transitionTime = 2;
let themePosition = 0;
let mouseUpdateTimeout = null;
let isDarkTheme = false;

//function power() {
//    const base = parseFloat(document.getElementById("base").value);
//    const exponent = parseFloat(document.getElementById("exponent").value);
//    const powerElement = document.getElementById("power");

//    if (!isNaN(base) && !isNaN(exponent)) {
//        powerElement.textContent = Math.pow(base, exponent);
//    } else {
//        powerElement.textContent = "–езультат";
//    }
//}
function power() {
    let base = document.getElementById("base").value;
    let exponent = document.getElementById("exponent").value;
    document.getElementById("power").innerHTML = base ** exponent;
}

function getMouseCoords(event) {
    // дебаунсинг дл€ уменьшени€ количества обновлений
    if (mouseUpdateTimeout) {
        clearTimeout(mouseUpdateTimeout);
    }

    mouseUpdateTimeout = setTimeout(() => {
        document.getElementById('mouse').textContent =
            `X = ${event.clientX}, Y = ${event.clientY}`;
    }, 16); // ~60 FPS
}
//document.addEventListener("mousemove", GetMouseCoords);
//function GetMouseCoords(event) {
//    let x = event.clientX;
//    let y = event.clientY;
//    document.getElementById("mouse").innerHTML = `X = ${x}, Y = ${y}`;
//}

function switchTheme() {
    themePosition = themePosition > 0.5 ? 0 : 1;
    updateTheme(themePosition);
    updateThemeSliderPosition();
    updateSwitchIcon();
}

function updateTheme(position) {
    themePosition = position;

    // интерпол€ци€ фона
    const bg = {
        r: Math.round(255 * (1 - position) + 34 * position),
        g: Math.round(255 * (1 - position) + 34 * position),
        b: Math.round(255 * (1 - position) + 34 * position)
    };

    const text = {
        r: Math.round(0 * (1 - position) + 240 * position),
        g: Math.round(0 * (1 - position) + 240 * position),
        b: Math.round(0 * (1 - position) + 240 * position)
    };

    const inputText = {
        r: Math.round(0 * (1 - position) + 240 * position),
        g: Math.round(0 * (1 - position) + 240 * position),
        b: Math.round(0 * (1 - position) + 240 * position)
    }
    const inputBg = {
        r: Math.round(255 * (1 - position) + 60 * position),
        g: Math.round(255 * (1 - position) + 60 * position),
        b: Math.round(255 * (1 - position) + 60 * position)
    };

    const inputBorder = {
        r: Math.round(0 * (1 - position) + 180 * position),
        g: Math.round(0 * (1 - position) + 180 * position),
        b: Math.round(0 * (1 - position) + 180 * position)
    };

    const headerBg = {
        r: Math.round(240 * (1 - position) + 50 * position),
        g: Math.round(240 * (1 - position) + 50 * position),
        b: Math.round(240 * (1 - position) + 50 * position)
    };

    const headerBorder = {
        r: Math.round(200 * (1 - position) + 100 * position),
        g: Math.round(200 * (1 - position) + 100 * position),
        b: Math.round(200 * (1 - position) + 100 * position)
    };

    const sliderBg = {
        r: Math.round(180 * (1 - position) + 100 * position),
        g: Math.round(180 * (1 - position) + 100 * position),
        b: Math.round(180 * (1 - position) + 100 * position)
    };

    const powerText = {
        r: Math.round(0 * (1 - position) + 240 * position),
        g: Math.round(0 * (1 - position) + 240 * position),
        b: Math.round(0 * (1 - position) + 240 * position)
    };

    const powerBg = {
        r: Math.round(240 * (1 - position) + 50 * position),
        g: Math.round(240 * (1 - position) + 50 * position),
        b: Math.round(240 * (1 - position) + 50 * position)
    };

    const powerBorder = {
        r: Math.round(100 * (1 - position) + 150 * position),
        g: Math.round(100 * (1 - position) + 150 * position),
        b: Math.round(100 * (1 - position) + 150 * position)
    };
    // записываем в CSS переменные
    document.documentElement.style.setProperty('--bg-r', bg.r);
    document.documentElement.style.setProperty('--bg-g', bg.g);
    document.documentElement.style.setProperty('--bg-b', bg.b);

    document.documentElement.style.setProperty('--text-r', text.r);
    document.documentElement.style.setProperty('--text-g', text.g);
    document.documentElement.style.setProperty('--text-b', text.b);

    document.documentElement.style.setProperty('--input-bg', `${inputBg.r}, ${inputBg.g}, ${inputBg.b}`);
    document.documentElement.style.setProperty('--input-border', `${inputBorder.r}, ${inputBorder.g}, ${inputBorder.b}`);

    document.documentElement.style.setProperty('--input-text', `${inputText.r}, ${inputText.g}, ${inputText.b}`);
    document.documentElement.style.setProperty('--power-text', `${powerText.r}, ${powerText.g}, ${powerText.b}`);

    document.documentElement.style.setProperty('--header-bg', `${headerBg.r}, ${headerBg.g}, ${headerBg.b}`);
    document.documentElement.style.setProperty('--header-border', `${headerBorder.r}, ${headerBorder.g}, ${headerBorder.b}`);

    document.documentElement.style.setProperty('--slider-bg', `${sliderBg.r}, ${sliderBg.g}, ${sliderBg.b}`);

    document.documentElement.style.setProperty('--power-bg', `${powerBg.r}, ${powerBg.g}, ${powerBg.b}`);
    document.documentElement.style.setProperty('--power-border', `${powerBorder.r}, ${powerBorder.g}, ${powerBorder.b}`);
    // определ€ем иконку по позиции
    isDarkTheme = position > 0.5;
    updateSwitchIcon();
}

function updateSwitchIcon() {
    const switchBg = document.getElementById('switch-background');
    if (isDarkTheme) {
        switchBg.style.backgroundImage = 'url("img/moon.png")';
    } else {
        switchBg.style.backgroundImage = 'url("img/sun.png")';
    }
}

function updateThemeSliderPosition() {
    const themeSlider = document.getElementById('themeSlider');
    const container = document.getElementById('themeSliderContainer');
    const rect = container.getBoundingClientRect();
    themeSlider.style.left = (themePosition * (rect.width - 30) + 3) + 'px';
}

function updateTransitionTime(time) {
    transitionTime = time;
    document.getElementById('transition-value').textContent = time.toFixed(1) + 's';
    document.documentElement.style.setProperty('--transition-time', time + 's');
}

// ќптимизированные слушатели событий
function initSliders() {
    const themeContainer = document.getElementById('themeSliderContainer');
    const themeSlider = document.getElementById('themeSlider');
    const transitionContainer = document.getElementById('transitionSliderContainer');
    const transitionSlider = document.getElementById('transitionSlider');

    function setupSlider(container, slider, callback) {
        container.addEventListener('mousedown', (e) => {
            const moveSlider = (e) => {
                const rect = container.getBoundingClientRect();
                let pos = (e.clientX - rect.left) / rect.width;
                pos = Math.max(0, Math.min(1, pos));
                slider.style.left = (pos * (rect.width - 30) + 3) + 'px';
                callback(pos);

                // ќбновл€ем иконку при движении слайдера темы
                if (container === themeContainer) {
                    const wasDark = isDarkTheme;
                    isDarkTheme = pos > 0.5;
                    if (wasDark !== isDarkTheme) {
                        updateSwitchIcon();
                    }
                }
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
    }

    setupSlider(themeContainer, themeSlider, updateTheme);
    setupSlider(transitionContainer, transitionSlider,
        (pos) => updateTransitionTime(0.5 + pos * 4.5));
}

// инициализаци€
document.addEventListener('mousemove', getMouseCoords);
document.addEventListener('DOMContentLoaded', function () {
    initSliders();
    updateThemeSliderPosition();
    updateTransitionTime(transitionTime);
    updateSwitchIcon();
});

// отключение ненужных анимаций при уменьшении производительности
if ('connection' in navigator && navigator.connection.saveData === true) {
    document.documentElement.style.setProperty('--transition-time', '0.1s');
}
