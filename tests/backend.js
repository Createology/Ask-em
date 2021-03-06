// var request = require('supertest');
// var index = require('../database/index.js');
// var assert = require('assert');
// var mocha = require('mocha');

describe('Server Test', function () {

    describe('Connection Test', function () {
        it('Should have a response from the server ', function (done) {
            request(`${ip}:3000`).get('/').expect(200, done)
        })
        it('should resived error from the server with wrong path ', function (done) {
            request(`${ip}:3000`).get('/wrong').expect(404, done)
        });
    });
});

describe('POST', function () {
    it('should register users ', function (done) {
        request(`${ip}:3000`).post('/signup').expect(200).send({
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
        }).end(function (err, res) {
            done()
        })
    })
})


describe('GET', function () {
    it('should register users ', function (done) {
        request(`${ip}:4000`).get('/textbrain').expect(200, done)
    })
})