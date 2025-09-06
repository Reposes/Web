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
        //    alert('Пожалуйста, выберите файл изображения');
        //    return;
        //}

        let reader = new FileReader();

        reader.onload = function (e) {
            image.src = e.target.result;
        };

        //reader.onerror = function (error) {
        //    console.error('Ошибка чтения файла:', error);
        //    alert('Ошибка загрузки изображения');
        //};

		reader.readAsDataURL(document.getElementById('students-photo').files[0]);
    }
}

// функция для переключения форм
function toggleForm(formId) {
	const form = document.getElementById(formId);
	// если при открытии нажимаем на ту же форму, закрываем ее
	if (openForm === formId) {
		form.classList.remove('form-visible');
		form.classList.add('form-hidden');
		openForm = null;
		return
	}
	// закрываем ранее открытыю форму, если такавая имеется
	if (openForm) {
		const prevForm = document.getElementById(openForm);
		prevForm.classList.remove('form-visible');
		prevForm.classList.add('form-hidden');

	}

	//  открываем новую форму
	form.classList.remove('form-hidden');
	form.classList.add('form-visible');
	openForm = formId;
//function toggleForm(formType) {
//    const powerForm = document.getElementById('power-form');
//    const regForm = document.getElementById('reg-form');

//    if (formType === 'power-form') {
//        powerForm.classList.toggle('form-hidden');
//        powerForm.classList.toggle('form-visible');
//        // Закрываем другую форму если открыта
//        if (!regForm.classList.contains('form-hidden')) {
//            regForm.classList.add('form-hidden');
//            regForm.classList.remove('form-visible');
//        }
//    } else if (formType === 'reg-form') {
//        regForm.classList.toggle('form-hidden');
//        regForm.classList.toggle('form-visible');
//        // Закрываем другую форму если открыта
//        if (!powerForm.classList.contains('form-hidden')) {
//            powerForm.classList.add('form-hidden');
//            powerForm.classList.remove('form-visible');
//        }
//    }

	regForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
document.addEventListener('click', function (event) {
	if (!openForm) return;

	const form = document.getElementById(openForm);
	const sideMenu = document.querySelector('.side-menu');

	if (!form.contains(event.target) && !sideMenu.contains(event.target)) {
		form.classList.remove('form-visible');
		form.classList.add('form-hidden');
		openForm = null;
	}
});
