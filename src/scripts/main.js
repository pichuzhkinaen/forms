$(document).ready(function() {
    
	// const name = $('#name'),
	// 	  email = $('#email'),
	// 	  phone = $('#phone'),
	// 	  checkbox = $('.form__checkbox'),
	// 	  radio = $('.form__radio'),
	// 	  select = $('.form__select'),
	// 	  file = $('.form__file');


	$('#name').on({
		input: function() {
			const val = this.value.replace(/[^a-zа-я _-]/gmi,'');
			$(this).val(val);
			$(this).removeClass('error');
			$('.text-error').remove();   
		},
		blur: function() {
			const val = this.value.trim();
			$(this).val(val);
			checkLength(this);
		}
	});

	function checkLength(name) {
		const message = "Имя должно быть не короче 2 символов";
		if (name.value.length < 2) {
			$(name).addClass('error').after(`<span class='text-error'>${message}</span>`);
		} else {
			$(name).removeClass('error');
			$('.text-error').remove();
		}
    } 

	$('#email').on({
		input: function() {
			$(this).removeClass('error');
			$('.text-error').remove();  
		},
		blur: function() {
			const val = this.value.replace(/\s+/g, '');
			$(this).val(val);
			validateEmail(this);
		}
	});

	function validateEmail(email) {
		const message = "Введите корректный адрес электронной почты",
			  pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

		if (pattern.test(String(email.value).toLowerCase()) === false) {
			$(email).addClass('error').after(`<span class='text-error'>${message}</span>`);
		} else {
			$(email).removeClass('error');
			$('.text-error').remove();
		}
	}

	function usePhoneMask() {
		let code = '+7',
			find = /\+7/;

	    $('input[data-phone]').on({
			focus: function() {
				console.log(this.value);
				this.value = code + ' ' + this.value.replace(code + ' ', '');
			},
			input: function() {
				let val = this.value.replace(find, ''),
					res = code;

				val = val.replace(/[^0-9]/g, '');
	
				for(let i = 0; i < val.length; i++){
					res += i === 0 ? ' (' : '';
					res += i == 3 ? ') ' : '';
					res += i == 6 || i == 8 ? '-' : '';
					if (i == 10) break;
					res += val[i];
				}
				this.value = res;
			},
			blur: function() {
				let val = this.value.replace(find, '');
				val = val.trim();
				if (!val) this.value = null;
			}
		});
	}

		  
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

	// //очистка инпутов при отправке формы
	// $('#form-button').on('click', function() {
	// 	$('.form__input').val('');
	// });

	usePhoneMask();
});