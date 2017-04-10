var gulp = require('gulp'),
    connect = require('gulp-connect');
const browserSync = require('browser-sync').create();


/*start server*/
gulp.task('connect', function() {
            connect.server({
                port: 3000
            });
        });

/*live reload*/
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    // browserSync.watch('./public/**')
    //     .on('change', browserSync.reload);
})



gulp.task('default', ['connect', 'serve']);








