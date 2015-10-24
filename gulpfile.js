var gulp = require('gulp');
var pkg = require('./package.json');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var del = require('del');
var path = require('path');
var spawn = require('child_process').spawn;

var compilelist =
[
    {
        "name": "main_js",
        "type": "js",
        "src": "./src/js/main/*.js",
        "outfile":"main.js",
        "dest":"./build/js/"
    },
    {
        "name": "main_less",
        "type": "less",
        "src": "./src/less/main/*.less",
        "outfile":"main.css",
        "dest":"./build/css/"
    },
    {
        "name": "polyfill_js",
        "type": "js",
        "src": "./src/js/polyfill/*.js",
        "outfile":"polyfill.js",
        "dest":"./build/js/"
    }
];

var copylist =
[
];

gulp.task('compile', function(){
    for(var i = 0; i < compilelist.length; i++)
    {
        var t = compilelist[i];
        process.stdout.write(t.name);
        process.stdout.write("\n");
        if(t.type=="js")
        {
            gulp.src(t.src)
                .pipe(concat(t.outfile))
                .pipe(gulp.dest(t.dest))
                .pipe(uglify())
                .pipe(rename({ extname: '.min.js'}))
                .pipe(gulp.dest(t.dest));
        }
        else if(t.type=="css")
        {
            gulp.src(t.src)
                .pipe(concat(t.outfile))
                .pipe(gulp.dest(t.dest));
        }
        else if(t.type=="less")
        {
            gulp.src(t.src)
                .pipe(less())
                .pipe(concat(t.outfile))
                .pipe(gulp.dest(t.dest));
        }
    }
});

gulp.task('copy', function(){
    for(var i = 0; i < copylist.length; i++)
    {
        var t = copylist[i];
        gulp.src(t.src).pipe(gulp.dest(t.dest));
    }
});

gulp.task('clean', function () {
  return del([
    './temp/**/*',
    './build/js/**/*',
    './build/css/**/*'
  ]);
});

gulp.task('test', function(){
    var scripts =
    [
        "./src/js/main/*.js",
        "./src/js/polyfill/*.js"
    ];
    for(var i = 0; i < scripts.length; i++)
    {
        gulp.src(scripts[i])
            .pipe(jshint()).
            pipe(jshint.reporter('default'));
    }
});

gulp.task('default', ['clean', 'copy','compile']);


gulp.task('bootstrap:clean', function() {
    return del([
        './temp/**/*',
        './build/bootstrap/**/*'
    ]);
});
gulp.task('bootstrap:prepareLess', ['bootstrap:clean'], function() {
    var base = "./lib/bootstrap/3.3.5/less/";
    return gulp.src([base+'/**', '!'+base+'/{variables.less}'])
        .pipe(gulp.dest('./temp'));
});
gulp.task('bootstrap:prepareVariables', ['bootstrap:prepareLess'], function() {
    return gulp.src('./src/less/bootstrap/variables.less')
        .pipe(gulp.dest('./temp'));
});
gulp.task('bootstrap:compile', ['bootstrap:prepareVariables'], function() {
    return gulp.src('./temp/bootstrap.less')
        .pipe(less())
        .pipe(gulp.dest('./build/bootstrap'));
});
