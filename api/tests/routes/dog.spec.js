/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Raza, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'name',
  min_height: 1, 
  max_height: 2, 
  min_weight: 3, 
  max_weight: 4, 
  min_life_span: 5, 
  max_life_span: 6,
  image: 'imageURL',
  }

describe('Dogs routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => conn.sync({ force: true })
    .then(() => Raza.create(dog)));
  describe('GET /dogs', () => {
    it('should get 200', () =>
      agent.get('/dogs').expect(200)
    );

    // it('Should return all breeds', () => {
    //   console.log('p',agent.get('/dogs').expect(200))
    // })
  });
});
