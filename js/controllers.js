angular.module('musicAppController', [])
.directive('starRating', function () {
    return {
        restrict: 'A',
        template: '<span class="rating">' +
            '<li ng-repeat="star in stars" ng-class="star">' +
            '\u2605' +
            '</li>' +
            '</span>',
        scope: {
            ratingValue: '=',
            max: '=',
            onRatingSelected: '&'
        },
        link: function (scope, elem, attrs) {

            var updateStars = function () {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                	ratingValue=Math.floor(scope.ratingValue);
                	console.log(ratingValue);
                    scope.stars.push({
                        filled: i < ratingValue
                    });
                }
            };
             updateStars();
        }
    }
})
.controller('MusicListController', function($scope, $state, $window, Music, MusicPages, PagerService) {


     //-------------------pagination-------------------------
     $scope.vm = {};


             $scope.vm.pager = {};
             $scope.vm.setPage = setPage;



                 $scope.vm.setPage(1);


             function setPage(page) {
                 if (page < 1 || page > $scope.vm.pager.totalPages) {
                     return;
                 }

                 $scope.musics = MusicPages.get({p:page});
                 $scope.musics.$promise.then(function(data) {
                    $scope.musics = data;
                    console.log($scope.musics);


                 $scope.vm.pager = PagerService.GetPager($scope.musics.count, page);
                 console.log($scope.vm.pager);


     //------------------------------------------------------

});
}


})
.controller('MusicViewController', function($scope, $stateParams, Music, Search) {
  console.log($stateParams.id)
  $scope.music = Music.get({ id: $stateParams.id });
  console.log($scope.music);
  $scope.music.$promise.then(function(data) {
     $scope.music = data;
     console.log($scope.music);


});
})
.controller('MusicCreateController', function($scope, $state, $stateParams, Music) {
  $scope.music = new Music();

  $scope.addMusic = function() {
    console.log($scope.music);
    $scope.music.$save(function() {
      $state.go('music');
    });
  };
})
.controller('MusicEditController', function($scope, $state, $stateParams, Music) {
  $scope.id = $stateParams.id;
  $scope.music = {
    "id" : 0,
    "title" : "",
    "rating" : 1.0 ,
    "genres" : []
  }
  console.log($stateParams.id);
  $scope.updateMusic = function(genr) {
    $scope.music.genres = [];
    $scope.music.genres.push(genr);
    console.log($scope.music);

    console.dir($scope.music)
    $scope.music.$save({id: $scope.id},function() {
      $state.go('music');
    });
  };

  $scope.loadMusic = function() {
    $scope.music = Music.get({ id: $stateParams.id });

  };

  $scope.loadMusic();
})
.controller('GenreController', function($scope, Genres, GenresPages, PagerService){


     //-------------------pagination-------------------------
     $scope.vm = {};


             $scope.vm.pager = {};
             $scope.vm.setPage = setPage;



                 $scope.vm.setPage(1);


             function setPage(page) {
                 if (page < 1 || page > $scope.vm.pager.totalPages) {
                     return;
                 }

                 $scope.genres = GenresPages.get({p:page});
                 $scope.genres.$promise.then(function(data) {
                    $scope.genres = data;
                    console.log($scope.genres);

                 $scope.vm.pager = PagerService.GetPager($scope.genres.count, page);
                 console.log($scope.vm.pager);
                

     //------------------------------------------------------

});

}
})
.controller('GenreViewController', function($scope, $stateParams, Genres){
  $scope.genre = Genres.get({ id: $stateParams.id });
  //console.log($scope.genre);
  $scope.genre.$promise.then(function(data) {
     $scope.genre = data;
     //console.log($scope.genre);

});
})
.controller('GenreEditController',function($scope, $state, $stateParams, Genres){
  $scope.id = $stateParams.id;
  $scope.updateGenre = function(){
    $scope.genre.$save({id: $scope.id},function() {
      console.log($scope.genre);
      $state.go('genre');
    });
  }
  $scope.loadGenre = function() {
    $scope.genre = Genres.get({ id: $stateParams.id });

  };

  $scope.loadGenre();
})
.controller('GenreCreateController', function($scope, $state, $stateParams, Genres){
  $scope.genre = new Genres();
  $scope.addGenre = function(){
    $scope.genre.$save(function() {
      console.log($scope.genre);
      $state.go('genre');
    });
    console.log($scope.genre);
  }
})
.controller('SearchController', function($scope, $stateParams, Search){

  //-----------------Search----------------------------------
$scope.query = $stateParams.q;
  var Utils = {

      urlencode: function (str) {
          var str = (str + '').toString();
          return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
      }
  }

    var qu = Utils.urlencode($scope.query),
        source;
        console.log(qu);
 $scope.music = Search.get({ q:$scope.query  });
 console.log($scope.music);
 $scope.music.$promise.then(function(data) {
 $scope.music = data.results[0];
 console.log($scope.music);

      });

  //---------------------------------------------------------------

})
