'use strict';
// СТРУКТУРА НОВЫХ ПРОЕКТОВ:
// ИСХОДНИКИ НАХОДЯТСЯ В ПАПКЕ: "src/" :
/*	- "src/html/" - папка html шаблонов блоков и страниц
	- "src/pug/" - папка pug файлов блоков и страниц
	- "src/sass/" - папка sass файлов
	- "src/fonts/" - папка fonts файлов проекта
	- "src/img/" - папка неоптимизированных изображений
	- "src/css/" - папка с несжатыми стилями
	- "src/js/" - папка скриптов
	- "src/lib/" - папка js библиотек и плагинов
*/ 
// ФАЙЛЫ ДЛЯ ПРОДАКШЕНА, В ПАПКЕ: "build/"
/*	- "build/" - корень сайта с html и папками
	- "build/fonts/" - папка шрифтов файлов проекта
	- "build/css/" - папка с минифицированными стилями
	- "build/js/" - папка минифицированных скриптов
	- "build/img/" - папка оптимизированных изображений
*/

// СПИСОК ПОДКЛЮЧЕНИЙ
var gulp = require('gulp'),
	pug = require('gulp-pug'),
	sass = require('gulp-sass'),
	csso = require('gulp-csso'),
	sourcemaps = require('gulp-sourcemaps'),
	concat = require('gulp-concat'),
	plumber = require('gulp-plumber'),
	terser = require('gulp-terser'),
	clean = require('gulp-clean'),
	size = require('gulp-size'),
	rename = require("gulp-rename"),
	autoprefixer = require('gulp-autoprefixer'),
	watch = require('gulp-watch'),
	imagemin = require('gulp-imagemin'),
	imageminPngquant = require('imagemin-pngquant'),
	imageminJpegoptim = require('imagemin-jpegoptim'),
	browserSync = require('browser-sync'),
	cache = require('gulp-cache');

// ПУТИ РАБОТЫ С ФАЙЛАМИ
var path = {
    src : {
        html : "src/html/**/*.html",
        pug: "src/pug/*.pug",
        sass : "src/sass/**/main.scss",
        fonts : "src/fonts/**/*.*",
        images : "src/images/**/*.*",
        scripts : "src/scripts/**/*.js",
    },
    build : {
        html : "build/",
        // html_modx : "C:/Users/pichuzhkina_en/Desktop/OpenServer/domains/komplex-info-2020.local/assets/template/",
        pug: "build/",
        pug_src: "src/html/",
        styles : "build/styles/",
        // styles_modx : "C:/Users/pichuzhkina_en/Desktop/OpenServer/domains/komplex-info-2020.local/assets/template/styles/",
        scripts : "build/scripts/",
        // scripts_modx : "C:/Users/pichuzhkina_en/Desktop/OpenServer/domains/komplex-info-2020.local/assets/template/scripts/",
        fonts : "build/fonts/",
        // fonts_modx : "C:/Users/pichuzhkina_en/Desktop/OpenServer/domains/komplex-info-2020.local/assets/template/fonts/",
        images : "build/images/",
        // images_modx : "C:/Users/pichuzhkina_en/Desktop/OpenServer/domains/komplex-info-2020.local/assets/template/images/",
    },
    watch : {
        html : "src/html/**/*.html",
        pug:  "src/pug/**/*.pug",
        sass : "src/sass/**/*.scss",
        fonts : "src/fonts/**/*.*",
        images : "src/images/**/*.*",
        scripts : "src/scripts/**/*.js",
        lib: "src/lib/libs/**/*.*"
    },
    clean : "./build"
};

