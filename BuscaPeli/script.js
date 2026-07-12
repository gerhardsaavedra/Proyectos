const btn=document.getElementById("btn")
const busca=document.getElementById("busca")
const form = document.getElementById("buscador");
const resultado = document.getElementById("resultado");

let info= []


const API_KEY = "9e623dd0";

async function buscarPeliculas(texto) {
    const url = `https://www.omdbapi.com/?s=${texto}&apikey=${API_KEY}`;
    const respuesta = await fetch(url);
    const datos = await respuesta.json();

    if (datos.Response === "False") {
        console.error("No se encontró nada")
        return;
    }
    
    mostrarPelicula(datos.Search);// la lista de películas
}

function mostrarPelicula(peliculas) {
    resultado.innerHTML = "" ;
    peliculas.forEach((pelicula) => {

        const portada = document.createElement("article");

        const imagen = document.createElement("img");
        imagen.src = pelicula.Poster;
        imagen.alt = pelicula.Title;

        imagen.addEventListener("error", () => {
            imagen.src = "https://placehold.co/300x450?text=Sin+Imagen";
        }, {once:true} );  

        const titulo = document.createElement("h2");
        titulo.textContent = pelicula.Title;
        const año = document.createElement("p");
        año.textContent = pelicula.Year;

        portada.appendChild(imagen);
        portada.appendChild(titulo);
        portada.appendChild(año);

        resultado.appendChild(portada);

        
    });
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const texto = busca.value.trim()

    if (texto==="") return;

    await buscarPeliculas(texto);


})