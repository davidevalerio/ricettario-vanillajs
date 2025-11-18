const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const ricettaContainer = document.getElementById('ricetta-container');

// Funzione principale: cercaRicette (Fetch iniziale della lista)

async function cercaRicette(query) {
    
    const API_URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

    ricettaContainer.innerHTML ='<p>Caricamento in corso...</p>';

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error (`HTTP Error status: ${response.status}`);
        }

        const data = await response.json();
        const ricette = data.meals;
        visualizzaListaRicette(ricette);
    } catch (error) {
        console.error(`Si e verificato il seguente errore:`, error);
        ricettaContainer.innerHTML = `<p>Si e verificato un errore durante il fetch: ${error.message}</p>`;
    }
}

// Funzione 2: Visualizzazione della lista

function visualizzaListaRicette(ricette) {

    ricettaContainer.innerHTML = '';

    if (!ricette || ricette.length === 0) {
        ricettaContainer.innerHTML = `<h2 style="color: blue">Nessuna ricetta disponibile con il termine utilizzato. Prova un altro termine.</h2>`;
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

// Funzione 3: Gestione Eventi

searchForm.addEventListener ('submit', (e) => {

    e.preventDefault();

    const query = searchInput.value.trim();

    if (query) {
        cercaRicette(query);
    } else {
        ricettaContainer.innerHTML = '<h2>Per favore inserisci un termine di ricerca</h2>';
    }

    searchInput.value = '';
});