angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Words) {
	$scope.words = Words.all();
})

.controller('WordsCtrl', function($scope, Words) {
  $scope.words = Words.all();
})

.controller('WordDetailCtrl', function($scope, $stateParams, Words) {
  $scope.word = { 'key' : $stateParams.key,
  				  'data' : Words.get($stateParams.key)};
})

.controller('GameCtrl', function($scope, Words, $rootScope) {
	//$scope.question = Words.getfour();
	$rootScope.score = 0;
})

.controller('GameQuestionCtrl', function($scope, Words, $rootScope){
	var question = Words.getfour();
	$rootScope.answer = question[3];
	$scope.choices = question.slice(0, 4).sort();
	$rootScope.question = question[4];
})

.controller('GameAnswerCtrl', function($scope, $stateParams, $rootScope) {
	console.log($rootScope.answer);
	console.log($stateParams.ans);
	//$scope.resule = TRUE if CORRECT!!!
	if($rootScope.answer === $stateParams.ans){
		$scope.result = true;
		$rootScope.score += 1;
	}else {
		$scope.result = false;
	}
	console.log($scope.result);

});
