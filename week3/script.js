const API_URL = "http://localhost:3000/movies";
const movieListDiv = document.getElementById("movie-list");
const searchInput = document.getElementById("search-input");
const form = document.getElementById("add-movie-form");

let allMovies = []; // Store the full list of movies

// Fetch all movies from server
async function fetchMovies() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch movies");
    allMovies = await response.json();
    renderMovies(allMovies);
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}

// Render movies
function renderMovies(moviesToDisplay) {
  movieListDiv.innerHTML = "";

  if (moviesToDisplay.length === 0) {
    movieListDiv.innerHTML = "<p>No movies found matching your criteria.</p>";
    return;
  }

  moviesToDisplay.forEach((movie) => {
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie-item");

    const p = document.createElement("p");
    p.innerHTML = `<strong>${movie.title}</strong> (${movie.year}) - ${movie.genre}`;
    movieElement.appendChild(p);

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () =>
      editMoviePrompt(movie.id, movie.title, movie.year, movie.genre)
    );
    movieElement.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteMovie(movie.id));
    movieElement.appendChild(deleteBtn);

    movieListDiv.appendChild(movieElement);
  });
}

// Search functionality
searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredMovies = allMovies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchTerm) ||
      movie.genre.toLowerCase().includes(searchTerm)
  );
  renderMovies(filteredMovies);
});

// Add new movie with integer auto-increment ID
form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Calculate new integer ID manually
  const maxId = Math.max(...allMovies.map(m => parseInt(m.id)));
  const newId = (maxId + 1).toString();

  const newMovie = {
    id: String(newId), // Integer ID
    title: document.getElementById("title").value,
    genre: document.getElementById("genre").value,
    year: parseInt(document.getElementById("year").value),
  };

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newMovie),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Failed to add movie");
      return response.json();
    })
    .then(() => {
      form.reset();
      fetchMovies();
    })
    .catch((error) => console.error("Error adding movie:", error));
});

// Prompt-based edit
function editMoviePrompt(id, currentTitle, currentYear, currentGenre) {
  const newTitle = prompt("Enter new Title:", currentTitle);
  const newYearStr = prompt("Enter new Year:", currentYear);
  const newGenre = prompt("Enter new Genre:", currentGenre);

  if (newTitle && newYearStr && newGenre) {
    const updatedMovie = {
      title: newTitle,
      year: parseInt(newYearStr),
      genre: newGenre,
    };
    updateMovie(id, updatedMovie);
  }
}

// Update movie
function updateMovie(movieId, updatedMovieData) {
  fetch(`${API_URL}/${movieId.toString()}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedMovieData),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Failed to update movie");
      return response.json();
    })
    .then(() => fetchMovies())
    .catch((error) => console.error("Error updating movie:", error));
}

// Delete movie
function deleteMovie(movieId) {
  fetch(`${API_URL}/${movieId.toString()}`, { method: "DELETE" })
    .then((response) => {
      if (!response.ok) throw new Error("Failed to delete movie");
      fetchMovies();
    })
    .catch((error) => console.error("Error deleting movie:", error));
}

// Initial fetch
fetchMovies();
