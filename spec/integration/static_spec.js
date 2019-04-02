const request = require ("request");
const server = require("../../src/server.js");
const base = "http://localhost:3000/";

describe("routes : static", () => {

  describe("GET /", () => {

    it("should return status code 200 and have 'Welcome to Bloccit' in the body of the response", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toContain("Welcome to Bloccit");
        done();
      });
    });
  });

  // describe("GET /marco", () => {
  //
  //   it("should return status code 200", (done) => {
  //     request.get(base + "marco", (err, res, body) => {
  //       expect(res.statusCode).toBe(200);
  //       done();
  //     });
  //   });
  //
  //   it("should return polo in the body", (done) => {
  //     request.get(base + "marco", (err, res, body) => {
  //       expect(body).toBe("polo");
  //       done();
  //     });
  //   });
  //
  // });

});
