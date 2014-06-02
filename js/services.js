angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
  ];

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
  }).factory('Words', function($http){
    var words;
    var word = $http.get('file/dic-min.json').then(function(response){
      words = response.data;
      return response.data;
    });

    // var words = word.data;
    // console.log(word);

    return {
      all: function() {
        return words;
      },
      get: function(wordId) {
        // console.log(words[wordId]);
        // console.log("key = " + wordId);
        return words[wordId];
      },
      getfour: function(){
        function randomKey() {
            var ret;
            var c = 0;
            for (var key in words)
                if (Math.random() < 1/++c)
                   ret = key;
            return ret;
        }

        var wordReturn = [];
        while(wordReturn.length < 4){
          var temp = randomKey();
          if(wordReturn.indexOf(temp) === -1)
            wordReturn.push(temp);
          if(wordReturn.length === 4){
            wordReturn.push(words[temp]);
          }
        }
        return wordReturn;

      },
      getone: function(){
        function randomKey() {
            var ret;
            var c = 0;
            for (var key in words)
                if (Math.random() < 1/++c)
                   ret = key;
            return ret;
        }
        var temp = randomKey();
        return temp;
      }
    };

  });
