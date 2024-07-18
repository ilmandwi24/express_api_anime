const Path = require('path');
const Boom = require('boom');
const CommonHelper = require('./CommonHelper');
const GeneralHelper = require('./GeneralHelper');

const ANIME_DATA = Path.join(__dirname, '../../assets/anime.json');

const getAnimeListName = async () => {
  try {
    const data = await GeneralHelper.readLargeFile(ANIME_DATA, 'data.*');
    const animeName = data.map((item) => item.title);
    return {
      count: data.length,
      list: animeName
    };
  } catch (error) {
    CommonHelper.log(['Anime Helper', 'getAnimeListName', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

const getAnimeListNameWithLimitOffset = async (limit,offset) => {
  try {
    const data = await GeneralHelper.readLargeFile(ANIME_DATA, 'data.*');
    const animeName = data.map((item) => item.title);
    const dataAnime = CommonHelper.getPaginatedData(animeName,limit,offset)
    
    return {
      count: dataAnime.length,
      list: dataAnime
    };
  } catch (error) {
    CommonHelper.log(['Anime Helper', 'getAnimeListName', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

const getAnimeByName = async (req) => {
  try {
    const data = await GeneralHelper.readLargeFile(ANIME_DATA, 'data.*');
    const animeDetail = data.filter((item) => item.title.toLowerCase().includes(req.body.name.toLowerCase()));

    if (animeDetail.length === 0) {
      return Boom.notFound('Anime not found');
    }
    const animeList = animeDetail.map((item) => item.title);

    return {
      count: animeDetail.length,
      list: animeList,
      detail: animeDetail
    };
  } catch (error) {
    CommonHelper.log(['Anime Helper', 'getAnimeByName', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

const getAnimeByDetail = async (req) => {
  try {
    const data = await GeneralHelper.readLargeFile(ANIME_DATA, 'data.*');
    const animeDetail = data.find(item => item.id===Number(req.params.id));
    // jsonData.find(obj => obj.name === 'example2')?.id;
    if (!animeDetail) {
      return Boom.notFound(`Anime with id ${req.params.id} doesn't exist`);
    }
    // const animeList = animeDetail.map((item) => item.title);

    return {
      // count: animeDetail.length,
      id: animeDetail.id,
      title: animeDetail.title,
      type: animeDetail.type,
      episodes: animeDetail.episodes,
      status: animeDetail.status,
      picture: animeDetail.picture,
      thumbnail: animeDetail.thumbnail,
      genre: animeDetail.tags
    };
  } catch (error) {
    CommonHelper.log(['Anime Helper', 'getAnimeByName', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

const getAnimeByFilter = async (req) =>{
  try {
    let dataResult =[];
    const genre =  req.body.genre;
    const status = req.body.status || '';
    const data = await GeneralHelper.readLargeFile(ANIME_DATA, 'data.*');
    // filter by genre
    dataResult = typeof req.body.genre === 'string' ? data.filter(item => item.tags.includes(genre)):data.filter(item => genre.every(g => item.tags.includes(g)));
    if(status !== ''){
      dataResult = dataResult.filter(item=>item.status.toUpperCase() === status.toUpperCase())
    }
    // jsonData.find(obj => obj.name === 'example2')?.id;
    if (dataResult.length ===0) {
      return Boom.notFound(`Anime not found`);
    }
    // const animeList = animeDetail.map((item) => item.title);

    return {
      // count: animeDetail.length,
      count: dataResult.length,
      list: dataResult,
      // detail: animeDetail
    };
  } catch (error) {
    CommonHelper.log(['Anime Helper', 'getAnimeByName', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
}

const getAnimeBySeason = async (req)=>{
  try {
    const season =  req.body.season;
    const data = await GeneralHelper.readLargeFile(ANIME_DATA, 'data.*');
    // filter by genre
    const seasonAnime =  data.filter(item => item.animeSeason.season.toUpperCase() === season.toUpperCase());
    
    // jsonData.find(obj => obj.name === 'example2')?.id;
    if (seasonAnime.length ===0) {
      return Boom.notFound(`Anime not found`);
    }
    // const animeList = animeDetail.map((item) => item.title);

    return {
      // count: animeDetail.length,
      count: seasonAnime.length,
      list: seasonAnime,
      // detail: animeDetail
    };
  } catch (error) {
    CommonHelper.log(['Anime Helper', 'getAnimeByName', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
}

const getAnimeByYear = async (req)=>{
  try {
    const year =  req.body.year;
    const data = await GeneralHelper.readLargeFile(ANIME_DATA, 'data.*');
    // filter by genre
    const seasonAnime =  data.filter(item => item.animeSeason.year === Number(year));
    
    // jsonData.find(obj => obj.name === 'example2')?.id;
    if (seasonAnime.length ===0) {
      return Boom.notFound(`Anime not found`);
    }
    // const animeList = animeDetail.map((item) => item.title);

    return {
      // count: animeDetail.length,
      count: seasonAnime.length,
      list: seasonAnime,
      // detail: animeDetail
    };
  } catch (error) {
    CommonHelper.log(['Anime Helper', 'getAnimeByName', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
}
module.exports = { getAnimeListName, getAnimeByName,getAnimeByDetail,getAnimeListNameWithLimitOffset,getAnimeByFilter, getAnimeBySeason, getAnimeByYear };
