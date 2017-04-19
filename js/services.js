angular.module('musicAppService', [])
.factory('Music', function($resource){
  return $resource('http://104.197.128.152:8000/v1/tracks/:id', {id:  '@_id'});
})
.factory('MusicPages', function($resource){
  return $resource('http://104.197.128.152:8000/v1/tracks?page=:p', {p:  '@_p'});
})
.factory('Genres', function($resource){
  return $resource('http://104.197.128.152:8000/v1/genres/:id', {id: '@_id'});
})
.factory('GenresPages', function($resource){
  return $resource('http://104.197.128.152:8000/v1/genres?page=:p', {p: '@_p'});
})
.factory('Search', function($resource){
  return $resource('http://104.197.128.152:8000/v1/tracks?title=:q', {q: '@_q'});
})
.factory('PagerService', function(){
  var service = {};

        service.GetPager = GetPager;

        return service;


        function GetPager(totalItems, currentPage, pageSize) {

            currentPage = currentPage || 1;


            pageSize = pageSize || 20;

      
            var totalPages = Math.ceil(totalItems / pageSize);

            var startPage, endPage;
            if (totalPages <= 5) {

                startPage = 1;
                endPage = totalPages;
            } else {

                if (currentPage <= 3) {
                    startPage = 1;
                    endPage = 5;
                } else if (currentPage + 2 >= totalPages) {
                    startPage = totalPages - 4;
                    endPage = totalPages;
                } else {
                    startPage = currentPage - 3;
                    endPage = currentPage + 2;
                }
            }

            var pages=[];
            for(var i=startPage;i<(endPage+1);i++)
            {
              pages.push(i);
            }

            return {
                totalItems: totalItems,
                currentPage: currentPage,
                pageSize: pageSize,
                totalPages: totalPages,
                startPage: startPage,
                endPage: endPage,
                pages: pages
            };
        }
});
