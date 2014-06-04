angular.module('starter.controllers', ['ionic'])

.controller('DashCtrl', function($scope, Words, $ionicPopup, $rootScope) {
	// $scope.words = Words.all();	
	$scope.highscore = window.localStorage.getItem("HighScore");
	$scope.highscorename = window.localStorage.getItem("HighScoreName");

	var eraseHS = document.getElementById('eraseHS');

	$scope.clearHS = function(){
		var confirmPop = $ionicPopup.confirm({
			title: 'Clear Highscore',
			template: 'Do you want to clear highscore?'
		});
		confirmPop.then(function(rep){
			if(rep){
				window.localStorage.removeItem("HighScore");
				window.location.reload();
			}
		});
	};

	$scope.word = Words.getone();
	console.log($scope.word);
	if(typeof $scope.word !== 'undefined') $scope.meaning = Words.get($scope.word);
	

})

.controller('WordsCtrl', function($scope, Words) {
	$scope.search = "";
  	$scope.clearSearch = function(){
	    $scope.search = '';
  	};
  	$scope.words = Object.keys(Words.all()).sort();
})

.controller('WordDetailCtrl', function($scope, $stateParams, Words) {
  $scope.word = { 'key' : $stateParams.key,
  				  'data' : Words.get($stateParams.key)};
})

.controller('GameCtrl', function($scope, Words, $rootScope) {
	//$scope.question = Words.getfour();
	$rootScope.score = 0;
	$rootScope.highscore = false;
	$rootScope.putHighscore = false;
})

.controller('GameQuestionCtrl', function($scope, Words, $rootScope){
	var question = Words.getfour();
	$rootScope.answer = question[3];
	$scope.choices = question.slice(0, 4).sort();
	$rootScope.question = question[4];
})

.controller('GameAnswerCtrl', function($scope, $stateParams, $rootScope, $ionicPopup) {
	console.log($rootScope.answer);
	console.log($stateParams.ans);
	//$scope.resule = TRUE if CORRECT!!!
	if($rootScope.answer === $stateParams.ans){
		$scope.result = true;
		$rootScope.score += 1;
	}else {
		$scope.result = false;
	}

	var highscore = window.localStorage.getItem("HighScore");

	if((highscore === null || highscore === 'undefined') && $rootScope.score !== 0){
		window.localStorage.setItem("HighScore", $rootScope.score);
		$rootScope.highscore = true;
	} else if(highscore < $rootScope.score){
		window.localStorage.setItem("HighScore", $rootScope.score);
		$rootScope.highscore = true;
	}



	if($rootScope.highscore === true && $scope.result === false && $rootScope.putHighscore === false){
		$rootScope.putHighscore = true;
		var promptPop = $ionicPopup.prompt({
			title: 'New Highscore!!! Enter your name',
			inputType: 'text',
			inputPlaceholder: 'Your Name'
		});
		promptPop.then(function(rep){
			if(rep === 'undefined' || rep === '') window.localStorage.setItem("HighScoreName", "Anonymous");
			else window.localStorage.setItem("HighScoreName", rep);
		});
	}
});
