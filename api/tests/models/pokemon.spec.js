const { Pokemon, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Pokemon model', () => {
  before(() => conn.authenticate()    
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Pokemon.create({ name: 'Pikachu' });
      });
      it('should work when there ara no numbers or special characters', () => {
        Pokemon.create({name: "22pika22"})
          .then(() => done())
          .catch(() => done(new Error('Numbers or special characters are not allowed')));
        });
    });
  });

  beforeEach(() => Pokemon.sync({ force: true }));
  describe("Stats", () => {
    it("Should throw an error if Hp is not a number", (done) => {
      Pokemon.create({ hp: "aa" }) //en esta cb definimos
        .then(() => done(new Error("Hp should be a number")))
        .catch(() => done());
    });  
    it("Should throw an error if attack is not a number", (done) => {
      Pokemon.create({ attack: "aa" })
        .then(() => done(new Error("Attack should be a number")))
        .catch(() => done());
    });
    it("Should throw an error if defense is not a number", (done) => {
      Pokemon.create({ defense: "aa" })
        .then(() => done(new Error("Defense should be a number")))
        .catch(() => done());
    });
    it("Should throw an error if speed is not a number", (done) => {
      Pokemon.create({ speed: "aa" })
        .then(() => done(new Error("Speed should be a number")))
        .catch(() => done());
    });
    it("Should throw an error if height is not a number", (done) => {
      Pokemon.create({ height: "aa" })
        .then(() => done(new Error("Height should be a number")))
        .catch(() => done());
    });
    it("Should throw an error if weight is not a number", (done) => {
      Pokemon.create({ weight: "aa" })
        .then(() => done(new Error("Weight should be a number")))
        .catch(() => done());
    });
  });
})