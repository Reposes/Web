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
        //    alert('����������, �������� ���� �����������');
        //    return;
        //}

        let reader = new FileReader();

        reader.onload = function (e) {
            image.src = e.target.result;
        };

        //reader.onerror = function (error) {
        //    console.error('������ ������ �����:', error);
        //    alert('������ �������� �����������');
        //};

		reader.readAsDataURL(document.getElementById('students-photo').files[0]);
    }
}
let srollPosition = 0;
// ������� ��� ������������ ����
function toggleForm(formId) {
    const form = document.getElementById(formId);

    if (openForm === formId) {
        // �������� ����� - ������� � ���������� �������
        form.classList.remove('form-visible');
        form.classList.add('form-hidden');
        window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
        //setTimeout(() => {
        //    form.style.display = 'none';
        //}, 800); // ������������� duration ��������
        openForm = null;
        return;
    }
    // ���������� ������� ������� ������ ��� ������ �������� ����� �����
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
    // ��������� � �����, ���� ��� ������� �������
    if (form.scrollHeight > 500) {
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
// ���������� ������� ��� �����, �������� � �������� ����
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
