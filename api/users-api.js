const express = require('express');

const user = require('../db/users')

const router = express.Router();

router.post('/api/user/login', function(req, res) {
	user.login(req.body.username, req.body.password)
		.then(function(result) {
			req.session.user = result;
			res.redirect('/' + result.role + '/index.html');
		})
		.catch(function(err) {
			res.redirect('index.html');
		});
});

module.exports = router;