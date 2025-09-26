export const endpoints = {
  // Colección de personajes
  characters: '/character',

  // Detalle de un personaje
  character: (id: number | string) => `/character/${id}`,

  // Episodios
  episodes: '/episode',
  episode: (id: number | string) => `/episode/${id}`,

  // Localizaciones
  locations: '/location',
  location: (id: number | string) => `/location/${id}`,
};
