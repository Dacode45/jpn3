'use strict';

angular.module('jpn', ['ngRoute'])
.config(['$routeProvider', function AppConfig($routeProvider){

  $routeProvider
    .when('/landing', {
      templateUrl: '/partials/landing.ejs',
      controller: 'DefaultCtrl'
    })
    .when('/contact', {
      templateUrl:'/partials/contact.ejs',
      controller: 'ContactCtrl'
    })
    .when('/post/:postId',{
      templateUrl:'/partials/post_view.ejs',
      controller:'PostCtrl'
    })
    .otherwise({
      redirectTo:'/landing'
    })

}])
.controller("DefaultCtrl",
['$scope', '$http', function default_ctrl($scope, $http){
$http.get('/posts').success(function getPosts(data){
  $scope.mainPost = data.splice(0,1)[0];
  $scope.sidePost = data.splice(0,2);
  $scope.posts = data;
});
}])
.controller("ContactCtrl",
['$scope', '$http', function contact_ctrl($scope, $http){
  $http.get('/members').success(function getMembers(data){
    $scope.members = data;
    $scope.index = 0;
    $scope.previous = "";
    $scope.current = $scope.members[0].name;
    $scope.next = $scope.members[1].name;
    console.log(data)
  });
  $scope.setIndex = function(i){
    $scope.index = i;
    if($scope.index < 0){
      $scope.index = 0;
      $scope.previous = "";
      $scope.current = $scope.members[$scope.index].name;
      $scope.next = ($scope.members[$scope.index+1])? $scope.members[$scope.index+1].name: "";
    }else{
      $scope.previous = $scope.members[$scope.index-1].name;
      $scope.current = $scope.members[$scope.index].name;
      $scope.next = ($scope.members[$scope.index+1])? $scope.members[$scope.index+1].name: "";
    }
  }
}])
.controller("PostCtrl", ["$scope", "$http","$routeParams", function post_ctrl($scope, $http, $routeParams){
  $http.get('/posts').success(function getOnePost(data){
    $scope.mainPost = data[$routeParams.postId];
  });
}])
;
