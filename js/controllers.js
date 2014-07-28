angular.module('starter.controllers', ['ionic'])

.controller('DashCtrl', function($scope, Words, $ionicPopup, $rootScope, $http) {
	// $scope.words = Words.all();	
	$scope.highscore = window.localStorage.getItem("HighScore");
	$scope.highscorename = window.localStorage.getItem("HighScoreName");
	$scope.highscoreSixty = window.localStorage.getItem("HighScoreSixty");
	$scope.highscorenameSixty = window.localStorage.getItem("HighScoreSixtyName");

	var eraseHS = document.getElementById('eraseHS');

	$scope.clearHS = function(){
		var confirmPop = $ionicPopup.confirm({
			title: 'Clear Highscore',
			template: 'Do you want to clear free mode highscore?'
		});
		confirmPop.then(function(rep){
			if(rep){
				window.localStorage.removeItem("HighScore");
				window.location.reload();
			}
		});
	};

	var eraseHS = document.getElementById('eraseHSSixty');

	$scope.clearHSSixty = function(){
		var confirmPop = $ionicPopup.confirm({
			title: 'Clear Highscore',
			template: 'Do you want to clear 60-second mode highscore?'
		});
		confirmPop.then(function(rep){
			if(rep){
				window.localStorage.removeItem("HighScoreSixty");
				window.location.reload();
			}
		});
	};
	// var quoteurl = "http://www.iheartquotes.com/api/v1/random?format=json&callback=JSON_CALLBACK";
	// var quote = $http.jsonp(quoteurl).then(function(result){
	// 	alert(result);
	// 	console.log(result);
	// });

	$scope.word = Words.getone();
	console.log($scope.word);
	if(typeof $scope.word !== 'undefined') $scope.meaning = Words.get($scope.word);
	

})

.controller('WordsCtrl', function($scope, Words) {
	$scope.search = "";
  	$scope.clearSearch = function(){
	    $scope.search = '';
  	};
  	words = Object.keys(Words.all()).sort();
  	$scope.words = [];
  	for (var i = 0; i <= 100; i++) {
  		$scope.words.push(words[i]);
  		// console.log(words[Object.keys(words)[i]]);
  	}
  	// console.log(words);

  	$scope.loadMore = function(){
  		var l = $scope.words.length;

  		for (var i = l; i < l + 100; i ++) {
  			$scope.words.push(words[i]);
  		}

    	$scope.$broadcast('scroll.infiniteScrollComplete');
  	};
})

.controller('WordDetailCtrl', function($scope, $stateParams, Words) {
  $scope.word = { 'key' : $stateParams.key,
  				  'data' : Words.get($stateParams.key)};
})

.controller('GameCtrl', function($scope, Words, $rootScope, $timeout) {
	//$scope.question = Words.getfour();
	$rootScope.score = 0;
	$rootScope.highscore = false;
	$rootScope.putHighscore = false;
	$rootScope.counttime = 0;
	$timeout.cancel($rootScope.stopwatch);
})

.controller('GameQuestionCtrl', function($scope, Words, $rootScope){
	var question = Words.getfour();
	$rootScope.answer = question[3];
	$scope.choices = question.slice(0, 4).sort();
	$rootScope.question = question[4];
	
})

.controller('GameAnswerCtrl', function($scope, $stateParams, $rootScope, $ionicPopup) {
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


})

.controller('GameSixtyCtrl', function($scope, $stateParams, $rootScope, Words, $timeout, $location){
 	$timeout.cancel($rootScope.stopwatch);
 	$scope.color = '#3795F2';
 	var countup = function(){
 		$rootScope.stopwatch = $timeout(function(){
 			if($rootScope.counttime > 600){
		 		$location.path('tab/game/sixty-answer');
		 	}
 			else {
 				$rootScope.counttime ++;
 				countup();
 				$scope.second = parseInt(60-$rootScope.counttime/10);
 			}


 			if($rootScope.counttime > 500){
 				$('#progressbar').css({
 					'color': 'red',
 					'border-color': 'red'
 				});

 				$scope.color = 'red';
 			}
 		}, 100);
 	};
 	countup();
 	//$scope.second = parseInt(60-$rootScope.counttime/10);

 	if($stateParams.ans == 0) {
 		var question = Words.getfour();
		$rootScope.answer = question[3];
		$scope.choices = question.slice(0, 4).sort();
		$rootScope.question = question[4];
 	} else if($stateParams.ans == $rootScope.answer) {
 		$('#correct').show().fadeOut('normal');
    	$rootScope.score += 1;
    	var question = Words.getfour();
		$rootScope.answer = question[3];
		$scope.choices = question.slice(0, 4).sort();
		$rootScope.question = question[4];    	
		console.log('correct');
 	} else if($stateParams.ans != $rootScope.answer) {
 		$('#incorrect').show().fadeOut('normal');
    	var question = Words.getfour();
		$rootScope.answer = question[3];
		$scope.choices = question.slice(0, 4).sort();
		$rootScope.question = question[4];  
		console.log('incorrect');
 	}
 })

 .controller('GameSixtyAnsCtrl', function($scope, $rootScope, $ionicPopup){
 	
 	var highscore = window.localStorage.getItem("HighScoreSixty");

	if((highscore === null || highscore === 'undefined') && $rootScope.score !== 0){
		window.localStorage.setItem("HighScoreSixty", $rootScope.score);
		$rootScope.highscore = true;
	} else if(highscore < $rootScope.score){
		window.localStorage.setItem("HighScoreSixty", $rootScope.score);
		$rootScope.highscore = true;
	}



	if($rootScope.highscore === true && $rootScope.putHighscore === false){
		$rootScope.putHighscore = true;
		var promptPop = $ionicPopup.prompt({
			title: 'New Highscore!!! Enter your name',
			inputType: 'text',
			inputPlaceholder: 'Your Name'
		});
		promptPop.then(function(rep){
			if(rep === 'undefined' || rep === '') window.localStorage.setItem("HighScoreSixtyName", "Anonymous");
			else window.localStorage.setItem("HighScoreSixtyName", rep);
		});
	}
 	//console.log()
 });
