// script-marvel.js

// Ta clé TMDb
const API_KEY = 'c2113dd34542a727f33448e2aeeece35';
const BASE_URL = 'https://api.themoviedb.org/3';

// Endpoint "Discover" pour Marvel Studios (ID = 420) 
// On peut ajouter &sort_by=release_date.desc pour trier par date de sortie descendante
const MARVEL_ENDPOINT = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_companies=420&language=fr-FR&sort_by=release_date.desc`;

async function fetchMarvelMovies() {
  try {
    const response = await fetch(MARVEL_ENDPOINT);
    const data = await response.json();
    // data.results contient les films Marvel Studios
    displayMovies(data.results);
  } catch (error) {
    console.error('Erreur lors de la récupération des films Marvel :', error);
  }
}

function displayMovies(movies) {
  const container = document.getElementById('movies-container');
  container.innerHTML = '';

  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');

    // Gérer le cas où l'affiche n'existe pas (poster_path = null)
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

// Appel au chargement de la page
window.addEventListener('DOMContentLoaded', fetchMarvelMovies);
