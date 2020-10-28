const gulp =  require('gulp')
      sass = require('gulp-sass')
      postcss = require('gulp-postcss')
      autoprefixer = require('autoprefixer')
      cleanCSS = require('gulp-clean-css'),

      browserSync = require('browser-sync')
      plumber = require('gulp-plumber')
      notify = require("gulp-notify")
      cache = require('gulp-cached')
      rename = require("gulp-rename")
      changed = require('gulp-changed')
      watch = require("gulp-watch");


const src = {
  'styles': ['./src/style.+(sass|scss)'],
}

const dest = {
  'root': './dist/'
}

gulp.task('styles', () =>  {
  return gulp.src(src.styles)
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))

    .pipe(gulp.dest(dest.root))

    .pipe(sass({outputStyle: 'expanded'}))

    .pipe(postcss([
      autoprefixer({
        grid: true,
        cascade: false
      })
    ]))

    .pipe(gulp.dest(dest.root))

    .pipe(cleanCSS())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(dest.root))
    .pipe(browserSync.reload({stream: true}))
})

// gulp実行時に発火させるタスクと、ファイルの監視の設定
gulp.task('default', gulp.parallel(gulp.series('styles'), () => {
  watch(['./src/**/*.+(scss|sass)'], gulp.task('styles'));
}));