import type { Movie } from './model/movie';

export function generateMovieId(existingMovies: Movie[]): number {
	const existingIds = existingMovies.map((m) => m.id);
	// naive implementation, TODO: replace with uuid
	let newId: number;
	do {
		newId = Math.floor(Math.random() * 10_000);
	} while (existingIds.includes(newId));
    return newId;
}
