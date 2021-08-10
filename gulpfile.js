//workflow

const { series, src, dest, watch, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');


//Utilidades CSS

const autoprefixer = require('autoprefixer');
const postcss = require( 'gulp-postcss' );


//Paths

const paths = {
    imagenes: 'src/img/**/*',
    scss: 'src/scss/**/*.scss', 
    js: 'src/js/**/*.js'  
}


//función que compila sass minificado 

function minificarcss(  ) {
    return src(paths.scss)
        .pipe( sass({
            outputStyle: 'compressed',
        }) )
        .pipe( dest('./build/css') )
}

function javascript(){
    return src(paths.js)
        .pipe( concat('bundle.js') )
        .pipe( dest('./build/js') );


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
    watch( paths.scss, minificarcss );
    watch( paths.js, javascript );
}

exports.minificarcss = minificarcss;
exports.imagenes = imagenes;
exports.watchArchivos = watchArchivos;
exports.default = series(minificarcss, javascript, imagenes, versionWebp, watchArchivos);