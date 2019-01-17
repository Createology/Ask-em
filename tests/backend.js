// var request = require('supertest');
// var index = require('../database/index.js');
// var assert = require('assert');
// var mocha = require('mocha');

describe("Server Test", function() {
  describe("Connection Test", function() {
    it("Should have a response from the server ", function(done) {
      request(`${ip}:3000`)
        .get("/")
        .expect(200, done);
    });
    it("should resived error from the server with wrong path ", function(done) {
      request(`${ip}:3000`)
        .get("/wrong")
        .expect(404, done);
    });
  });
});

describe("POST", function() {
  it("should register users ", function(done) {
    request(`${ip}:3000`)
      .post("/signup")
      .expect(200)
      .send({
        firsname: "Someone",
        midname: "Someone'sFather",
        lastname: "Someone'sFamily",
        gender: "Male",
        country: "Jordan",
        region: "MiddleEast",
        age: "25",
        username: "Crazy",
        email: "someone@crazy.com",
        password: "123"
      })
      .end(function(err, res) {
        done();
      });
  });
});

describe("GET", function() {
  it("should register users ", function(done) {
    request(`${ip}:4000`)
      .get("/textbrain")
      .expect(200, done);
  });
});

describe("POST", function() {
  it("should get result from brain  ", function(done) {
    request(`${ip}:3000`)
      .post("/answer/res/get")
      .expect(200)
      .send({
        id_suervey: "19"
      })
      .end(function(err, res) {
        done();
      });
  });
});

describe("POST", function() {
  it("should add qustion  ", function(done) {
    request(`${ip}:3000`)
      .post("/question/dumb/add")
      .expect(200)
      .send({
        id_surveys: "19",
        id_users: "44",
        question: "who are you ?"
      })
      .end(function(err, res) {
        done();
      });
  });
});

describe("POST", function() {
  it("should get all  qustion for specifc survey ", function(done) {
    request(`${ip}:3000`)
      .post("/question/dumb/add")
      .expect(200)
      .send({
        id_surveys: "19"
      })
      .end(function(err, res) {
        done();
      });
  });
});

describe("POST", function() {
  it("should get all  answer for specifc survey ", function(done) {
    request(`${ip}:3000`)
      .post("/answer/dummy/get")
      .expect(200)
      .send({
        id_surveys: "19"
      })
      .end(function(err, res) {
        done();
      });
  });
});

describe("POST", function() {
  it("should add answer for qustion  ", function(done) {
    request(`${ip}:3000`)
      .post("/answer/dummy/add")
      .expect(200)
      .send({
        dummyanswer: "hey iam here ..",
        result: "44",
        id_smartquestions: "3",
        id_users: "44",
        id_surveys: "19"
      })
      .end(function(err, res) {
        done();
      });
  });
});

describe("POST", function() {
  it("should add smart answer for qustion  ", function(done) {
    request(`${ip}:3000`)
      .post("/answer/smart/add")
      .expect(200)
      .send({
        smartanswer: "hey iam here ..",
        Truth: "44",
        id_smartquestions: "3",
        id_users: "44",
        id_surveys: "19"
      })
      .end(function(err, res) {
        done();
      });
  });
});

describe("POST", function() {
  it("should get smart answer for survey  ", function(done) {
    request(`${ip}:3000`)
      .post("/answer/smart/get")
      .expect(200)
      .send({
        surveyID: "19"
      })
      .end(function(err, res) {
        done();
      });
  });
});

describe("POST", function() {
  it("should get all smart answer for survey  ", function(done) {
    request(`${ip}:3000`)
      .post("/answer/smart/get")
      .expect(200)
      .send({
        surveyID: "19"
      })
      .end(function(err, res) {
        done();
      });
  });
});

describe("POST", function() {
  it("should add smart qustion  ", function(done) {
    request(`${ip}:3000`)
      .post("/question/smart/add")
      .expect(200)
      .send({
        id_surveys: "19",
        id_users: "44",
        question: "who are you ?"
      })
      .end(function(err, res) {
        done();
      });
  });
});
