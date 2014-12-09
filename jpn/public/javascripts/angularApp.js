'use strict';

angular.module('jpn', ['ngRoute', 'ngAnimate'])
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
    .when('/calendar', {
      templateUrl:'/partials/calendar.ejs',
      controller: 'DefaultCtrl'
    })
    .when('/post/:postId',{
      templateUrl:'/partials/post_view.ejs',
      controller:'PostCtrl'
    })
    .when('/paint', {
      templateUrl:'/partials/paint.ejs',
      controller:'PaintCtrl'
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
  $scope.suggestEvent = {};
  $scope.suggestEvent.name="";
  $scope.suggestEvent.email="";
  $scope.suggestEvent.description="";

  $scope.suggest = function(event){
    if(/^[a-zA-Z ]+$/.test(event.name)){
      if(/^([a-z0-9A-Z_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/.test(event.email)){
        if(event.description){
          $scope.eventConfirmed = "Suggestion Sent";
        }else
          $scope.eventConfirmed = "No Description"

      }
      else
        $scope.eventConfirmed = "Bad Email"
    }else
      $scope.eventConfirmed = "Bad Name"
  }
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
    if($scope.index <= 0){
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
.controller("PaintCtrl", ["$scope", function paint_ctrl($scope){
  $scope.imgName = "";
  $scope.changeImgName = function(name){
    $scope.imgName = name;
  }
}])
;
