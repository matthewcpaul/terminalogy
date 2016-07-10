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

// Styles, build incrementally with local config, serve and watch for changes
gulp.task('styles', function() {
  return gulp.src('./_assets/styles/style.scss')
  .pipe(sass())
  .pipe(nano({discardComments: {removeAll: true}}))
  .pipe(gulp.dest('./_site/assets/css'));
});

gulp.task('jekyll-build', shell.task(['bundle exec jekyll build --config _config.yml,local_config.yml --incremental --watch']));

gulp.task('jekyll-serve', function() {
  browserSync.init({ server: { baseDir: '_site/' } });
  gulp.watch('./_assets/styles/**/*.scss', ['styles']);
  gulp.watch('**/*.md', ['jekyll-build'],  browserSync.reload);
  gulp.watch('_site/**/*.*').on('change', browserSync.reload);
});

gulp.task('default', ['styles', 'jekyll-build', 'jekyll-serve']);

// Build with Jekyll config and then deploy to gh-pages
gulp.task('jekyll-build-gh-pages', shell.task(['bundle exec jekyll build']));

gulp.task('deploy-gh-pages', ['jekyll-build-gh-pages'], function () {
  return gulp.src("./_site/**/*")
    .pipe(deploy())
});

gulp.task('deploy', ['deploy-gh-pages']);
