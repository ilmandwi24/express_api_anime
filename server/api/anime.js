const router = require('express').Router();
const CommonHelper = require('../helpers/CommonHelper');
const ValidationHelper = require('../helpers/ValidationHelper');
const AnimeHelper = require('../helpers/AnimeHelper');

const getAllAnime = async (req, res) => {
  try {
    // get data from json
    let limit;
    let offset;

    limit = 10;
    offset = 0;
    if(req.query.limit){
      limit = Number(req.query.limit)
    } 
    if(req.query.offset){
      offset = Number(req.query.offset)
    } 
    const data = await AnimeHelper.getAnimeListNameWithLimitOffset(limit,offset);


    // return response success
    return res.send(data);
  } catch (error) {
    CommonHelper.log(['Anime', 'Get All Anime', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};

const searchAnime = async (req, res) => {
  try {
    // check validation input
    ValidationHelper.searchAnimeValidation(req.body);
    // Get detail anime by request body name
    const data = await AnimeHelper.getAnimeByName(req);
    // return response success
    return res.send(data);
  } catch (error) {
    CommonHelper.log(['Anime', 'Search Anime', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};

const detailAnimeById = async(req,res)=>{ 
  try {
    // check validation input
    ValidationHelper.getIdAnimeValidation(req.params);
    // Get detail anime by request body name
    const data = await AnimeHelper.getAnimeByDetail(req);
    // return response success
    return res.send(data);
  } catch (error) {
    CommonHelper.log(['Anime', 'Detail Anime', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });
    return res.send(CommonHelper.errorResponse(error));
  }
}

const filterAnime = async (req,res) =>{
  try {
    // check validation input
    ValidationHelper.getFilterAnimeValidation(req.body);
    // Get detail anime by request body name
    const data = await AnimeHelper.getAnimeByFilter(req);
    // return response success
    return res.send(data);
  } catch (error) {
    CommonHelper.log(['Anime', 'Filter Anime', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });
    return res.send(CommonHelper.errorResponse(error));
  }
}

const seasonAnime = async (req,res)=>{
  try {
    // check validation input
    ValidationHelper.getSeasonAnimeValidation(req.body);
    // Get detail anime by request body name
    const data = await AnimeHelper.getAnimeBySeason(req);
    // return response success
    return res.send(data);
  } catch (error) {
    CommonHelper.log(['Anime', 'Season Anime', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });
    return res.send(CommonHelper.errorResponse(error));
  }
}

const yearAnime = async (req,res)=>{
  try {
    // check validation input
    ValidationHelper.getYearAnimeValidation(req.body);
    // Get detail anime by request body name
    const data = await AnimeHelper.getAnimeByYear(req);
    // return response success
    return res.send(data);
  } catch (error) {
    CommonHelper.log(['Anime', 'Year Anime', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });
    return res.send(CommonHelper.errorResponse(error));
  }
}

router.get('/list', CommonHelper.preHandler, getAllAnime);
router.post('/search', CommonHelper.preHandler, searchAnime);
router.get('/detail/:id', CommonHelper.preHandler, detailAnimeById);
router.post('/filter', CommonHelper.preHandler, filterAnime);
router.post('/season', CommonHelper.preHandler, seasonAnime);
router.post('/year', CommonHelper.preHandler, yearAnime);

module.exports = router;
