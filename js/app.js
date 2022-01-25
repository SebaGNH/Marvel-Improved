"use strict"
const limite = 50;
let offSet = 0;  /*  <-- Total de 1559 */
let listaSuperHeroes = "";
let ultimoHeroe;

const btnInicio = document.getElementById("btnInicio");
const txtBuscador = document.getElementById("txtBuscador")
txtBuscador.value = "";







const cargarProyecto = async () => {
    try {
        let apikey = `https://gateway.marvel.com/v1/public/characters?limit=${limite}&offset=${offSet}&orderBy=modified&ts=1&apikey=eaa98daf4d86236acb4de698f6808297&hash=c0819d4ad93eb938110b0d68f54532f0`;
        const respuesta = await fetch(apikey);
        //console.log(respuesta);
        const datos = await respuesta.json();
        //console.log(datos);
        
        const resultados = datos.data.results;
        //console.log(resultados); /*  <-- Muestra arreglo con super Heroes */
        //console.log(resultados[1]); /*  <-- Muestra sol primer resultado */
        txtBuscador.value = "";
        resultados.forEach(marvelHeroes => {
            const filtroImagenNoEncontrada = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";
            const filtroImagenNoEncontrada2 = "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708";

            if (marvelHeroes.thumbnail.path != filtroImagenNoEncontrada && marvelHeroes.thumbnail.path != filtroImagenNoEncontrada2) {
                
                //console.log(marvelHeroes);
                const imagen = marvelHeroes.thumbnail.path +"."+marvelHeroes.thumbnail.extension;
                
                listaSuperHeroes += `
                <div class="superHeroes" id="superHeroes">
                    <img class="thumbnail" src="${imagen}" alt="">
                    <h2 class="nombreHeroe" id="nombreHeroe">${marvelHeroes.name}</h2>
                </div>
                `;
            }
        });




        document.getElementById("contenedor").innerHTML = listaSuperHeroes;


        const heroesEnPantalla = document.querySelectorAll('.contenedor .superHeroes');
        //console.log(heroesEnPantalla);

        if (offSet < 1500) {
            if (ultimoHeroe) {
                observador.unobserve(ultimoHeroe);
            }
            ultimoHeroe = heroesEnPantalla[heroesEnPantalla.length -12] /*  <-- Pongo 12 ya que la api es un poco lenta */
            observador.observe(ultimoHeroe);
        }

    } catch (error) {
        console.log(error);
    }
}


let observador = new IntersectionObserver((entradas, observador)=>{
    entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
            offSet = offSet + 50;
            cargarProyecto();
            console.log(offSet);
        }
    })
},{
    rootMargin: "0px 0px 0px 0px",
    threshold: 0.5 // Para que cargue cuando la img esté a la mitad
});



/* Inicio <-- Buscador ------------------------------------*/   /*  <-- nameStartsWith=man& */
const buscador = async(valorBuscador)=>{
    
    //const limite = 50;
    try {
        const apikeyBuscador = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${valorBuscador}&limit=${limite}&offset=${offSet}&orderBy=modified&ts=1&apikey=eaa98daf4d86236acb4de698f6808297&hash=c0819d4ad93eb938110b0d68f54532f0`;
        const respuesta = await fetch(apikeyBuscador);

        //console.log(respuesta);
        const datos = await respuesta.json();
        console.log(datos);
        const resultados = datos.data.results;
            
        offSet = 0;
        listaSuperHeroes ="";
        resultados.forEach(marvelHeroes => {
            const filtroImagenNoEncontrada = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";
            const filtroImagenNoEncontrada2 = "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708";
            
            if (marvelHeroes.thumbnail.path != filtroImagenNoEncontrada && marvelHeroes.thumbnail.path != filtroImagenNoEncontrada2) {
                
                //console.log(marvelHeroes);
                const imagen = marvelHeroes.thumbnail.path +"."+marvelHeroes.thumbnail.extension;
                
                listaSuperHeroes += `
                <div class="superHeroes" id="superHeroes">
                    <img class="thumbnail" src="${imagen}" alt="">
                    <h2 class="nombreHeroe" id="nombreHeroe">${marvelHeroes.name}</h2>
                </div>
                `;
            }
        });
        document.getElementById("contenedor").innerHTML = listaSuperHeroes;

    } catch (error) {
        console.log(error);
    }
}

//document.getElementById("txtBuscador").addEventListener("keydown",buscador())
/*-- Fin  <-- Buscador ------------------------------------*/





btnInicio.addEventListener("click",()=>{
    offSet = 0;
    listaSuperHeroes ="";
    cargarProyecto();
    console.log("botón inicio pulsado");
});
cargarProyecto();




txtBuscador.addEventListener("keyup", (e)=>{ //keyup
    //const valorBuscador = document.getElementById("txtBuscador").value; 
    const valorBuscador = e.target.value;
    
    if (valorBuscador != "") {
        console.log(valorBuscador);
        buscador(valorBuscador);
    } else {
        txtBuscador.value = "";
        offSet = 0;
        listaSuperHeroes ="";
        cargarProyecto();
    }

})



