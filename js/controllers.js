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

.controller('GameCtrl', function($scope, Words) {
	//$scope.question = Words.getfour();
})

.controller('GameQuestionCtrl', function($scope, Words){
	var question = Words.getfour();
	$scope.choices = question.slice(0, 4);
	$scope.question = question[4];
	$scope.identity = angular.identity;
});
