var gulp         = require('gulp');
var sass         = require('gulp-sass');
var scsslint     = require('gulp-scss-lint')
var postcss      = require('gulp-postcss');
var cssnext      = require('postcss-cssnext');
var nano         = require('gulp-cssnano');
var shell        = require('gulp-shell');
var autoprefixer = require('gulp-autoprefixer');
var atImport     = require('postcss-import');
var cp           = require('child_process');
var browserSync  = require('browser-sync').create();
var deploy       = require('gulp-gh-pages');

var processors = [
  atImport,
  cssnext({
    'browsers': ['last 2 version'],
    'features': {
      'customProperties': {
        preserve: true,
        appendVariables: true
      },
      'colorFunction': true,
      'customSelectors': true,
      'sourcemap': true,
      'rem': false
    }
  })
];

gulp.task('styles', function() {
  return gulp.src('./_assets/styles/style.scss')
  .pipe(sass())
  .pipe(nano({discardComments: {removeAll: true}}))
  .pipe(gulp.dest('./_site/assets/css'));
});

gulp.task('jekyll-build', shell.task(['bundle exec jekyll build --incremental --watch']));

gulp.task('jekyll-serve', function() {
  browserSync.init({ server: { baseDir: '_site/' } });
  gulp.watch('./_assets/styles/**/*.scss', ['styles']);
  gulp.watch('_site/**/*.*').on('change', browserSync.reload);
});

gulp.task('default', ['styles', 'jekyll-build', 'jekyll-serve']);

// Push build to gh-pages
gulp.task('deploy', function () {
  return gulp.src("./_site/**/*")
    .pipe(deploy())
});
