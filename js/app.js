"use strict"
const limite = 10;
const offSet = 0;


const cargarProyecto = async () => {
    try {
        let apikey = `https://gateway.marvel.com/v1/public/characters?limit=${limite}&offset=${offSet}&ts=1&apikey=eaa98daf4d86236acb4de698f6808297&hash=c0819d4ad93eb938110b0d68f54532f0`;
        const respuesta = await fetch(apikey);
        //console.log(respuesta);
        const datos = await respuesta.json();
        //console.log(datos);
        /*  <-- Total de 1559 */
        const resultados = datos.data.results;
        //console.log(resultados); /*  <-- Muestra arreglo con super Heroes */
        //console.log(resultados[1]); /*  <-- Muestra sol primer resultado */

        let listaSuperHeroes = "";
        resultados.forEach(marvelHeroes => {
            //console.log(marvelHeroes);
            const imagen = marvelHeroes.thumbnail.path +"."+marvelHeroes.thumbnail.extension;
            
            listaSuperHeroes += `
            <div class="superHeroes" id="superHeroes">
                <img class="thumbnail" src="${imagen}" alt="">
                <h2 class="nombreHeroe" id="nombreHeroe">${marvelHeroes.name}</h2>
            </div>
            `;
        });

        document.getElementById("contenedor").innerHTML = listaSuperHeroes;

    } catch (error) {
        console.log(error);
    }
}






cargarProyecto();