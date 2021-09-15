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
		},
		blur: function() {
			const val = this.value.trim();
			$(this).val(val);
			checkLength(this);
		}
	});

	function checkLength(name) {
        let message = "Имя должно быть не короче 2 символов";
        $('#name').addClass('error').after(`<span class='text-error'>${message}</span>`);
    }

	$('#email').on('blur', function() {
		
	});

		  
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