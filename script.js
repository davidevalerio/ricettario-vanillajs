const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const ricettaContainer = document.getElementById('ricetta-container');

async function cercaRicette(query) {
    const API_URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

    ricettaContainer.innerHTML = 'Caricamento in Corso...';

    try {
        const response = await fetch(API_URL);
        if(!response.ok) {
            throw new Error (`Errore HTTP! Status: ${response.status}`);
        }

        const data = await response.json();
        const ricette = data.meals;

        visualizzaListaRicette(ricette);
    } catch (error) {
        console.error(`Si e verificato un errore durante il fetch:`, error);
        ricettaContainer.innerHTML = `<p style ="color: red;">Si e' verificato un errore durante il recupero dei dati: ${error.message}</p>`
    }
}

function visualizzaListaRicette(ricette) {

    ricettaContainer.innerHTML = '';

    if (!ricette || ricette.length === 0) {
        ricettaContainer.innerHTML = '<p>Nessuna ricetta trovata!</p>';
        return;
    }

    ricette.forEach(ricetta => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'ricetta-card';
        cardDiv.innerHTML = `
            <h3>${ricetta.strMeal}</h3>
            <img src="${ricetta.strMealThumb}" alt="Immagine di ${ricetta.strMeal}">
            <p>Categoria: ${ricetta.strCategory}</p>
        `;

        ricettaContainer.appendChild(cardDiv);
    });
}

searchForm.addEventListener('submit', (e) => {

    e.preventDefault();

    const query = searchInput.value.trim();

    if (query) {
        cercaRicette(query);
    } else {
        ricettaContainer.innerHTML = '<h2>Per favore, inserisci un termine di ricerca.</h2>';
    }

    searchInput.value = '';
});