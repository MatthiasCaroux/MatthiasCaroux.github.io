// script-nowplaying.js

// Remplace par ta clé TMDb
const API_KEY = 'c2113dd34542a727f33448e2aeeece35';
const BASE_URL = 'https://api.themoviedb.org/3';

// Endpoint pour les films actuellement en salle
const NOW_PLAYING_ENDPOINT = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=fr-FR&region=FR`;

/**
 * Fonction principale au chargement de la page.
 */
async function fetchNowPlayingMovies() {
  try {
    const response = await fetch(NOW_PLAYING_ENDPOINT);
    const data = await response.json();
    // data.results contient le tableau de films
    displayMovies(data.results);
  } catch (error) {
    console.error('Erreur lors de la récupération des films en salle :', error);
  }
}

/**
 * Affiche les films dans le container.
 * @param {Array} movies - Liste des films renvoyés par l'API
 */
function displayMovies(movies) {
  const container = document.getElementById('movies-container');
  container.innerHTML = ''; // On vide pour être sûr

  movies.forEach(movie => {
    // Création d'une "carte" pour chaque film
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');

    // URL de l'affiche du film (w300 ou w500, etc.)
    const posterPath = movie.poster_path
      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
      : 'https://via.placeholder.com/300x450?text=No+Image';

    movieCard.innerHTML = `
      <img src="${posterPath}" alt="${movie.title}">
      <div class="movie-content">
        <div class="movie-title">${movie.title}</div>
        <div class="movie-date">Date de sortie : ${movie.release_date || 'N/A'}</div>
        <div class="movie-rating">Note moyenne : ${movie.vote_average || 'N/A'}/10</div>
      </div>
    `;

    container.appendChild(movieCard);
  });
}

// Appel de la fonction au chargement
window.addEventListener('DOMContentLoaded', fetchNowPlayingMovies);
