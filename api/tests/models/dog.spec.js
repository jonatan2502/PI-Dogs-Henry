const { Raza, conn } = require('../../src/db.js');
const { expect } = require('chai');

// describe('Dog model', () => {
//   before(() => conn.authenticate()
//     .catch((err) => {
//       console.error('Unable to connect to the database:', err);
//     }));
//   describe('Validators', () => {
//     beforeEach(() => Dog.sync({ force: true }));
//     describe('name', () => {
//       it('should throw an error if name is null', (done) => {
//         Dog.create({})
//           .then(() => done(new Error('It requires a valid name')))
//           .catch(() => done());
//       });
//       it('should work when its a valid name', () => {
//         Dog.create({ name: 'Pug' });
//       });
//     });
//   });
// });
const prueba = {
  name: "perrito de prueba 5",
  minHeigh: 6, 
  maxHeight: 7, 
  minWeight: 8, 
  maxWeight: 9, 
  minLifespan: 10, 
  maxLifespan: 11,
  temperaments: ["no hace caso", "ladra pasito"],
  image: "http://localhost:3000/createBreed.jpg"
  }

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => conn.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Raza.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Raza.create(prueba);
      });
    });
  });
});