angular.module('voter').controller('loginCtrl', function($rootScope, $scope, $location, User) {

	function doLogin() {
		const username = $scope.username;
		const password = $scope.password;

		User.login({
			username: username,
			password: password
		});
	}

	$scope.doLogin = doLogin;

});