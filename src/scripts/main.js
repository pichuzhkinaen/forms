// Реализация валидации полей и отправки формы на jQuery
$(document).ready(function() {

	// Валидация полей
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
		}
        // input.setCustomValidity(msg); // Изменение браузерного сообщения, setCustomValidity работает только при отправке формы
    }

	function checkEmail(inputValue, input) {
		const pattern = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/gm;
		if ( ! inputValue.match(pattern)) {
			$(input).after(`<span class="error-text">Введите действительный адрес электронной почты</span>`);
		} else {
			$(input).siblings('.error-text').remove();
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
        } else {
            $(fileInput).siblings('.error-text').remove();
            $(fileInput).after(`<span class="error-text">Формат файла не поддерживается, допустимые форматы: Word и PDF</span>`);
        }
    }
		 
	//Отправка формы
	$('#form').on('submit', function(e) {
		e.preventDefault(); //после нажатия на кнопку submit форма каждый раз будет отправляться на сервер, чтобы данные проверялись на корректность перед отправкой
		//const formData = $(this).serialize(); //обходит форму и собирает названия и заполненные пользователем значения полей, и возвращает в виде массива – {login: 'ЗНАЧЕНИЯ_ПОЛЯ', password: 'ЗНАЧЕНИЯ_ПОЛЯ'}, формы по которым был клик игнорируются, можно применить только к тегу form и полям формы. Данные из input type = "file" не сериализуются
		// const formData = $('#name').val();

		const formData = new FormData(e.target); //пары ключ-значение, из полей формы

		ajaxRequest(formData);
	});
	
	// function ajaxRequest(formData) {
	// 	// console.log(formData);
	// 	$.ajax({
	// 		type: 'get',
	// 		url: '/request.php',
	// 		data: formData, //данные для отправки на сервер
	// 		success: function(data) {
	// 			console.log(data);
	// 			$('#form')[0].reset(); //очистка всех полей формы
	// 			openModal();
	// 		},
	// 		error: function(data) {
	// 			console.log('error');
	// 		}
	// 	});
	// }

	function ajaxRequest(formData) {
		
		// const newFormData = [...formData];
		// console.log(...formData);
		for (let [key, value] of formData.entries()) { 
			console.log(key, value);
		}
		
		// const myJsonString = JSON.stringify(formData);

		// console.log(myJsonString);

		$.ajax({
			type: 'post',
			url: '/request.php',
			data: myJsonString, //данные для отправки на сервер
			processData: false,
			// dataType : 'json', //формат данных, которые возвращает сервер
			// dataType: dataType,
			success: function(data) {
				console.log('Данные с сервера пришли', data);
				$('#form')[0].reset(); //очистка всех полей формы
				openModal();
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log('Ошибка получения ответа с сервера', jqXHR, textStatus, errorThrown);
			}
		});
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