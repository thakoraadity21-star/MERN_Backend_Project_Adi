const BASE_URL = "https://api.jikan.moe/v4";

// ================= TOP ANIME =================
export const getTopAnime = async () => {
  const res = await fetch(`${BASE_URL}/top/anime`);
  const data = await res.json();
  return data.data;
};

// ================= ANIME DETAIL =================
export const getAnimeById = async (id) => {
  const res = await fetch(`${BASE_URL}/anime/${id}`);
  const data = await res.json();
  return data.data;
};

// ================= SEARCH ANIME =================
export const searchAnime = async (query) => {
  const res = await fetch(
    `${BASE_URL}/anime?q=${query}&order_by=score&sort=desc`
  );
  const data = await res.json();
  return data.data;
};