// ОТСЛЕЖИВАНИЕ ИЗМЕНЕНИЯ ФАЙЛОВ ИСХОДНИКОВ ДЛЯ ЗАПУСКА ОПРЕДЕЛЕННЫХ КОМАНД ДЛЯ 
// СБОРКИ ФАЙЛОВ И ОТПРАВЛЕНИЯ В ПАПКУ /build/ ДЛЯ ИХ ОТПРАВКИ НА СЕРВЕР
gulp.task('watch',['browser-sync', 'pug', 'libscss', 'libsjs', 'styles', 'fonts', 'images', 'scripts'], function(){
	// Следим за файлами в src, чтобы запустить нужные таски сборок
    watch([path.watch.pug], function(event) {
    	console.log( event.path );
        gulp.start('pug');
    });
    watch([path.watch.sass], function(event) {
    	console.log( event.path );
        gulp.start('styles');
    });
    watch([path.watch.fonts], function(event) {
    	console.log( event.path );
        gulp.start('fonts');
    });
    watch([path.watch.images], function(event) {
    	console.log( event.path );
        gulp.start('images');
        browserSync.reload();
    });
    watch([path.watch.scripts], function(event) {
    	console.log( event.path );
        gulp.start('scripts');
	});
	watch([path.watch.lib], function(event) {
    	console.log( event.path );
        gulp.start('libsjs');
    });
	

    // Следим за файлами в build, чтобы обновить браузер
    watch([path.build.html+"**/*.html"], function(event) {
    	console.log( event.path );
        browserSync.reload();
    });
    watch([path.build.styles+"**/*.css"], function(event) {
    	console.log( event.path );
        browserSync.reload();
    });
    watch([path.build.fonts+"**/*.*"], function(event) {
    	console.log( event.path );
        browserSync.reload();
    });
    watch([path.build.scripts+"**/*.js"], function(event) {
    	console.log( event.path );
        browserSync.reload();
    });
});


gulp.task('pug', function(){
	return gulp.src([path.src.pug, "!src/pug/layout.pug", "!src/pug/variables.pug"])
		.pipe(plumber())
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest(path.build.pug_src))
		.pipe(gulp.dest(path.build.pug))
		// .pipe(gulp.dest(path.build.html_modx))
		;
});

/*
 * обработка sass и сборка в css 
*/ 
gulp.task('styles', function(){
	return gulp.src(['src/lib/libs.css', path.src.sass])
		.pipe(sourcemaps.init())
		.pipe(plumber())
		.pipe(sass({outputStyle: 'expanded'}))
		.pipe(autoprefixer({
		   	overrideBrowserslist: ['last 3 versions', 'ie >= 11'],
		    cascade: false
			})
		)
		.pipe(concat('main.css'))
		.pipe(gulp.dest(path.build.styles))
		// .pipe(gulp.dest(path.build.styles_modx))
		.pipe(size({
			showFiles: true
		}))
		.pipe(csso({restructure: true,}))
		.pipe(rename({suffix: ".min"}))
		.pipe(size({
			showFiles: true
		}))
		.pipe(sourcemaps.write(""))
		.pipe(gulp.dest(path.build.styles))
		// .pipe(gulp.dest(path.build.styles_modx))
		;
});
gulp.task('styles-min', function(){
	return gulp.src(['src/lib/libs.css', path.src.sass])
		.pipe(plumber())
		.pipe(sass({outputStyle: 'expanded'}))
		.pipe(autoprefixer({
		   	overrideBrowserslist: ['last 3 versions', 'ie >= 11'],
		    cascade: false
			})
		)
		.pipe(concat('main.css'))
		.pipe(gulp.dest(path.build.styles))
		// .pipe(gulp.dest(path.build.styles_modx))
		.pipe(size({
			showFiles: true
		}))
		.pipe(csso({restructure: true,}))
		.pipe(rename({suffix: ".min"}))
		.pipe(size({
			showFiles: true
		}))
		.pipe(gulp.dest(path.build.styles))
		// .pipe(gulp.dest(path.build.styles_modx))
		;
});

/*
 * сборка всех шрифтов и отправка в папку /build/
*/ 
gulp.task('fonts', function(){
	return gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.build.fonts))
		// .pipe(gulp.dest(path.build.fonts_modx))
		;
});

/*
 * обработка изображений, оптимизация и отправка в папку /build/
*/ 
gulp.task('images', function(){
	return gulp.src(path.src.images)
		.pipe(plumber())
		.pipe(cache(imagemin([
				    imagemin.gifsicle({interlaced: true}),
				    imageminJpegoptim({
				    	progressive: true,
				    	stripAll: true,
				    	// max: 70 //google pagesspeed
				    	max: 85
				    }),
				    imageminPngquant(),
				    imagemin.svgo({
				        plugins: [
				            {removeViewBox: true},
				            {cleanupIDs: false}
				        ]
				    })
				], {
					verbose: true
				})))
		.pipe(gulp.dest(path.build.images))
		// .pipe(gulp.dest(path.build.images_modx))
		;
});
gulp.task('clear-cache', function (done) {
  return cache.clearAll(done);
});

