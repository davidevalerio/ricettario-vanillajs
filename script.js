const ricettaBtn = document.getElementById('ricetta-btn');
const ricettaContainer = document.getElementById('ricetta-container');
const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=chicken';

async function cercaRicette() {
    ricettaContainer.textContent = 'Caricamento in Corso...'

    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const ricette = data.meals;
        visualizzaListaRicette(ricette);
    } catch (error) {
        console.error('Si è verificato un errore:', error);
        ricettaContainer.textContent = 'Si è verificato un errore';
    }
}

function visualizzaListaRicette(ricette) {

    ricettaContainer.textContent = '';

    if (!ricette || ricette.length === 0) {
        ricettaContainer.textContent = 'Non ci sono ricette.';
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