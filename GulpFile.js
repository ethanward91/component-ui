/**
 * Created by WardE on 7/16/2015.
 */
(function () {
    var gulp = require('gulp'),
        concat = require('gulp-concat'),
        uglify = require('gulp-uglify'),
        tsc = require('gulp-tsc');




    var sources = {
        ts: [
            'annotations/*.ts',
            'component/*.ts'
        ]
    };

    gulp.task('build', function(){
        var Builder = require('systemjs-builder');
        var builder = new Builder({
            map: {
                'annotations/directiveAnnotation': 'annotations/directiveAnnotation.js',
                'annotations/viewAnnotation': 'annotations/viewAnnotation.js',
                'annotations/bootstrapper': 'annotations/bootstrapper.js',
                'annotations/serviceAnnotation': 'annotations/serviceAnnotation.js'
            }
        });
        builder.build('component/ui.js', 'component-ui.js', {sourceMaps: true});
        builder.build('component/router.js', 'component-router.js', {sourceMaps: true});
        return gulp.src('');

    });

    gulp.task('compileTypescript', function(){
        return gulp.src(sources.ts)
            .pipe(tsc({
                target: 'ES5'
            }));
    })

})();
