$(document).ready(function() {
    
	// const name = $('#name'),
	// 	  email = $('#email'),
	// 	  phone = $('#phone'),
	// 	  checkbox = $('.form__checkbox'),
	// 	  radio = $('.form__radio'),
	// 	  select = $('.form__select'),
	// 	  file = $('.form__file');

	$('#name').on('blur', function() {
		nameValidate(this);
	});

	function nameValidate(name) {
		let pattern = /(^[A-Z]{1}[a-z]{1,14} [A-Z]{1}[a-z]{1,14}$)|(^[А-Я]{1}[а-я]{1,14} [А-Я]{1}[а-я]{1,14}$)/;

		name = name.match(pattern).trim();
		console.log(name);
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

});