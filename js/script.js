import canciones from "../json/content.json" assert { type: "json" };

var menuCanciones = document.getElementById("listaTracks");

canciones.audio.forEach(function(e){
    var cancion = document.createElement('div');
    var divImg = document.createElement('div');
    var image = document.createElement('img');
    var texto = document.createElement('div');

    let titulo = document.createElement('h2');
    let artista = document.createElement('h3');;

    image.src = e.img_url;
    titulo.textContent = e.title;
    artista.textContent = e.artist;

    divImg.classList.add("divImg");
    texto.classList.add("texto");
    cancion.classList.add("no-seleccionado")

    divImg.appendChild(image);
    texto.appendChild(titulo);
    texto.appendChild(artista);

    cancion.appendChild(divImg);
    cancion.appendChild(texto);
    menuCanciones.appendChild(cancion);

    cancion.addEventListener('click', mostrarEnReproductor);

});

function mostrarEnReproductor(){
    addSeleccion(this);
    let titulo = document.getElementById("titulo");
    let artista = document.getElementById("artista");
    let imgRep = document.getElementById("imgReproductor");

    var texto = Array.from(this.lastElementChild.children);
    var image = this.firstElementChild.children;
    let link = image[0].src;

    imgRep.src = link;
    titulo.textContent = texto[0].textContent;
    artista.textContent = texto[1].textContent;
    
}

function addSeleccion(elemento){
    var lista = Array.from(menuCanciones.children);
    lista.forEach(function(e){
        if(e.className == "seleccionado"){
            e.classList.remove("seleccionado");
            e.classList.add("no-seleccionado");
        }
    });
    elemento.classList.remove("no-seleccionado");
    elemento.classList.add("seleccionado");
}

var audioOn = document.getElementById("playAudio"); 
var audioOff = document.getElementById("pauseAudio"); 
var cancion = document.getElementById("cancionSeleccionada");

audioOn.addEventListener('click', playAudio);
audioOff.addEventListener('click', pauseAudio);

function playAudio() { 
  cancion.play(); 
} 

function pauseAudio() { 
  cancion.pause(); 
}