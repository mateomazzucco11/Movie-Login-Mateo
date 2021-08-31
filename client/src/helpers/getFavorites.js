import axios from "axios";

export const getFavorites = async ({userId, token}) => {
  const data = await axios({
    method: 'get',
    url: `http://localhost:3003/favorites/${userId}`,
    headers: {
      accesstoken: token,
    },
    validateStatus: () => {
      return true;
    }
  })

  const response = data?.data.result;
  const msg = data?.data.msg;

  const moviesFavorites = response.map(inf => {
    return {
      id: inf.id,
      title: inf.title,
      image: inf.image,
      description: inf.description,
      cast: inf.cast,
      year: inf.year,
      director: inf.director,
    };
  })

  return {moviesFavorites, msg};
}