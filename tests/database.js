
var mysql = require('mysql');
var request = require('request'); // You might need to npm install the request module!
var expect = require('chai').expect;
var ip = require('../ip.json');


describe('Persistent Node Chat Server', function () {
	var dbConnection;

	beforeEach(function (done) {
		dbConnection = mysql.createConnection({
			user: 'user_askem77',
			password: 'FXtc4xuW8MAJE5w',
			database: 'askem_77'
		});
		dbConnection.connect();


		var tablename = 'users';

		/* Empty the db table before each test so that multiple tests
		 * (or repeated runs of the tests) won't screw each other up: */
		dbConnection.query('truncate ' + tablename, done);
	});

	afterEach(function () {
		dbConnection.end();
	});

	it('Should insert user to the DB', function (done) {
		// Post the user to the chat server.
		request({
			method: 'POST',
			uri: `${ip}:3000/signup`,
			json: { username: 'Valjean' }
		}, function () {
			// Post a message to the node chat server:
			request({
				method: 'POST',
				uri: 'http://127.0.0.1:3000/classes/messages',
				json: {
					firstName = 'first',
					midname = 'second',
					lastName = 'last',
					age = '01-01-1982',
					gender = '1',
					country = 'Irbid',
					email = 'a@a.com',
					username = 'username',
					password = 'password'
				}
			}, function () {
				// Now if we look in the database, we should find the
				// posted message there.

				// TODO: You might have to change this test to get all the data from
				// your message table, since this is schema-dependent.
				var queryString = 'SELECT * FROM users';
				var queryArgs = [];

				dbConnection.query(queryString, queryArgs, function (err, results) {
					// Should have one result:
					expect(results.length).to.equal(1);

					// TODO: If you don't have a column named text, change this test.
					expect(results[0].firstName).to.equal('first');

					done();
				});
			});
		});
	});

	it('Should output all surveys from the DB', function (done) {
		// Let's insert a message into the db
		var queryString = 'INSERT INTO surveys(category, description, activate) VALUES (?, ?, ?)';
		var queryArgs = ['something', 'main', '1'];
		// TODO - The exact query string and query args to use
		// here depend on the schema you design, so I'll leave
		// them up to you. */

		dbConnection.query(queryString, queryArgs, function (err) {
			if (err) { throw err; }

			// Now query the Node chat server and see if it returns
			// the message we just inserted:
			request(`${ip}/surveys`, function (error, response, body) {
				var surveysResults = JSON.parse(body);
				expect(surveysResults[0].category).to.equal('something');
				expect(surveysResults[0].description).to.equal('main');
				done();
			});
		});
	});
});

it('Should get all choice from the DB', function (done) {
	// Let's insert a message into the db
	var queryString = 'SELECT choice from choices where id_qustions = 19';
	// TODO - The exact query string and query args to use
	// here depend on the schema you design, so I'll leave
	// them up to you. */

	dbConnection.query(queryString, function (err) {
		if (err) { throw err; }

		// Now query the Node chat server and see if it returns
		// the message we just inserted:
		request(`${ip}/surveys`, function (error, response, body) {
			var surveysResults = JSON.parse(body);
			expect(surveysResults[0].choice).to.equal('a');
			expect(surveysResults[0].id_qustions).to.equal('4');
			done();
		});
	});
});


it('Should output all result from the DB', function (done) {
	// Let's insert a message into the db
	var queryString = 'INSERT INTO result (id, id_suervey, answer, createdAt) VALUES(null, \"${id_suervey}\",\"${answer}\",CURRENT_TIMESTAMP)';
	var queryArgs = ['null', '19', 'b'];
	// TODO - The exact query string and query args to use
	// here depend on the schema you design, so I'll leave
	// them up to you. */

	dbConnection.query(queryString, queryArgs, function (err) {
		if (err) { throw err; }

		// Now query the Node chat server and see if it returns
		// the message we just inserted:
		request(`${ip}/surveys`, function (error, response, body) {
			var surveysResults = JSON.parse(body);
			expect(surveysResults[0].answer).to.equal('b');
			expect(surveysResults[0].id_suervey).to.equal('19');
			done();
		});
	});
});
