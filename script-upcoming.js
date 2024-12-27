// script-upcoming.js

// Remplace par ta clé TMDb
const API_KEY = 'c2113dd34542a727f33448e2aeeece35';
const BASE_URL = 'https://api.themoviedb.org/3';

// Endpoint pour les films à venir
const UPCOMING_ENDPOINT = `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=fr-FR&region=FR`;

async function fetchUpcomingMovies() {
  try {
    const response = await fetch(UPCOMING_ENDPOINT);
    const data = await response.json();
    // data.results contient le tableau de films
    displayMovies(data.results);
  } catch (error) {
    console.error('Erreur lors de la récupération des films à venir :', error);
  }
}

function displayMovies(movies) {
  const container = document.getElementById('movies-container');
  container.innerHTML = '';

  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');

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

window.addEventListener('DOMContentLoaded', fetchUpcomingMovies);
