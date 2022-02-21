import canciones from "../json/content.json" assert { type: "json" };


var visualizacion = document.getElementById("modoVisualizado");
var boton = visualizacion.firstElementChild.firstElementChild;
var todoBody = document.getElementsByTagName("body");

visualizacion.addEventListener('click', function(){

    if(boton.style.left == "" || boton.style.left == "0px"){
        boton.style.left = "20px";
        todoBody[0].classList.add("oscuro");
        localStorage.setItem("modoOscuro", "dark");
    }else{
        boton.style.left = "0px";
        todoBody[0].classList.remove("oscuro");
        delete localStorage.modoOscuro;
    }
})

var audioBtn = document.getElementById("audioBtn");
var videoBtn = document.getElementById("videoBtn");

var audioBtnVid = document.getElementById("audioBtnVid");
var videoBtnVid = document.getElementById("videoBtnVid");

var menuCanciones = document.getElementById("listaTracks");
var randomBtn = document.getElementById("btnRandom");

var btnPause = document.getElementById("btnPause");
var btnPlay = document.getElementById("btnPlay");

var btnPauseVid = document.getElementById("btnPauseVideo");
var btnPlayVid = document.getElementById("btnPlayVideo");
var avanzarFlecha = document.getElementById("avanzarFlecha");
var atrasFlecha = document.getElementById("atrasFlecha");

var btnStop = document.getElementById("Layer_1");

var btnMasVolumen = document.getElementById("volumenMas");
var btnMenosVolumen = document.getElementById("volumenMenos");

var volumenMasVid = document.getElementById("volumenMasVid");
var volumenMenosVid = document.getElementById("volumenMenosVid");

volumenMasVid.addEventListener("click", subirVolumenVid);
volumenMenosVid.addEventListener("click", bajarVolumenVid);

var audioSection = document.getElementById("audioSection");
var videoSection = document.getElementById("videoSection");

btnMasVolumen.addEventListener("click", subirVolumen);
btnMenosVolumen.addEventListener("click", bajarVolumen);

videoBtn.addEventListener("click", verVideo);
audioBtnVid.addEventListener("click", verAudioVid);


function verVideo(){
    if(videoSection.style.display == "none"){
        document.getElementById("videoEntero").style.display = "flex";
        videoSection.style.display = "flex";
        audioSection.style.display = "none";
        btnPauseVid.style.display = "block";
        btnPlayVid.style.display = "none";
        document.getElementById("audioSeleccionado").pause();
        document.getElementById("videoTag").load();
        document.getElementById("videoTag").play();
    }
}

