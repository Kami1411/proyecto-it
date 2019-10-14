const divMangas = document.getElementById("Manga")
const divZoomImage = document.getElementById("zoomImage")
const divSombreado = document.getElementById("sombreado");

function buscar() {

    let xhr = new XMLHttpRequest();
    xhr.onload = function () {

        if (xhr.status == 200) {
            let Mangas = JSON.parse(xhr.responseText);
            divMangas.textContent = "";
            Mangas.forEach(Mangas => {
                divMangas.appendChild(crearDivManga(Mangas));
            });

        } else {
            divMangas.textContent = xhr.responseText;
        }
    }

    let filtroManga = document.getElementById("Manga").value;
    let filtroMangaka = document.getElementById("Mangaka").value;

    xhr.open("GET", `Mangas.json?filtroManga=${filtroManga}&filtroMangaka=${filtroMangaka}`);
    xhr.send();
    divMangas.textContent = "Consultando datos....";
}


function crearDivManga(datosManga) {
    let divResultado = document.createElement("div");

    divResultado.classList.add("contenedor-mangas");

    let imageTapa = document.createElement("img");
    imageTapa.src = `/client${datosManga.image}`;
    imageTapa.addEventListener("click", () => {
        divZoomImage.querySelector("img").src = imageTapa.src;
        divZoomImage.classList.remove("oculto");
        divSombreado.classList.remove("oculto");
    })

    divResultado.appendChild(imageTapa);

    let listaDatos = document.createElement("ul");
    
    let itemMangaka = document.createElement("li");
    itemMangaka.textContent = "Artist: " + datosManga.Mangaka;
    listaDatos.appendChild(itemMangaka);

    let itemManga = document.createElement("li");
    itemManga.textContent = "title: " + datosManga.Manga;
    listaDatos.appendChild(itemManga);

    let itemDescription = document.getElementById ("li");
    itemDescription.textContent = "Descrption: " + datosManga.Description;
    listaDatos.appendChild(itemDescription);

    let itemChapters = document.getElementById ("li");
    itemChapters.textContent = "Chapters: " + datosManga.Chapters;
    listaDatos.appendChild (itemChapters);

    let itemStartPublication = document.getElementById ("li");
    itemStartPublication.textContent = "Start publication: " + datosManga.StartPublication;
    listaDatos.appendChild (itemStartPublication);

    let itemFinalPublication = document.getElementById ("li");
    itemFinalPublication.textContent = "FinalPublication: " + datosManga.FinalPublication;
    listaDatos.appendChild (itemFinalPublication);

    let itemLink = document.createElement("li");
    itemLink.textContent = "lecture: ";
    let linkLink = document.createElement("a");
    linkLink.href = `http://es.ninemanga.com/${datosManga.Link}`;
    linkLink.target = "_blank";
    linkLink.textContent = datosManga.Link;
    itemLink.appendChild(linkLink);


    html +=`<div class="Manga">`;
    html +=   `<img src="${datosManga.image}">`;
    html +=   `<ul>`;
    html +=     `<li>Artista: ${datosManga.Manga}</li>`;
    html +=     `<li>Título: ${datosManga.Mangaka}</li>`;
    html +=     `<li>Año lanzamiento: <a href="/${datosManga.Link}" target="_blank">${datosManga.Link}</a></li>`;
    html +=   `</ul>`;
    html += `</div>`;

    // Asigno ese texto como HTML del div
    divResultado.innerHTML = html;

    divResultado.querySelector("img").addEventListener("click", () => {
        divZoomImage.querySelector("img").src = datosPortada.tapa;
        divZoomImage.classList.remove("oculto");
        divSombreado.classList.remove("oculto");
    })


    divResultado.appendChild(listaDatos);
    
    return divResultado;

}

function cerrarZoom() {
    divZoomImage.classList.add("oculto");
    divSombreado.classList.add("oculto");
}

