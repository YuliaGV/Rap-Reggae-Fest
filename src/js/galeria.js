document.addEventListener('DOMContentLoaded', function() {
    crearGaleria();
});

function crearGaleria(){

    const galeria = document.querySelector('.galeria-imagenes');

    for(let i = 1; i <=12; i++){

        const imagen = document.createElement('img');
        imagen.src = `build/img/thumb/${i}.webp`;
        imagen.dataset.imagenId = i;


        //Crear función de mostrarImagen
        imagen.onclick = mostrarImagen;;


        const lista = document.createElement('li');
        lista.appendChild(imagen);

        galeria.appendChild(lista);
    
    }

function mostrarImagen(e){

    const id = parseInt(e.target.dataset.imagenId);

    //Generar la imagen
    const imagenGrande = document.createElement('img');
    imagenGrande.src = `build/img/grande/${id}.webp`;

    const overlay = document.createElement('div');
    overlay.appendChild(imagenGrande);
    overlay.classList.add('overlay');

    //Mostrar la imagen en HTML

    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');
    

     //Cuando se da click en cualquier lado cerrar la imagen
    overlay.onclick = function(){
        overlay.remove();
        body.classList.remove('fijar-body');
    }

    //Botón para cerrar la imagen
    const cerrarImagen = document.createElement('p');
    cerrarImagen.textContent = 'X';
    cerrarImagen.classList.add('btn-cerrar');
    overlay.appendChild(cerrarImagen);

    //Cuando se presiona, se cierra la imagen
    cerrarImagen.onclick = function(){
        overlay.remove();
        body.classList.remove('fijar-body');
    }
}


}