/*
 * сборка всех скриптов и отправка в папку /build/
*/ 
gulp.task('scripts', function(){
	return gulp.src(['src/lib/libs.js', path.src.scripts])
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(concat('main.js'))
		.pipe(gulp.dest(path.build.scripts))
		// .pipe(gulp.dest(path.build.scripts_modx))
		.pipe(size({
			showFiles: true
		}))
		.pipe(terser())
		.pipe(rename({suffix: ".min"}))
		.pipe(size({
			showFiles: true
		}))
		.pipe(sourcemaps.write(""))
		.pipe(gulp.dest(path.build.scripts))
		// .pipe(gulp.dest(path.build.scripts_modx))
		;
});
gulp.task('scripts-min', function(){
	return gulp.src(['src/lib/libs.js', path.src.scripts])
		.pipe(plumber())
		.pipe(concat('main.js'))
		.pipe(gulp.dest(path.build.scripts))
		// .pipe(gulp.dest(path.build.scripts_modx))
		.pipe(size({
			showFiles: true
		}))
		.pipe(terser())
		.pipe(rename({suffix: ".min"}))
		.pipe(size({
			showFiles: true
		}))
		.pipe(gulp.dest(path.build.scripts))
		// .pipe(gulp.dest(path.build.scripts_modx))
		;
});
gulp.task('libscss', function(){
	return gulp.src(['src/lib/libs/fancybox/jquery.fancybox.css', 'src/lib/libs/slick-slider/slick.css', 'src/lib/libs/anamate-css/animate.min.css'])
		.pipe(plumber())
		.pipe(concat('libs.css'))
		.pipe(gulp.dest('src/lib/'))
		.pipe(size({
			showFiles: true
		}))
		.pipe(gulp.dest('src/lib/'));
});
gulp.task('libsjs', function(){
	return gulp.src(['src/lib/libs/jquery/jquery-3.5.1.min.js', 'src/lib/libs/fancybox/jquery.fancybox.min.js', 'src/lib/libs/slick-slider/slick.min.js', 'src/lib/libs/jQuery-Waterwheel-Carousel/js/jquery.waterwheelCarousel.js', 'src/lib/libs/wow/wow.min.js'])
		.pipe(plumber())
		.pipe(concat('libs.js'))
		.pipe(gulp.dest('src/lib/'))
		.pipe(size({
			showFiles: true
		}))
		.pipe(gulp.dest('src/lib/'));
});
/*
 * Browser Sync 
*/ 
gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browser Sync
    	server: { // Определяем параметры сервера
            baseDir: 'build' // Директория для сервера - app
        },
        notify: true, // Включаем уведомления
        // proxy: "http://komplex-info-2020.local", // проксирование вашего удаленного сервера, не важно на чем back-end 
        open: 'external',
        /*proxy: "", // проксирование вашего удаленного сервера, не важно на чем back-end 
        logPrefix: '', // префикс для лога bs, маловажная настройка 
        host:      '', // можно использовать ip сервера
        port:      3000, // порт через который будет проксироваться сервер
        open: 'external', // указываем, что наш url внешний 
        notify:    true,
        ghost:     true,
        files:     ['build'],*/
    });
});

/*
 * clean 
*/
gulp.task('clear-build', function () {
	return gulp.src('./build', {read: false})
		.pipe(clean());
});

/*
 * Сборка проекта для отправки на продакшен
 * Удаляем папку, собираем, файлы без soursemap
*/ 
gulp.task('build', ['clear-build'], function () {
	gulp.start('pug');
	gulp.start('images');
	gulp.start('libscss');
	gulp.start('libsjs');
	gulp.start('styles-min');
	gulp.start('fonts');
	gulp.start('scripts-min');
	return true;
});