const ricettaBtn = document.getElementById('ricetta-btn');
const ricettaContainer = document.getElementById('ricetta-container');
const API_URL = 'https://www.themealdb.com/api/json/v1/1/random.php';

async function fetchRicettaCasuale() {
    ricettaContainer.innerHTML = '<h2>Caricamento in corso...</h2>';

    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const ricetta = data.meals[0];
        visualizzaRicetta(ricetta);
    } catch (error) {
        console.error('Si è verificato un errore:', error);
        ricettaContainer.innerHTML = '<h2>Si è verificato un errore</h2>';
    }
}

function visualizzaRicetta(ricetta) {
    const htmlContent = `
    <div class='ricetta-card'>
        <h2>${ricetta.strMeal}</h2>
        <img src="${ricetta.strMealThumb}" alt="Immagine di ${ricetta.strMeal}" class="ricetta-img">

        <div class='ricetta-dettagli'>
            <p><strong>Categoria:</strong> ${ricetta.strCategory}</p>
            <p><strong>Area:</strong> ${ricetta.strArea}</p>
        </div>

        <div class='ricetta-istruzioni'>
            <h3>Istruzioni:</h3>
            <p>${ricetta.strInstructions.replace(/\r\n/g, "<br>")}</p>
        </div>
    </div>
    `;

    ricettaContainer.innerHTML = htmlContent;
}

ricettaBtn.addEventListener('click', fetchRicettaCasuale);