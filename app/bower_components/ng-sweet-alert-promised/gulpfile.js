var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	clean = require('gulp-clean'),
	app = 'ng-sweet-alert',
	paths = {
		app: app + '.js',
		build: 'dist/',
	};

gulp.task('clean', function cleanTask() {
	return gulp.src(paths.build + 'scripts.js', {
			read: false,
		})
		.pipe(clean());
});
gulp.task('build', ['clean', ], function buildTask() {
	return gulp.src(paths.app)
		.pipe(concat(app + '.min.js'))
		.pipe(gulp.dest(paths.build))
		.pipe(uglify())
		.pipe(gulp.dest(paths.build));
});

gulp.task('default', ['build', ]);
