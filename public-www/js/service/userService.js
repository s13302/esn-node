angular.module('voter').factory('User', function($resource) {

	return $resource('user', null, {
		'login' : {
			url: 'login',
			method: 'POST',
			isArray: false
		}
	});

});