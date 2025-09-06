const API_KEY = '930b28ee1c494af6a4178feeeacfbb29'; // crea tu API key en rawg.io
const BASE_URL = 'https://api.rawg.io/api';

export async function getLatestGames() {
  const url = `${BASE_URL}/games?key=${API_KEY}&page=1&page_size=20`;

  const rawData = await fetch(url);
  const json = await rawData.json();

  // los juegos están en json.results
  return json.results.map((game) => {
    const { id, slug, name, released, background_image, rating } = game;

    return {
      description:
        slug +
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis scelerisque velit et ex fringilla, in commodo neque malesuada. Praesent aliquet turpis ac convallis scelerisque. Vivamus ut lectus diam. Nullam urna tortor, tempor at commodo sed, aliquam id felis. Phasellus venenatis, orci eget rhoncus euismod, arcu diam luctus nisi, id commodo nulla lacus id ante. Quisque eget mauris vel magna bibendum vulputate non id nisl. Integer imperdiet sem at interdum convallis. Suspendisse auctor neque vitae elit tempor, vel faucibus purus fringilla. Mauris id dolor a dolor convallis tincidunt ac vitae risus. Aliquam nec posuere lacus. Nam iaculis luctus sagittis. Vivamus ullamcorper turpis nec vulputate ullamcorper. Nam vestibulum, sem a feugiat vulputate, nisl nunc elementum enim, at congue tortor mi ac velit. Nulla aliquam, enim vel gravida aliquet, velit justo maximus magna, luctus malesuada tortor nisl eget sem.',
      slug,
      title: name,
      releaseDate: released,
      image: background_image,
      score: rating, // RAWG usa rating (0-5), no metascore
    };
  });
}

export async function getGameDetails(slug) {
  const url = `${BASE_URL}/games/${slug}?key=${API_KEY}`;
  const rawData = await fetch(url);
  const game = await rawData.json();

  const { id, name, description_raw, released, background_image, rating } = game;

  return {
    id,
    slug,
    title: name,
    description: description_raw,
    releaseDate: released,
    image: background_image,
    score: rating,
  };
}
