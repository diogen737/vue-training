import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

import type { Movie } from '@/model/movie';
import { items } from '@/assets/movies.json';

export const useMovieStore = defineStore('movies', () => {
  /**
   * State
   */

  const movies = ref<Movie[]>(items);
  const movieToEdit = ref<Movie | null>(null);

  /**
   * Getters
   */

  const avgRating = computed(() => {
    const sum = movies.value.reduce((acc, curr) => acc + (curr.rating || 0), 0);
    return sum / (movies.value.length || 1);
  });

  const avgRatingFormatted = computed(() =>
    Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(avgRating.value)
  );

  /**
   * Actions
   */

  function getMovie(id: number) {
    return movies.value.find(m => m.id === id);
  }

  function createMovie(movie: Movie) {
    movie.id = generateMovieId(movies.value);
    movies.value.push(movie);
  }

  function updateMovie(movie: Movie) {
    // redundant check (if crud operations become async in the future)
    if (movieExists(movie)) {
      const idx = movieIndex(movie);
      Object.assign(movies.value[idx], movie);
    }
  }

  function deleteMovie(movie: Movie) {
    // redundant check (if crud operations become async in the future)
    if (movieExists(movie)) {
      const idx = movieIndex(movie);
      movies.value.splice(idx, 1);
    }
  }

  function resetRatings() {
    movies.value.forEach((m) => (m.rating = 0));
  }

  /**
   * Util functions
   */

  function movieIndex(movie: Movie) {
    return movies.value.findIndex((m) => m.id === movie.id);
  }

  function movieExists(movie: Movie) {
    return movieIndex(movie) > -1;
  }

  function generateMovieId(existingMovies: Movie[]): number {
    const existingIds = existingMovies.map((m) => m.id);
    // naive implementation, TODO: replace with uuid
    let newId: number;
    do {
      newId = Math.floor(Math.random() * 10_000);
    } while (existingIds.includes(newId));
    return newId;
  }

  return {
    movies,
    movieToEdit,
    avgRating,
    avgRatingFormatted,
    get: getMovie,
    create: createMovie,
    update: updateMovie,
    delete: deleteMovie,
    exists: movieExists,
    resetRatings
  };
});
