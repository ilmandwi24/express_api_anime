const Request = require('supertest');

const TestHelper = require('../../../server/helpers/TestHelper');
const GeneralHelper = require('../../../server/helpers/GeneralHelper');
const anime = require('../../../server/api/anime');


let server;
describe('Anime', () => {
  beforeAll(() => {
    server = TestHelper.createTestServer('/api/v1/anime', anime);
  });

  afterAll(async () => {
    await server.close();
  });

  describe('Get All Anime', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('should return 200', async () => {
      // jest.spyOn(GeneralHelper, 'readLargeFile').mockResolvedValue(mockAnime)
      const response = await Request(server).get('/api/v1/anime/list');
      expect(response.status).toBe(200);
    });

    test('should return 200', async () => {
      // jest.spyOn(GeneralHelper, 'readLargeFile').mockResolvedValue(mockAnime)
      const response = await Request(server).get('/api/v1/anime/list').query({limit:1});
      expect(response.status).toBe(200);
    });
    test('should return 200', async () => {
      // jest.spyOn(GeneralHelper, 'readLargeFile').mockResolvedValue(mockAnime)
      const response = await Request(server).get('/api/v1/anime/list').query({offset:1});
      expect(response.status).toBe(200);
    });

    test('should return 500', async () => {
      const mockError = new Error('An internal server error occurred');
      jest.spyOn(GeneralHelper, 'readLargeFile').mockImplementationOnce(() => {
        throw mockError;
      });
      const response = await Request(server).get('/api/v1/anime/list');
      expect(response.status).toBe(500);
    });
  });

  describe('Search Anime', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    test('should return 500', async () => {
      const mockError = new Error('An internal server error occurred');
      jest.spyOn(GeneralHelper, 'readLargeFile').mockImplementationOnce(() => {
        throw mockError;
      });
      const response = await Request(server).post('/api/v1/anime/search').send({ name: 'Naruto' });
      expect(response.status).toBe(500);
    });

    test('should return 400', async () => {
      const response = await Request(server).post('/api/v1/anime/search').send({ movie: 'Naruto' });
      expect(response.status).toBe(400);
    });

    test('should return 404, anime not found', async () => {
      const response = await Request(server).post('/api/v1/anime/search').send({ name: 'Ashiap Man' });
      expect(response.status).toBe(404);
    });

    test('should return 200', async () => {
      const response = await Request(server).post('/api/v1/anime/search').send({ name: 'Alice' });
      expect(response.status).toBe(200);
    });
  });

  describe('Get Detail Anime By Id', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    test('should return 500', async () => {
      const mockError = new Error('An internal server error occurred');
      jest.spyOn(GeneralHelper, 'readLargeFile').mockImplementationOnce(() => {
        throw mockError;
      });
      const response = await Request(server).get('/api/v1/anime/detail/1001');
      expect(response.status).toBe(500);
    });

      test('should return 400', async () => {
        const response = await Request(server).get('/api/v1/anime/detail/abcdef');
        expect(response.status).toBe(400);
      });

    test('should return 404, anime not found', async () => {
      const response = await Request(server).get('/api/v1/anime/detail/999999');
      expect(response.status).toBe(404);
    });

    test('should return 200', async () => {
      const response = await Request(server).get('/api/v1/anime/detail/1001');
      expect(response.status).toBe(200);
    });
  });
  describe('Get Filter Anime', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    test('should return 500', async () => {
      const mockError = new Error('An internal server error occurred');
      jest.spyOn(GeneralHelper, 'readLargeFile').mockImplementationOnce(() => {
        throw mockError;
      });
      const response = await Request(server).post('/api/v1/anime/filter').send({genre:'fantasy'});
      expect(response.status).toBe(500);
    });

      test('should return 400', async () => {
        const response = await Request(server).post('/api/v1/anime/filter').send({name: 'fantasy'});
        expect(response.status).toBe(400);
      });

      test('should return 404', async () => {
        const response = await Request(server).post('/api/v1/anime/filter').send({genre: ['fantasy','travel'], status:'FINISHED'});
        expect(response.status).toBe(404);
      });

    // test('should return 404, anime not found', async () => {
    //   const response = await Request(server).get('/api/v1/anime/detail/999999');
    //   expect(response.status).toBe(404);
    // });

    test('should return 200', async () => {
      const response = await Request(server).post('/api/v1/anime/filter').send({genre:"fantasy"});
      expect(response.status).toBe(200);
    });
  });
  describe('Get Season Anime', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    test('should return 500', async () => {
      const mockError = new Error('An internal server error occurred');
      jest.spyOn(GeneralHelper, 'readLargeFile').mockImplementationOnce(() => {
        throw mockError;
      });
      const response = await Request(server).post('/api/v1/anime/season').send({season:'SUMMER'});
      expect(response.status).toBe(500);
    });


      test('should return 400', async () => {
        const response = await Request(server).post('/api/v1/anime/season').send({season: 'abcd'});
        expect(response.status).toBe(400);
      });

    test('should return 404, anime not found', async () => {
      const response = await Request(server).post('/api/v1/anime/season').send({season: 'UNKNOWN'});
      expect(response.status).toBe(404);
    });

    test('should return 200', async () => {
      const response = await Request(server).post('/api/v1/anime/season').send({season:"WINTER"});
      expect(response.status).toBe(200);
    });
  });
  describe('Get Year Anime', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    test('should return 500', async () => {
      const mockError = new Error('An internal server error occurred');
      jest.spyOn(GeneralHelper, 'readLargeFile').mockImplementationOnce(() => {
        throw mockError;
      });
      const response = await Request(server).post('/api/v1/anime/year').send({year:2021});
      expect(response.status).toBe(500);
    });

      test('should return 400', async () => {
        const response = await Request(server).post('/api/v1/anime/year').send({season:2021});
        expect(response.status).toBe(400);
      });

    test('should return 404, anime not found', async () => {
      const response = await Request(server).post('/api/v1/anime/year').send({year: 1});
      expect(response.status).toBe(404);
    });

    test('should return 200', async () => {
      const response = await Request(server).post('/api/v1/anime/year').send({year:2021});
      expect(response.status).toBe(200);
    });
  });
});
