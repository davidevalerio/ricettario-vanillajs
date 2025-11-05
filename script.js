// 1. Ottiene il pulsante a cui agganciare l'evento 'click'
const ricettaBtn = document.getElementById('ricetta-btn');

// 2. Ottiene il contenitore in cui inseriremo i dati della ricetta
const ricettaContainer = document.getElementById('ricetta-container');

// URL dell'API per una ricetta casuale
const API_URL = 'https://www.themealdb.com/api/json/v1/1/random.php';

// Funzione per recuperare i dati in modo asincrono
async function fetchRicettaCasuale() {
    // 1. Iniziamo mostrando un messaggio di caricamento
    ricettaContainer.innerHTML = '<h2>Caricamento in corso...</h2>';

    try {
        // 2. Esegue la richiesta all'API e attende la risposta (await)
        const response = await fetch(API_URL);

        // 3. Converte la risposta in formato JSON e attende (await)
        const data = await response.json();

        // L'API restituisce un array chiamato 'meals'. Prendiamo il primo elemento.
        const ricetta = data.meals[0];

        // 4. Passiamo l'oggetto ricetta alla funzione di visualizzazione
        visualizzaRicetta(ricetta);
    } catch (error) {
        // 5. Gestione degli errori: se qualcosa va storto (es. API non disponibile)
        console.error('Errore durante il recupero della ricetta:', error);
        ricettaContainer.innerHTML = '<h2>Spiacenti, si e verificato un errore nel caricamento</h2>';
    }
}

function visualizzaRicetta(ricetta) {
    // 1. Definiamo il link YouTube (inizialmente vuoto)
    let youtubeLink = ''; 
    
    if (ricetta.strYoutube) {
        // target="_blank" fa aprire il link in una nuova scheda
        youtubeLink = `
            <p class="youtube-link">
                <a href="${ricetta.strYoutube}" target="_blank">📺 Guarda il video su YouTube</a>
            </p>
        `;
    }

    // 2. Costruiamo l'HTML, includendo il link YouTube
    const htmlContent = `
        <div class="ricetta-card">
            <h2>${ricetta.strMeal}</h2>
            <img src="${ricetta.strMealThumb}" alt="Immagine di ${ricetta.strMeal}" class="ricetta-img">
            
            <div class="ricetta-istruzioni">
                <h3>Istruzioni:</h3>
                <p>${ricetta.strInstructions.replace(/\r\n/g, '<br>')}</p> 
            </div>
            
            ${youtubeLink} </div>
    `;
    
    ricettaContainer.innerHTML = htmlContent;
}

// Aggancia la funzione 'fetchRicettaCasuale' all'evento 'click' del pulsante
ricettaBtn.addEventListener('click', fetchRicettaCasuale);

// Potresti chiamare la funzione una volta all'inizio per caricare la prima ricetta!
// fetchRicettaCasuale();