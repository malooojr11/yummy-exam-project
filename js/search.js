import { display, openCard } from './main.js';

const searchInput1 = document.getElementById('searchInput1')
const searchInput2 = document.getElementById('searchInput2')
const searchResults = document.getElementById('searchResults')


searchInput1.addEventListener('input', function (e) {
    const name = e.target.value.trim()
    searchByFullName(name)
})

searchInput2.addEventListener('input', function (e) {
    const letter = e.target.value.trim();

    if (letter.length === 1 && /^[a-zA-Z]$/.test(letter)) {
        searchByFirstLetter(letter);
    } else {
        searchResults.innerHTML = `<p>Please enter a single valid letter (A-Z).</p>`;
    }
});

export async function searchByFullName(name) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    const data = await response.json();
    const meals = data.meals;

    display(meals, searchResults)

    openCard()

}

async function searchByFirstLetter(letter) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    const data = await response.json();
    const meals = data.meals

    display(meals, searchResults)

    openCard()

}
