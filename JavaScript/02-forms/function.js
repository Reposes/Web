// JavaScript source code
let openForm = null;
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
	let switchBackground = document.getElementById('switch-background');
	//if (switchBackground.style.backgroundImage === 'url("img/moon.png")') {
	//	switchBackground.style.backgroundImage = 'url("img/sun.png")';
	//	document.body.className = 'dark';
	//}
	//else {
	//	switchBackground.style.backgroundImage = 'url("img/moon.png")';
	//	document.body.className = 'light';
	//}


	let delay = document.getElementById('delay').value;
	document.body.style.transition = `background-color ${delay}s, color ${delay}s`;
	document.getElementById('switch-background').style.transition = `background-image ${delay}s`;
	document.body.className = document.body.className === "light" ? "dark" : "light";
}

function UploadPhoto() {
    let image = document.getElementById('photo');
    //let fileInput = document.getElementById('students-photo');
    //let file = fileInput.files[0];

	if (document.getElementById('students-photo').files[0]) {
        //if (!file.type.match('image.*')) {
        //    alert('ѕожалуйста, выберите файл изображени€');
        //    return;
        //}

        let reader = new FileReader();

        reader.onload = function (e) {
            image.src = e.target.result;
        };

        //reader.onerror = function (error) {
        //    console.error('ќшибка чтени€ файла:', error);
        //    alert('ќшибка загрузки изображени€');
        //};

		reader.readAsDataURL(document.getElementById('students-photo').files[0]);
    }
}
let srollPosition = 0;
function toggleForm(formId) {
    const form = document.getElementById(formId);

    if (openForm === formId) {
        // закрытие формы - возврат к сохраенной позиции
        form.classList.remove('form-visible');
        form.classList.add('form-hidden');
        window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
        //setTimeout(() => {
        //    form.style.display = 'none';
        //}, 800); // соответствует duration анимации
        openForm = null;
        return;
    }
    // сохранение текущей позиции только при первом открытии любой формы
    if (!openForm) {
        scrollPosition = window.scrollY;
    }

    if (openForm) {
        const prevForm = document.getElementById(openForm);
        prevForm.classList.remove('form-visible');
        prevForm.classList.add('form-hidden');
        //setTimeout(() => {
        //    prevForm.style.display = 'none';
        //}, 800);
    }

    //form.style.display = 'block';
    //setTimeout(() => {
        form.classList.remove('form-hidden');
        form.classList.add('form-visible');
    //}, 10);
    openForm = formId;
    // прокрутка к форме, если она слишком высока€
    if (form.scrollHeight > 500) {
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
// функци€ дл€ переключени€ форм
//function toggleForm(formId) {
//	const form = document.getElementById(formId);
//	// если при открытии нажимаем на ту же форму, закрываем ее
//	if (openForm === formId) {
//		form.classList.remove('form-visible');
//		form.classList.add('form-hidden');
//		setTimeout(() => {
//			form.style.display = 'none';
//		}, 800); // соответствует duration анимации

//		openForm = null;
//		return
//	}
//	// закрываем ранее открытыю форму, если такава€ имеетс€
//	if (openForm) {
//		const prevForm = document.getElementById(openForm);
//		prevForm.classList.remove('form-visible');
//		prevForm.classList.add('form-hidden');
//		setTimeout(() => {
//			form.style.display = 'none';
//		}, 800);

//	}

//	//  открываем новую форму
//	form.styl.display = 'block';
//	setTimeout(() => {
//		form.classList.remove('form-hidden');
//		form.classList.add('form-visible');
//	}, 10);
//	openForm = formId;

//function toggleForm(formType) {
//    const powerForm = document.getElementById('power-form');
//    const regForm = document.getElementById('reg-form');

//    if (formType === 'power-form') {
//        // закрытие формы - возврат к сохраненной позиции
//        powerForm.classList.toggle('form-hidden');
//        powerForm.classList.toggle('form-visible');
//        // «акрываем другую форму если открыта
//        if (!regForm.classList.contains('form-hidden')) {
//            regForm.classList.add('form-hidden');
//            regForm.classList.remove('form-visible');
//        }
//    } else if (formType === 'reg-form') {
//        regForm.classList.toggle('form-hidden');
//        regForm.classList.toggle('form-visible');
//        // «акрываем другую форму если открыта
//        if (!powerForm.classList.contains('form-hidden')) {
//            powerForm.classList.add('form-hidden');
//            powerForm.classList.remove('form-visible');
//	regForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
//        }
//    }

//}
// обработчик нажати€ вне формы, приводит к закрытию форм
document.addEventListener('click', function (event) {
	if (!openForm) return;

	const form = document.getElementById(openForm);
	const sideMenu = document.querySelector('.side-menu');

	if (!form.contains(event.target) && !sideMenu.contains(event.target)) {
		form.classList.remove('form-visible');
		form.classList.add('form-hidden');
        openForm = null;
        window.scrollTo({ top: srollPosition, behavior: 'smooth' }); 
	}
});
