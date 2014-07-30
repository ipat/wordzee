// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    // Each tab has its own nav history stack:

    .state('tab.dash', {
      url: '/dash',
      views: {
        'tab-dash': {
          templateUrl: 'templates/tab-dash.html',
          controller: 'DashCtrl'
        }
      },
      resolve: {
        'WordsDate': function(Words){
            return Words.all;
        }
      }
    })

    .state('tab.words-about', {
      url: '/dash/about',
      views: {
        'tab-dash': {
          templateUrl: 'templates/dash-about.html',
          controller: 'AboutCtrl'
        }
      }
    })

    .state('tab.words', {
      url: '/words',
      views: {
        'tab-words': {
          templateUrl: 'templates/tab-words.html',
          controller: 'WordsCtrl'
        }
      }
    })
    .state('tab.word-detail', {
      url: '/words/:key',
      views: {
        'tab-words': {
          templateUrl: 'templates/word-detail.html',
          controller: 'WordDetailCtrl'
        }
      }
    })

    .state('tab.game', {
      url: '/game',
      views: {
        'tab-game': {
          templateUrl: 'templates/tab-game.html',
          controller: 'GameCtrl'
        }
      }
    })

    .state('tab.game-question', {
      url: '/game/question',
      views: {
        'tab-game': {
          templateUrl: 'templates/game-question.html',
          controller: 'GameQuestionCtrl'
        }
      }
    })

    .state('tab.game-sixty', {
      url: '/game/sixty/:ans',
      views: {
        'tab-game': {
          templateUrl: 'templates/game-sixty.html',
          controller: 'GameSixtyCtrl'
        }
      }
    })

    .state('tab.game-sixty-answer', {
      url: '/game/sixty-answer',
      views: {
        'tab-game': {
          templateUrl: 'templates/game-sixty-answer.html',
          controller: 'GameSixtyAnsCtrl'
        }
      }
    })

    .state('tab.game-working', {
      url: '/game/working',
      views: {
        'tab-game': {
          templateUrl: 'templates/game-working.html',
          controller: 'WorkingCtrl'
        }
      }
    })

    .state('tab.game-answer', {
      url: '/game/answer/:ans',
      views: {
        'tab-game': {
          templateUrl: 'templates/game-answer.html',
          controller: 'GameAnswerCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');
});

