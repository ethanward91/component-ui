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
            'annotations/*.ts'
        ]
    };

    gulp.task('build', function(){
        var Builder = require('systemjs-builder');
        var builder = new Builder({
            meta: {
              format: 'register'  
            },
            map: {
                'annotations/directiveAnnotation': 'annotations/directiveAnnotation.js',
                'annotations/viewAnnotation': 'annotations/viewAnnotation.js',
                'annotations/bootstrapper': 'annotations/bootstrapper.js',
                'annotations/serviceAnnotation': 'annotations/serviceAnnotation.js',
                'component/ui': 'ui.js'
            }
        });
        builder.build('component/ui', 'componet-ui.js', {sourceMaps: true, minify:true, mangle: true});
        return gulp.src('');

    });

    gulp.task('compileTypescript', function(){
        gulp.src(sources.ts)
            .pipe(tsc({
                target: 'ES5',
                module: 'system',
                declarations: true,
                sourceMap: true
            }))
            .pipe(gulp.dest('annotations'));
            
        gulp.src(['ui.ts', 'router.ts'])
              .pipe(tsc({
                target: 'ES5',
                module: 'system',
                sourceMap: true
            }))
            .pipe(gulp.dest(''));
    });
})();
