/**
 * Created by WardE on 7/16/2015.
 */
(function () {
    var gulp = require('gulp'),
        concat = require('gulp-concat'),
        uglify = require('gulp-uglify'),
        tsc = require('gulp-tsc');
        
    gulp.task('build', ['bundle'])    
    gulp.task('bundle', ['compileTypescript'], function(){
        var Builder = require('systemjs-builder');
        var builder = new Builder({
            meta: {
                'component/ui': {
                    format: 'amd'
                },
                'component/router': {
                    format: 'amd'
                }

            },
            map: {
                'component/ui': 'src/ui.js',
                'component/router': 'src/router.js'
            }
        });
        builder.build('component/ui', 'bundle/component.ui.js', {sourceMaps: true});
        builder.build('component/router', 'bundle/component.router.js', {sourceMaps: true});
        return gulp.src('');
    });
    
    gulp.task('compileTypescript', function(){
        return gulp.src(['ui.ts', 'router.ts'])
              .pipe(tsc({
                target: 'ES5',
                module: 'amd',
                sourceMap: true
            }))
            .pipe(gulp.dest('src/'));
    });
})();
