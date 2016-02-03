var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var csscomb = require('gulp-csscomb');

/**
 * 処理前のソースへのパス。
 */
var source = {
  'sass': 'scss/**/*.scss'
}

/**
 * 処理後に出力するパス。
 */
var build = {
  'css': 'css/'
}

/**
 * `.scss`を`.css`にコンパイルします。
 * ベンダープレフィックスを付与後、csscombで整形されます。
 * sourcemapsは`.css`と同じディレクトリに出力されます。
 */
gulp.task('sass', function(){
  return gulp.src(source.sass)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 4 versions'],
    }))
    .pipe(csscomb())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(build.css));
});

/**
 * watchタスクを指定します。
 */
gulp.task('watch', function() {
  gulp.watch(source.sass, ['sass']);
});

/**
 * cssディレクトリを削除後に`sass`タスクを実行、`watch`タスクを実行します。
 */
gulp.task('default', ['sass', 'watch']);