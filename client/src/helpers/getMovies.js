export const getMovies = async () => {
  const resp = await fetch('http://localhost:3003/movies');
  const data = await resp.json();
  console.log(data)

  const movies = data.map(inf => {
    return {
      id: inf.id,
      title: inf.title,
      image: inf.image,
      description: inf.description,
      cast: inf.cast,
      year: inf.year,
      director: inf.director,
    }
  })

  return movies;
}