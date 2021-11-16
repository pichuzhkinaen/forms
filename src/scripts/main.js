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

	$("input[name='file']").on("change", function(e) {
        e.preventDefault();
 
        const fileInput = $("input[name='file']");
        validateFile(fileInput, e);
    });


	function checkLength(inputLength, input) {
        const msg = ((inputLength === 1)) ? 'Имя должно быть не короче 2 символов' : '';

		if ($('.error-text').length === 0) {
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
            sizeMax = 20,
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
            // $(fileInput).val('');
            $(fileInput).siblings('.error-text').remove();
            $(fileInput).after(`<span class="error-text">Формат файла не поддерживается, допустимые форматы: Word и PDF</span>`);
        }
    }
		 
	//Отправка формы
	$('#submit').on('submit', function() {
		e.preventDefault();
		console.log(111);

		$.ajax({
			type: 'POST',
			url: 'request.php',
			data: 1,
			success: function(data) {
				console.log(data);
			},
			error: function() {
				console.log('error');
			}
		});
	});
});

// Реализация валидации полей и отправки формы на native JavaScript