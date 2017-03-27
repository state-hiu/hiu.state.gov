var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('default', function() {

    gulp.src('lib/app.js')
      .pipe(uglify())
      .pipe(rename({ extname: '.min.js'}))
      .pipe(gulp.dest('build/js'));

    gulp.src('lib/leaflet-markercluster/leaflet.markercluster.js')
      .pipe(uglify())
      .pipe(rename({ extname: '.min.js'}))
      .pipe(gulp.dest('build/js'));

    gulp.src('lib/leaflet-list-markers/dist/leaflet-list-markers.src.js')
      .pipe(uglify())
      .pipe(rename({ extname: '.min.js'}))
      .pipe(gulp.dest('build/js'));

});
