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


	function checkLength(length, input) {
        const msg = ((length === 1)) ? 'Имя должно быть не короче 2 символов' : '';

		if ($('.error-text').length === 0) {
			$(input).after(`<span class="error-text">${msg}</span>`);
			$(input).addClass('error');
		}
        // input.setCustomValidity(msg); // Изменение браузерного сообщения, setCustomValidity работает только при отправке формы
    }

	// $('#email').on('blur', function() {
	// 	const pattern = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/gm;
	// });
		 
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