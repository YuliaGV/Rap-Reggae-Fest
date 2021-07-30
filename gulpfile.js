//workflow

const { series, src, dest, watch, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');

//Paths

const paths = {
    imagenes: 'src/img/**/*',
    scss: 'src/scss/**/*.scss'   
}

//función que compila sass

function css(  ) {
    return src(paths.scss)
        .pipe( sass({
            outputStyle: 'expanded',
        }) )
        .pipe( dest('./build/css') )
}

//función que compila sass minificado 

function minificarcss(  ) {
    return src(paths.scss)
        .pipe( sass({
            outputStyle: 'compressed',
        }) )
        .pipe( dest('./build/css') )
}

function imagenes(){
    return src(paths.imagenes)
        .pipe( imagemin() )
        .pipe( dest('./build/img') )
        .pipe( notify( { message: 'Imagen minificada' } ) );

}

function versionWebp(){
    return src(paths.imagenes)
        .pipe( webp() )
        .pipe( dest('./build/img') )
        .pipe( notify( { message: 'Versión webp lista' } ) );
}



//Compilar auto


function watchArchivos(){
    watch( paths.scss, css );
}

exports.css = css;
exports.minificarcss = minificarcss;
exports.imagenes = imagenes;
exports.watchArchivos = watchArchivos;
exports.default = series(css, imagenes, versionWebp, watchArchivos);