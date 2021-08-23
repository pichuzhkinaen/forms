$(document).ready(function(){

	//слайдер
	$('.carousel-big').on('init', function(event, slick) {
		$('.navigation__loading').addClass('start');
		
		let countSlide = slick.slideCount;

		if(countSlide < 10) {
			countSlide = "0" + countSlide;
		}

		$('#last-numbers').html(countSlide);
	}).slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		fade: true,
		asNavFor: '.carousel-small',
		appendArrows: $('#slider-arrows'),
		prevArrow: '<button id="prev" type="button" class="navigation__arrow navigation__arrow_type_prev"></button>',
		nextArrow: '<button id="next" type="button" class="navigation__arrow navigation__arrow_type_next"></button>',
		infinite: true,
		speed: 1000,
	});
	$('.carousel-small').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		asNavFor: '.carousel-big',
		focusOnSelect: true,
		arrows: false,
		infinite: true,
		speed: 1000,
	});

	//анимация полосы загрузки
	$('.navigation__loading').on('animationend', () => {
		$('.carousel-big').slick('slickNext');
		$('.navigation__loading').removeClass('start');		
	});

	$('.carousel-big').on('afterChange', function(event, slick, currentSlide){
		$('.navigation__loading').addClass('start');
		$('.carousel-big__image-block').removeClass('visible hidden');
		$(slick.$slides[currentSlide]).find('.carousel-big__image-block').addClass('visible');
	});

	$('.carousel-big').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		$('.navigation__loading').removeClass('start');
		let next = nextSlide + 1;
		$('.carousel-big__image-block').removeClass('hidden visible');
		$(slick.$slides[currentSlide]).find('.carousel-big__image-block').addClass('hidden');
		if(next < 10) {
			next = "0" + next;
		}
		$('#first-numbers').html(next);
	});

	$('.home-services__wrapper-carousel-big').on('mouseenter', function(){
		$('.navigation__loading').addClass('paused');
	});

	$('.home-services__wrapper-carousel-big').on('mouseleave', function(){
		$('.navigation__loading').removeClass('paused');
	});

	
	// показ секций главной страницы при скролле
	var elem = document.getElementById('home-wrapper'),
		delta,
		direction,
		header = document.querySelector('.header');

	if (document.getElementById('home-wrapper')){
		elem.addEventListener('wheel', wheel);
	}

	let isTransfer = true; //разрешить перелистывание

	//событие нажатия клавиш - стрелок вниз, вверх
	document.addEventListener('keydown', function(event) {
		if (!isTransfer) return false;

		if (event.code == 'ArrowDown') {
			transitionDown();
		} else if (event.code == 'ArrowUp') {
			transitionUp();
		}
	});

	function wheel(e){
		if (!isTransfer) return false;
		
		e = e || window.event;
		delta = e.deltaY || e.detail || e.wheelDelta;
		if (delta > 0) {
			transitionDown();			
		} else {
			transitionUp();
		}
		return false;
	}

	//переход вниз
	function transitionDown() {
		direction = 'down';
		let listDisplay = $('.content__section_type_display');
		$(listDisplay[listDisplay.length - 1]).next().addClass('content__section_type_display');

		if ($(listDisplay[listDisplay.length - 1]).next().length > 0) {

			let nextId = $(listDisplay[listDisplay.length - 1]).next().attr('id'); //id следующей секции

			//изменение цвета шапки
			$('.header').removeClass('header_color_white header_color_blue');
			switch(nextId) {
				case 'home-services':
					$('.header').addClass('header_color_white');
					break;
				case 'result':
					$('.header').addClass('header_color_blue');
					break;
			}
		}
		
		isTransfer = false;
		
		setTimeout(function() {
			isTransfer = true;
		}, 800);
	}

	//переход вверх
	function transitionUp() {
		direction = 'up';
		let listDisplay = $('.content__section_type_display');
		let current = $(listDisplay[listDisplay.length - 1]);
		if (current.attr('id') !== 'main') {

			current.removeClass('content__section_type_display');
			
			let prevId = $(listDisplay[listDisplay.length - 1]).prev().attr('id');

			$('.header').removeClass('header_color_white header_color_blue');
			switch(prevId) {
				case 'home-services':
					$('.header').addClass('header_color_white');
					break;
				case 'result':
					$('.header').addClass('header_color_blue');
					break;
			}

			isTransfer = false;
			
			setTimeout(function() {
				isTransfer = true;
			}, 800);
		}
	}


	//слайдер с логотипами партнеров на странице "Создание и продвижение сайтов"
	$('#partners-slider').slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		infinite: true,
		speed: 1000,
		swipeToSlide: true,
		autoplay: true,
		autoplaySpeed: 3000,
	});


	//закрытие списка FAQ если один открыт (страница "Создание и продвижение сайтов")
	const spoiler = $('.faq__spoiler');

	$('.faq__spoiler:eq(0)').attr('open', ''); //открытие первого спойлера при загрузке страницы

	spoiler.on('click', function(){
		spoiler.not(this).removeAttr('open');
	});


	//открытие модального окна с формой для отправки заявки

	$.fancybox.defaults.autoFocus = false;
	$.fancybox.defaults.backFocus = false;
	$.fancybox.defaults.touch.vertical = false;
	// $.fancybox.defaults.thumbs.autoStart = true;
	// $.fancybox.defaults.thumbs.axis = "x";

	$("#modal-btn").on("click", function() {
		$.fancybox.open(`
		<form class="form form_type_modal" id="modal" style="display: none;" action="">
			<div class="form__title">Получите бесплатную консультацию по телефону</div>
			<input class="form__input" type="text" name="name" placeholder="Ваше имя" required>
			<input class="form__input" type="tel" name="phone" data-phone placeholder="Ваш номер телефона" required>
			<div class="form__text-block">
				<span class="form__text">Отправляя форму, вы даете </span>
				<a class="form__link" href="#" target="_blank">согласие на обработку персональных данных </a>
				<span>и соглашаетесь с </span>
				<a class="form__link" href="#" target="_blank">политикой конфиденциальности</a>
			</div>
			<input class="button button_color_filled" id="form-button" type="submit" value="Оставить заявку">
	  	</form>
		`, {
			touch: false
		});
	});


	$('.workemail').val("").removeAttr('required');
	$(".form__input").on("change input", function(){
		$(this).removeClass('error');
	});

	$(".form").on("submit", function(e){
		e.preventDefault();
		var dataForm = $(this).serialize();
		var thisForm = $(this);
		thisForm.find("input[type='submit']").attr("disabled", "disabled").val("идет отправка...");

		$.ajax({
			type: "POST",
			url: "/form-request",
			data: dataForm,
			success: function (data) {
				var data = JSON.parse(data.trim());
				if(data.status == "success"){
					$.fancybox.open('<div class="message"><h2>Ваша заявка успешно отправлена</h2></div>');
					thisForm.find("input[name='fio']").val("");
					thisForm.find("input[name='phone']").val("");
					thisForm.find("input[name='email']").val("");
					thisForm.find("textarea").val("");
				}else{
					if( data.fio ){
						thisForm.find("input[name='fio']").addClass('error');
					}
					if( data.phone ){
						thisForm.find("input[name='phone']").addClass('error');
					}
					if( data.email ){
						thisForm.find("input[name='email']").addClass('error');
					}
				}
				thisForm.find("input[type='submit']").removeAttr('disabled').val("Отправить заявку");
			},
			error: function (data) {

			   thisForm.find("input[type='submit']").removeAttr('disabled').val("Отправить заявку");
			}
		});
	});	

    // проставление маски на поля телефона
	(function (){
		let code = '+7',
			find = /\+7/;
		code = '+7';
		find = /\+7/;

	    $("body").on("focus", "input[data-phone]", function(){
	    	$(this).value = code+" " + this.value.replace(code+' ','');
	    });
	    $("body").on("input", "input[data-phone]", function(){
	    	let val = this.value.replace(find,''),
				res = code+" ";
			val = val.replace(/[^0-9]/g,'');

			for(let i =0;i<val.length;i++){
				res+= i===0?' (':'';
				res+= i==3?') ':'';
				res+= i==6 || i==8?' ':'';
				if(i==10) break;
				res+= val[i];
			}
			this.value = res;
	    });
	    $("body").on("blur", "input[data-phone]", function(){
	    	let val = this.value.replace(find,'');
			val = val.trim();
			if(!val) this.value = null;
	    });
	})();

	//очистка инпутов при отправке формы
	$('#form-button').on('click', function() {
		$('.form__input').val('');
	});

	// Map
	if($("#map").length > 0){
		var script = document.createElement('script');
		script.src = 'https://api-maps.yandex.ru/2.1/?apikey=5cffb513-8b13-4d75-a72e-5fe3718f5386&lang=ru_RU';
		script.onload = loadMap;
		document.body.appendChild(script);
	}
	function loadMap(){
		ymaps.ready(init);   

		function init(){ 
			var myMap = new ymaps.Map("map", {
				center: [56.359619, 43.832279],
				zoom: 15,
				controls: ["zoomControl"],
			});
			myMap.behaviors.disable('scrollZoom');
			// Создание геообъекта с типом точка (метка).
			var myGeoObject = new ymaps.GeoObject({
				geometry: {
					type: "Point", // тип геометрии - точка
					coordinates: [56.359619, 43.832279] // координаты точки
				},
				properties: {
					// hintContent: "Москва",
					balloonContentHeader: "Komplex-info",
					balloonContentBody: "Россия, Нижний Новгород, Силикатная, 4",
				},
			});

			// Размещение геообъекта на карте.
			myMap.geoObjects.add(myGeoObject); 
		}	
	}

	// Анимация при скролле страниц
	
	wow = new WOW(
		{
		boxClass:     'wow',      // default
		animateClass: 'info__block-animated',
		offset:       10,          // default
		mobile:       false,
		live:         true,       // default
		scrolled: true,
		}
	);
	wow.init();
	console.log(wow);  
		
});

$(window).on('load', function(){
	//3D-слайдер
	var carousel = $("#slider").waterwheelCarousel({
		flankingItems: 1,
		speed: 1000,
		edgeFadeEnabled: true,
		keyboardNav: true,
	});

	$('#prev').bind('click', function () {
		carousel.prev();
		return false
	});

	$('#next').bind('click', function () {
		carousel.next();
		return false;
	});
});

$(window).on("resize", function(){
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', vh + 'px');
});
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', vh + 'px');


