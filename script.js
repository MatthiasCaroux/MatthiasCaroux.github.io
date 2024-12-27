// script.js

const API_KEY = 'c2113dd34542a727f33448e2aeeece35';  // Mets ta vraie clé ici
const BASE_URL = 'https://api.themoviedb.org/3';
const MOVIE_ENDPOINT = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=fr-FR&region=FR`;

async function fetchMovies() {
  try {
    const response = await fetch(MOVIE_ENDPOINT);
    const data = await response.json(); // renvoie un objet avec un tableau de résultats
    // data.results contient la liste des films
    displayMovies(data.results);
  } catch (error) {
    console.error("Erreur lors de la récupération des films :", error);
  }
}

function displayMovies(movies) {
  const container = document.getElementById('movies-container');

  // On vide le conteneur au cas où il y ait déjà du contenu
  container.innerHTML = '';

  movies.forEach(movie => {
    // Pour chaque film, on crée un élément HTML
    const movieElem = document.createElement('div');
    movieElem.classList.add('movie-item');

    // On récupère l’affiche du film
    const posterPath = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;

    movieElem.innerHTML = `
      <img src="${posterPath}" alt="${movie.title}" />
      <h3>${movie.title}</h3>
      <p>Date de sortie : ${movie.release_date}</p>
      <p>Note moyenne : ${movie.vote_average}/10</p>
    `;

    container.appendChild(movieElem);
  });
}

// On exécute la fonction au chargement de la page
window.addEventListener('load', fetchMovies);
