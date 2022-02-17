import canciones from "../json/content.json" assert { type: "json" };


var audioBtn = document.getElementById("audioBtn");
var videoBtn = document.getElementById("videoBtn");

var menuCanciones = document.getElementById("listaTracks");
var randomBtn = document.getElementById("btnRandom");
var btnPause = document.getElementById("btnPause");
var btnPlay = document.getElementById("btnPlay");
var btnStop = document.getElementById("Layer_1");

var btnMasVolumen = document.getElementById("volumenMas");
var btnMenosVolumen = document.getElementById("volumenMenos");

var audioSection = document.getElementById("audioSection");
var videoSection = document.getElementById("videoSection");

btnMasVolumen.addEventListener("click", subirVolumen);
btnMenosVolumen.addEventListener("click", bajarVolumen);

audioBtn.addEventListener("click", verAudio);
videoBtn.addEventListener("click", verVideo);

function verAudio(){
    if(audioSection.style.display == "none"){
        audioSection.style.display = "block";
        videoSection.style.display = "none";
    }
}

function verVideo(){
    if(videoSection.style.display == "none"){
        videoSection.style.display = "block";
        audioSection.style.display = "none";
    }
}

randomBtn.addEventListener("click", function(){
    if(randomBtn.classList == "noActivado"){
        randomBtn.classList.remove("noActivado");
        randomBtn.classList.add("activado");
        randomizar();
    }else{
        randomBtn.classList.remove("activado");
        randomBtn.classList.add("noActivado");
        ordenar();
    }

})


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
    cancion.classList.add("no-seleccionado");
    
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
    var img = document.getElementById("imgReproductor");
    var volumenes = document.getElementById("containerVolumen");


    img.style.visibility = "visible";

    var image = this.firstElementChild.children;
    console.log(image);
    let link = image[0].src;
    console.log(link);
    var texto = Array.from(this.lastElementChild.children);
    console.log(texto);

    imgRep.src = link;
    titulo.textContent = texto[0].textContent;
    artista.textContent = texto[1].textContent;

    btnPause.style.display = "block";
    btnPlay.style.display = "none";

    volumenes.style.display = "flex";

    cancionON();
    
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


function cancionON(){
    var listaCanciones = new Array();
    var pista = document.getElementById("audioSeleccionado");
    pista.innerHTML = '';

    var primeraPista = document.createElement("source");
    primeraPista.id = "pistaAudio";
    pista.appendChild(primeraPista);

    canciones.audio.forEach(function(e){
        var tituloJson = e.title;
        if(titulo.textContent == tituloJson){
            var pistaAudio = document.getElementById("pistaAudio");
            pistaAudio.src= e.url_track;
        }else{
            listaCanciones.push(e.url_track);
        }
    });

 
    listaCanciones.forEach(function(e){

        var reproductor = document.createElement("source");
        reproductor.src = e;
        pista.appendChild(reproductor);

    })

    document.getElementById("audioSeleccionado").load();
    document.getElementById("audioSeleccionado").play();
}




btnPause.addEventListener('click', function(){
    document.getElementById("audioSeleccionado").pause();
    btnPause.style.display = "none";
    btnPlay.style.display = "block";
});


btnPlay.addEventListener('click', function(){
    document.getElementById("audioSeleccionado").play();
    btnPause.style.display = "block";
    btnPlay.style.display = "none";
});

//audio.currentTime = 0

btnStop.addEventListener('click', function(){
    var pista = document.getElementById("audioSeleccionado");
    pista.pause();
    pista.currentTime = 0;

    if(btnPlay.style.display=="none"){
        btnPlay.style.display="block";
        btnPause.style.display="none";
    }

});



function subirVolumen(){
    var audio = document.getElementById("audioSeleccionado");
    var spanVolumen = document.getElementById("porcentajeVolumen");
    var volumenActual = audio.volume;
    if(volumenActual <= 1){
        audio.volume = volumenActual + 0.10;
        audio.volume = audio.volume.toFixed(2)
        spanVolumen.innerText = audio.volume*100 + '%';
    }

}

function bajarVolumen(){
    var audio = document.getElementById("audioSeleccionado");
    var spanVolumen = document.getElementById("porcentajeVolumen");
    var volumenActual = audio.volume;
    if(volumenActual > 0){
        audio.volume = volumenActual - 0.10;
        audio.volume = audio.volume.toFixed(2)
        spanVolumen.innerText = audio.volume*100 + '%';
        console.log(audio.volume);
    }
}