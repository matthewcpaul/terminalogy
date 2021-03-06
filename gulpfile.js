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

var ignore = ['!_site', '!node_modules', '!.bundle', '!.publish']
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

// Compile SCSS into CSS & auto-inject into browsers
gulp.task('styles', function() {
  return gulp.src('./_assets/styles/style.scss')
  .pipe(sass())
  .pipe(nano({discardComments: {removeAll: true}}))
  .pipe(gulp.dest('./_site/assets/css'))
  .pipe(browserSync.stream());
});

// Build incrementally with jekyl config + local config
gulp.task('local-build', shell.task(['bundle exec jekyll build --config _config.yml,local_config.yml']));

// Static Server + watching scss/html files
gulp.task('serve', ['styles', 'local-build'], function() {

    browserSync.init({
        server: { baseDir: '_site/' }
    });

    gulp.watch('_assets/styles/**/*.scss', ['styles']);
    gulp.watch(['**/*.md'].concat(ignore), ['local-build']);
    gulp.watch(['**/*.html'].concat(ignore), ['local-build']);
    gulp.watch('_site/**/*.*').on('change', browserSync.reload);
});

// Gulp: Run styles, local-build, and serve
gulp.task('default', ['serve']);

// Build once with only jekyll config
gulp.task('jekyll-build', shell.task(['bundle exec jekyll build']));

// Deploy _site to gh-pages
gulp.task('deploy-gh-pages', ['jekyll-build'], function () {
  return gulp.src('./_site/**/*')
    .pipe(deploy())
});

// Gulp Deploy: Run jekyll-build, and deploy-gh-pages
gulp.task('deploy', ['deploy-gh-pages']);
