angular.module('musicApp', ['ui.router', 'ngResource', 'musicAppController', 'musicAppService'])
.config(function($stateProvider) {
  $stateProvider.state('music', {
    url: '/music',
    templateUrl: 'partials/music.html',
    controller: 'MusicListController'
  }).state('viewMusic', {
    url: '/music/:id/view',
    templateUrl: 'partials/music-view.html',
    controller: 'MusicViewController'
  }).state('newMusic', {
    url: '/music/new',
    templateUrl: 'partials/music-add.html',
    controller: 'MusicCreateController'
  }).state('editMusic', {
    url: '/music/:id/edit',
    templateUrl: 'partials/music-edit.html',
    controller: 'MusicEditController'
  }).state('genre', {
    url: '/genres',
    templateUrl: 'partials/genres.html',
    controller: 'GenreController'
  }).state('viewGenre', {
    url: '/genres/:id/view',
    templateUrl: 'partials/genre-view.html',
    controller: 'GenreViewController'
  }).state('newGenre', {
    url: '/genres/new',
    templateUrl: 'partials/genre-add.html',
    controller: 'GenreCreateController'
  }).state('editGenre', {
    url: '/genres/:id/edit',
    templateUrl: 'partials/genre-edit.html',
    controller: 'GenreEditController'
  }).state('searchView', {
    url: '/query/:q',
    templateUrl: 'partials/search-view.html',
    controller: 'SearchController'
  });
})
.run(function($state) {
  $state.go('music'); 
});

function goBack() {
    window.history.back();
}
