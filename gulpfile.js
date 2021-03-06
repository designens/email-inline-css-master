'use strict';

/**
 * --------------------------------
 * Modules
 * --------------------------------
 */
var gulp       = require('gulp'),
	inlineCss  = require('gulp-inline-css'),
	cheerio    = require('gulp-cheerio'),

/**
 * Options
 * --------------------------------
 */
	path = {
		src: './html/**/*.html',
		out: 'build/'
	},

	options = {
		inlineCss: {
			// <style></style> 태그 인라인 화 할 것인지 설정
			applyStyleTags: true,
			// <link></link> 태그 인라인 화 할 것인지 설정
			applyLinkTags: true,
			// <style></style> 태그 인라인 화, 한 후 지울지 설정
			removeStyleTags: true,
			// <link></link> 태그 인라인 화, 한 후 지울지 설정
			removeLinkTags: false
		},
		remove: {
			// 지우고자 하는 요소의 선택자를 입력
			el: '*',
			// 지우고자 하는 속성을 배열 아이템으로 설정
			attrs: ['id', 'class']
		}
	};

/**
 * --------------------------------
 * Tasks
 * --------------------------------
 */
gulp.task('default', ['email', 'watch']);

gulp.task('watch', function() {
	gulp.watch(path.src, ['email']);
});

gulp.task('email', function() {
	return gulp.src(path.src)
	.pipe( inlineCss(options.inlineCss) )
	.pipe( cheerio({
		run: function ($, file) {
			$(options.remove.el).each(function() {
				var _el = $(this);
				options.remove.attrs.forEach(function(item, index) {
					_el.removeAttr(item);
				});
			})
		},
		parserOptions: {
			// UTF-8 언어 인코딩 설정 부분 (한국어,일어,중국어 등)
			decodeEntities: false
		}
	}) )
	.pipe( gulp.dest(path.out) );
});