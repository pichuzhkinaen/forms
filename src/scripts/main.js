// Реализация валидации полей и отправки формы на jQuery
$(document).ready(function() {

	// Валидация полей

	let validName = 0,
		validEmail = 0,
		validFile = 1;

	$('#name').on('input', function() {
		$(this).val($(this).val().replace(/[^a-zа-яё\s]/gi, ''));
	});

	$('#name').on('blur', function(e) {
		$(this).val($(this).val().trim());
		checkLength(this.value.length, this);
	});

	$('#email').on('blur', function() {
		checkEmail(this.value, this);
	});

	$("input[name='file']").on('change', function(e) {
        e.preventDefault();
 
        const fileInput = $("input[name='file']");
        validateFile(fileInput, e);
    });


	function checkLength(inputLength, input) {
        const msg = ((inputLength === 1)) ? 'Имя должно быть не короче 2 символов' : '';

		if ($('.error-text').length === 0 && inputLength <= 1) {
			$(input).after(`<span class="error-text">${msg}</span>`);
			$(input).addClass('error');
			validName = 0;
		} else {
			$(input).siblings('.error-text').remove();
			$(input).removeClass('error');
			validName = 1;
		}
        // input.setCustomValidity(msg); // Изменение браузерного сообщения, setCustomValidity работает только при отправке формы
    }

	function checkEmail(inputValue, input) {
		const pattern = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/gm;
		if ( ! inputValue.match(pattern)) {
			$(input).after(`<span class="error-text">Введите действительный адрес электронной почты</span>`);
			validName = 0;
		} else {
			$(input).siblings('.error-text').remove();
			validEmail = 1;
		}
		// console.log(inputValue.match(pattern));
	}
  
    function validateFile(fileInput, e) {
        $('.file-error').text('');
 
        const sizeInput = fileInput[0].files[0].size,
            nameFile = fileInput[0].files[0].name,
            extensionFile = nameFile.substring(nameFile.lastIndexOf('.') + 1),
            sizeMax = 5,
            relType = ['doc', 'docx', 'pdf'];
			
        if (sizeInput > sizeMax * 1024 * 1024) {
			$(fileInput).siblings('.error-text').remove();
			$(fileInput).after(`<span class="error-text">Размер файла превышает ${sizeMax} Мбайт.</span>`);
            return false;
        }
 
        let valid = false;
 
        for (let i = 0; i < relType.length; i++) {
            if (extensionFile === relType[i]) {
                valid = true;
            }
        }
        if (valid) {
			$(fileInput).siblings('.error-text').remove();
			validFile = 1;
        } else {
            $(fileInput).siblings('.error-text').remove();
            $(fileInput).after(`<span class="error-text">Формат файла не поддерживается, допустимые форматы: Word и PDF</span>`);
			validFile = 0;
		}
    }

	// проставление маски на полe телефона
	(function (){
		let code = '+7',
			find = /\+7/;
		code = '+7';
		find = /\+7/;

		$("body").on("focus", "input[type=tel]", function(){
			this.value = code + " " + this.value.replace(code + ' ', '');
		});
		$("body").on("input", "input[type=tel]", function(){
			let val = this.value.replace(find, ''),
				res = code + " ";
			val = val.replace(/[^0-9]/g,'');

			for(let i = 0; i < val.length; i++){
				res += i === 0 ? ' (' : '';
				res += i == 3 ? ') ' : '';
				res += i== 6 || i == 8 ?' ' : '';
				if(i == 10) break;
				res += val[i];
			}
			this.value = res;
		});
		$("body").on("blur", "input[type=tel]", function(){
			let val = this.value.replace(find,'');
			val = val.trim();
			if(!val) this.value = null;
		});
	})();
		 
	//Отправка формы
	$('#form').on('submit', function(e) {
		e.preventDefault(); //после нажатия на кнопку submit форма каждый раз будет отправляться на сервер, чтобы данные проверялись на корректность перед отправкой
		const formData = $(this).serialize(); //обходит форму и собирает названия и заполненные пользователем значения полей, и возвращает в виде массива – {login: 'ЗНАЧЕНИЯ_ПОЛЯ', password: 'ЗНАЧЕНИЯ_ПОЛЯ'}, формы по которым был клик игнорируются, можно применить только к тегу form и полям формы. Данные из input type = "file" не сериализуются

		// const formData = new FormData($(this)[0]); //пары ключ-значение, из полей формы

		ajaxRequest(formData);
	});
	
	// GET-запрос 
	// function ajaxRequest(formData) {
	// 	// console.log(formData);
	// 	if (validName === 1 && validEmail === 1 && validFile === 1) {
	// 		$.ajax({
	// 			type: 'get',
	// 			url: '/request.php',
	// 			data: formData, //данные для отправки на сервер
	// 			success: function(data) {
	// 				console.log(data);
	// 				$('#form')[0].reset(); //очистка всех полей формы
	// 				history.pushState(null, null, "?" + data); //добавить данные в адресную строку без перезагрузки страницы
	// 				openModal();
	// 			},
	// 			error: function(data) {
	// 				console.log('error');
	// 			}
	// 		});
	// 	}
	// }

	// POST-запрос
	function ajaxRequest(formData) {
		// console.log(formData);
		// console.log(validName, validEmail, validFile === 1);
		if (validName === 1 && validEmail === 1 && validFile === 1) {
			$.ajax({
				url: '/request.php',
				type: 'post',
				data: formData, //данные для отправки на сервер
				processData: false, // Не обрабатываем файлы (Don't process the files)
				contentType: false, // Так jQuery скажет серверу что это строковой запрос
				//dataType : 'json', //формат данных, которые возвращает сервер
				success: function(data) {
					console.log('Данные с сервера пришли: ', data);
					$('#form')[0].reset(); //очистка всех полей формы
					openModal();
				},
				error: function(jqXHR, textStatus, errorThrown) {
					console.log('Ошибка получения ответа с сервера', jqXHR, textStatus, errorThrown);
				}
			});
		}
	}

	//Открытие и закрытие модального окна после отправки формы
	function openModal() {
		$('.modal').addClass('active');
		setTimeout(function() {
			$('.modal').removeClass('active');
		}, 3000);
	}

	$('.modal__close').on('click', function() {
		$('.modal').removeClass('active');
	});

	$(document).on('click', function (e) {
		if ($('.modal').hasClass('active')) {
			closeModal(e);
		}
	});
	
	function closeModal(e) {
		const div = $('.modal__inner');

		if ( ! div.is(e.target) && div.has(e.target).length === 0) { // если клик был вне блока с сообщением и не по его дочерним элементам
			$('.modal').removeClass('active');
		}
	}
});

// Реализация валидации полей и отправки формы на native JavaScript
// const form = document.getElementById('#fopm'),
// 	  userName = document.getElementById('#name'),
// 	  email = document.getElementById('#email'),
// 	  phone = document.getElementById('#phone'),
// 	  file = document.querySelector("input[name='file']");

// userName.addEventListener('input', functionN);
// userName.addEventListener('blur', functionN);
// email.addEventListener('blur', functionN);
// phone.addEventListener('blur', functionN);

// form.addEventListener('submit', functionN);
