import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // backend url
});

export const getMovies = () => API.get("/movies");
export const addMovie = (data) => API.post("/movies", data);
export const updateMovie = (id, data) => API.put(`/movies/${id}`, data);
export const deleteMovie = (id) => API.delete(`/movies/${id}`);
