import axios from "axios";
import type { Movie } from "../types/movie";

interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const TMDB_API_URL = "https://api.themoviedb.org/3/search/movie";
const token = import.meta.env.VITE_TMDB_TOKEN?.replace(/^Bearer\s+/i, "")
  .replace(/^['\"]|['\"]$/g, "")
  .trim();

export async function fetchMovies(query: string): Promise<MovieResponse> {
  if (!token) {
    throw new Error("VITE_TMDB_TOKEN is not configured");
  }

  const response = await axios.get<MovieResponse>(TMDB_API_URL, {
    params: { query, include_adult: false, language: "en-US", page: 1 },
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
}
