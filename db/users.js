const mongoose = require('mongoose');
const Q = require('q');

const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_URL = `mongodb://${DB_USER}:${DB_PASS}@ds119548.mlab.com:19548/esn`;

mongoose.connect(DB_URL);

let schema = mongoose.Schema({
	username : String,
	password : String,
	role : String
});

let User = mongoose.model("User", schema);

function findAllUsers() {
	var defer = Q.defer();
	User.find({}).exec(function(err, result) {
		if (err) {
			defer.reject(err);
		} else {
			defer.resolve(result);
		}
	});
	return defer.promise;
}

function save(userData) {
	var defer = Q.defer();
	var user = new User(userData);
	user.save(function(err, result) {
		if (err) {
			defer.reject(err);
		} else {
			defer.resolve(result);
		}
	});
	return defer.promise;
}

function update(id, userData) {
	var defer = Q.defer();
	User.findByIdAndUpdate(id, userData).exec(function(err, result) {
		if (err) {
			defer.reject(err);
		} else {
			defer.resolve(result);
		}
	});
	return defer.promise;
}

function findUserByUsername(username) {
	var defer = Q.defer();
	User.findOne({
		username : username
	}).exec(function(err, result) {
		if (err) {
			defer.reject(err);
		} else {
			defer.resolve(result);
		}
	});
	return defer.promise;
}

function loginUser(username, password) {
	var defer = Q.defer();
	findUserByUsername(username)
		.then(function(result) {
			if (result) {
				if (checkPasswords(result.password, password)) {
					defer.resolve(result);
				} else {
					defer.reject(new Error("Passwords do not match"));
				}
			} else {
				defer.reject(new Error("Username " + username + " cannot be found"));
			}
		})
		.catch(function(err) {
			defer.reject(err);
		});
	return defer.promise;
}

function checkPasswords(originalPassword, givenPassword) {
	return (originalPassword === encodePassword(givenPassword));
}

function encodePassword(password) {
	return password;
}

module.exports = {
	findAll : findAllUsers,
	save : save,
	update : update,
	findByUsername : findUserByUsername,
	login : loginUser
}