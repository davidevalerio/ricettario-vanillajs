// =======================================================
// Riferimenti agli elementi DOM
// =======================================================
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const ricettaContainer = document.getElementById('ricetta-container');


// =======================================================
// 1. Funzione Principale: cercaRicette (Fetch Iniziale per Lista)
// =======================================================
async function cercaRicette(query) {
    // 1. Costruisce la URL dinamicamente per la ricerqueryca
    const API_URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

    ricettaContainer.innerHTML = '<p>Caricamento in Corso...</p>';

    try {
        const response = await fetch(API_URL);

        // Best practice per la gestione degli errori HTTP
        if (!response.ok) {
            throw new Error(`Errore HTTP! Status: ${response.status}`);
        }

        const data = await response.json();
        const ricette = data.meals;

        visualizzaListaRicette(ricette);

    } catch (error) {
        console.error('Si è verificato un errore nel fetch:', error);
        ricettaContainer.innerHTML = `<p style="color: red;">Si è verificato un errore durante il recupero dei dati: ${error.message}</p>`;
    }
}


// =======================================================
// 2. Funzione di Visualizzazione Lista
// =======================================================
function visualizzaListaRicette(ricette) {

    ricettaContainer.innerHTML = ''; // Pulisce i risultati precedenti

    if (!ricette || ricette.length === 0) {
        ricettaContainer.innerHTML = '<p>Nessuna ricetta trovata con questo termine di ricerca.</p>';
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


// =======================================================
// 3. Gestione Eventi (Listener per la Ricerca)
// =======================================================
searchForm.addEventListener('submit', (e) => {
    // Impedisce il ricaricamento della pagina
    e.preventDefault();

    const query = searchInput.value.trim();

    if (query) {
        cercaRicette(query);
    } else {
        ricettaContainer.innerHTML = '<p>Per favore, inserisci un termine di ricerca.</p>';
    }

    // Pulisce l'input dopo la ricerca
    searchInput.value = '';
});