/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');

const agent = session(app);

describe("Pokemon routes", ()=>{
  describe("If only /pokemon, should get 200 and all pokemon", () => {
    describe("GET /pokemon/:id", () => {
      it("Should get 200 when id is received", () =>
        agent.get("/pokemon/11").expect(200));
    });
    describe("GET /pokemon?name=aaa", () => {
      it("Should get 200 when name received", () =>
        agent.get("/pokemon?name=pikachu").expect(200));
    });
    describe("Get /pokemon", () => {
      it("Should get 200 when ", () => {
      agent.get("/pokemon").expect(200);
      })
    })
  });
})
