const ricettaBtn = document.getElementById('ricetta-btn');
const ricettaContainer = document.getElementById('ricetta-container');
const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=chicken';

async function cercaRicette() {
    ricettaContainer.innerHTML = '<h2>Caricamento in corso...</h2>';

    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const ricetta = data.meals;
        visualizzaListaRicetta(ricetta);
    } catch (error) {
        console.error('Si è verificato un errore:', error);
        ricettaContainer.innerHTML = '<h2>Si è verificato un errore</h2>';
    }
}

function visualizzaListaRicetta(ricette) {
    // 1. Svuota il contenitore prima di iniziare
    ricettaContainer.innerHTML='';

    //2. Controllo: L'API restituisce 'null' se non trova nulla
    if (!ricette) {
        ricettaContainer.innerHTML = '<h2>Nessuna ricetta trovata per questa ricerca.</h2>';
        return; // Esci dalla funzione
    }

    // 3. Iterazione (ciclo)
    // forEach è un metodo standard degli array: esegue una funzione per ogni elemento.
    // 'ricetta' qui è l'elemento corrente (il singolo oggetto ricetta).

    ricette.forEach(ricetta => {
        // 4. Costruisci il contenuto HTML per la singola ricetta (Card)
        const ricettaCardHTML = `
        <div class="ricetta-miniatura">
            <h3>${ricetta.strMeal}</h3>
            <img src="${ricetta.strMealThumb}" alt="Immagine di ${ricetta.strMeal}">
            <p>Area: ${ricetta.strArea}</p>
        </div>
        `

        // 5. Aggiungi il nuovo HTML al contenuto esistente.
        // Utilizzare '+=' con innerHTML aggiunge la nuova stringa HTML alla fine.
        ricettaContainer.innerHTML += ricettaCardHTML;
    });

}

ricettaBtn.addEventListener('click', cercaRicette);

// ALTERNATIVE senza innerHTML

const ricettaBtn = document.getElementById('ricetta-btn');
const ricettaContainer = document.getElementById('ricetta-container');
const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=chicken';

async function cercaRicette() {
    ricettaContainer.innerHTML = '<h2>Caricamento in corso...</h2>';

    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const ricette = data.meals;
        visualizzaListaRicette(ricette);
    } catch (error) {
        console.error('Si è verificato un errore durante il recupero dei dati: ', error);
        ricettaContainer.innerHTML = '<h2>Siamo spiacenti. Si è verificato un errore.</h2>';
    }
}

function visualizzaListaRicette(ricette) {
    ricettaContainer.textContent = '';

    if (!ricette || ricette.length === 0) {
        ricettaContainer.textContent = 'Nessuna ricetta trovata per questa ricerca.';
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

ricettaBtn.addEventListener('click', cercaRicette);