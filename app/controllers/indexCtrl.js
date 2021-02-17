var app = angular.module("MyApp", ["ngMaterial", "ngMessages"]);

app.controller("ApplicationCtrl", function appCtrl($sce, $scope, $controller) {
  const sl = this;
  $scope.currentNavItem = "page1";

  $scope.goto = function (page) {
    $scope.status = "Goto " + page;
  };
  
  sl.name = "MyApp";
  $scope.name2 = "TestTest";
});