function verAudioVid(){
    if(audioSection.style.display == "none"){
        audioSection.style.display = "block";
        videoSection.style.display = "none";
        btnPause.style.display = "none";
        btnPlay.style.display = "block";
        document.getElementById("videoTag").pause();
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
    let tituloVideo = document.getElementById("tituloVideo");
    let artista = document.getElementById("artista");
    let artistaVideo = document.getElementById("artistaVideo");
    let imgRep = document.getElementById("imgReproductor");
    var img = document.getElementById("imgReproductor");
    var volumenes = document.getElementById("containerVolumen");


    img.style.visibility = "visible";

    var image = this.firstElementChild.children;

    let link = image[0].src;

    var texto = Array.from(this.lastElementChild.children);

    imgRep.src = link;
    titulo.textContent = texto[0].textContent;
    tituloVideo.textContent = texto[0].textContent;
    artista.textContent = texto[1].textContent;
    artistaVideo.textContent = texto[1].textContent;

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
    document.getElementById("videoEntero").style.display = "flex";
    var listaCanciones = new Array();
    var pista = document.getElementById("audioSeleccionado");
    var pistaVideo = document.getElementById("videoTag");
    pistaVideo.innerHTML = '';
    pista.innerHTML = '';
    var primeraPista = document.createElement("source");

    canciones.audio.forEach(function(e){
        var tituloJson = e.title;
        if(titulo.textContent == tituloJson){
            if(audioSection.style.display == "block"){
                
                primeraPista.id = "pistaAudio";
                pista.appendChild(primeraPista);
                var pistaAudio = document.getElementById("pistaAudio");
                pistaAudio.src= e.url_track;

                var videoPrimeraPista = document.createElement("source");
                videoPrimeraPista.id = "sourceVideo";
                videoPrimeraPista.type = "video/mp4";
                videoPrimeraPista.setAttribute('poster', e.img_url);
                videoPrimeraPista.src = e.url_video;
                document.getElementById("videoTag").appendChild(videoPrimeraPista);
                document.getElementById("videoTag").pause();
                
                document.getElementById("audioSeleccionado").classList.add("autoplay");
                document.getElementById("audioSeleccionado").load();
                document.getElementById("audioSeleccionado").play();
            }else{
                var videoPrimeraPista = document.createElement("source");
                videoPrimeraPista.id = "sourceVideo";
                videoPrimeraPista.type = "video/mp4";
                videoPrimeraPista.setAttribute('poster', e.img_url);
                videoPrimeraPista.src = e.url_video;
                
                primeraPista.id = "pistaAudio";
                pista.appendChild(primeraPista);
                var pistaAudio = document.getElementById("pistaAudio");
                pistaAudio.src= e.url_track;

                var subtitulo =  document.createElement('track');
                subtitulo.src = "../subtitulo/video-arctic.vtt";
                subtitulo.kind = "captions";
                subtitulo.lang = "es";
                subtitulo.label = "Español";

                btnPauseVid.style.display = "block";
                btnPlayVid.style.display = "none";

                //<track kind="subtitles" src="./subtitulo/video-arctic.vtt" lang="es" label="Español">
                
                document.getElementById("videoTag").appendChild(videoPrimeraPista);
                document.getElementById("videoTag").appendChild(subtitulo);
                document.getElementById("videoTag").load();
                document.getElementById("videoTag").play();
            }

        }else{
            listaCanciones.push(e.url_track);
        }
    });

 
    
    listaCanciones.forEach(function(e){
        var reproductor = document.createElement("source");
        reproductor.src = e;
        pista.appendChild(reproductor);
    })
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

btnPlayVid.addEventListener('click', function(){
    document.getElementById("videoTag").play();
    btnPauseVid.style.display = "block";
    btnPlayVid.style.display = "none";
});

btnPauseVid.addEventListener('click', function(){
    document.getElementById("videoTag").pause();
    btnPauseVid.style.display = "none";
    btnPlayVid.style.display = "block";
});

btnStop.addEventListener('click', function(){
    var pista = document.getElementById("audioSeleccionado");
    pista.pause();
    pista.currentTime = 0;

    if(btnPlay.style.display=="none"){
        btnPlay.style.display="block";
        btnPause.style.display="none";
    }

});

atrasFlecha.addEventListener('click', function(){
    document.getElementById("videoTag").currentTime = document.getElementById("videoTag").currentTime - 10;
});

avanzarFlecha.addEventListener('click', function(){
    document.getElementById("videoTag").currentTime = document.getElementById("videoTag").currentTime + 10;
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

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if(audioSection.style.display == "block"){
        //Flecha Izquierda en Audio
        if (e.keyCode == '37') {
            bajarVolumen()
        }
        //Flecha derecha en Audio
        else if (e.keyCode == '39') {
            subirVolumen()
        }
    }else{
        //Flecha abajo en video
        if (e.keyCode == '40') {
            bajarVolumenVid()
        }
        //Flecha arriba en video
        else if (e.keyCode == '38') {
            subirVolumenVid()
        }
        //Flecha izquierda en video
        else if (e.keyCode == '37') {
            document.getElementById("videoTag").currentTime = document.getElementById("videoTag").currentTime - 10;
        }
        //Flecha derecha en video
        else if (e.keyCode == '39') {
            document.getElementById("videoTag").currentTime = document.getElementById("videoTag").currentTime + 10;
        }
    }


}

document.addEventListener('keyleft', bajarVolumen);

function bajarVolumen(){
    var audio = document.getElementById("audioSeleccionado");
    var spanVolumen = document.getElementById("porcentajeVolumen");
    var volumenActual = audio.volume;
    if(volumenActual > 0){
        audio.volume = volumenActual - 0.10;
        audio.volume = audio.volume.toFixed(2)
        spanVolumen.innerText = audio.volume*100 + '%';
    }
}

function bajarVolumenVid(){
    var videoSeleccionado = document.getElementById("videoTag");
    var spanVolumen = document.getElementById("porcentajeVolumenVid");
    var volumenActual = videoSeleccionado.volume;
    if(volumenActual > 0){
        videoSeleccionado.volume = volumenActual - 0.10;
        videoSeleccionado.volume = videoSeleccionado.volume.toFixed(2)
        spanVolumen.innerText = videoSeleccionado.volume*100 + '%';
    }
}

function subirVolumenVid(){
    var videoSeleccionado = document.getElementById("videoTag");
    var spanVolumen = document.getElementById("porcentajeVolumenVid");
    var volumenActual = videoSeleccionado.volume;
    if(volumenActual <= 1){
        videoSeleccionado.volume = volumenActual + 0.10;
        videoSeleccionado.volume = videoSeleccionado.volume.toFixed(2)
        spanVolumen.innerText = videoSeleccionado.volume*100 + '%';
    }

}

var opcionSub = document.getElementById('subtitulos');
opcionSub.addEventListener('change', function(){
    var track = document.createElement('track');
    track.kind = "caption";
    if(this.value == "en"){
        var videoTag = document.getElementById("videoTag");
        track = videoTag.addTextTrack("captions","English","en");
        track.mode = "showing";
        track.addCue(new VTTCue(0, 7, "English subtitles"));
        track.addCue(new VTTCue(33, 36, "You got the lights on in the afternoon"));
        track.addCue(new VTTCue(38, 41, "And the nights are drawn out long"));
        track.addCue(new VTTCue(43, 47, "And you're kissin' to cut through the gloom"));
        track.addCue(new VTTCue(48, 51, "With a cough drop coloured tongues"));
        track.addCue(new VTTCue(53, 58, "And you were sittin' in the corner with the coats all piled high"));
        track.addCue(new VTTCue(57, 60, "And I thought you might be mine"));
        track.addCue(new VTTCue(63, 65, "In a small world, on an exceptionally rainy Tuesday night"));
        track.addCue(new VTTCue(66, 68, "In the right place and time"));
        track.addCue(new VTTCue(70, 72, "When the zeros line up on the 24 hour clock"));
        track.addCue(new VTTCue(73, 75, "When you know who's callin' even though the number is blocked"));
        track.addCue(new VTTCue(76, 79, "When you walked around your house wearin' my sky blue Lacoste"));
        track.addCue(new VTTCue(80, 82, "And your knee socks"));
        track.srclang = this.value;
        track.addEventListener("load", function(){
            this.mode = "showing";
        });
    }else{
        var videoTag = document.getElementById("videoTag");
        track = videoTag.addTextTrack("captions","English","en");
        track.mode = "showing";
        track.addCue(new VTTCue(0, 7, "Español subtitulos"));
        track.addCue(new VTTCue(33, 36, "Tienes las luces encendidas en la tarde"));
        track.addCue(new VTTCue(38, 41, "Y las noches son largas"));
        track.addCue(new VTTCue(43, 47, "Y estás besando para atravesar la penumbra"));
        track.addCue(new VTTCue(48, 51, "Con la lengua coloreada con pastillas para la tos"));
        track.addCue(new VTTCue(53, 58, "Y estabas sentada en el rincón con todos los abrigos amontonados"));
        track.addCue(new VTTCue(57, 60, "Y pensé que podrías ser mía"));
        track.addCue(new VTTCue(63, 65, "En un mundo pequeño en una noche de martes"));
        track.addCue(new VTTCue(66, 68, "excepcionalmente lluviosa"));
        track.addCue(new VTTCue(70, 72, "Cuando los ceros se alinean en el reloj de 24 horas"));
        track.addCue(new VTTCue(73, 75, "Cuando sabes quien llama aunque el número esté bloqueado"));
        track.addCue(new VTTCue(76, 79, "Cuando caminabas por tu casa usando mi cielo azul"));
        track.addCue(new VTTCue(80, 82, "Y tus calcetines hasta la rodilla"));
        track.srclang = this.value;
        track.addEventListener("load", function(){
            this.mode = "showing";
        });
    }
});