var app = angular.module("MyApp", ["ngMaterial", "ngMessages"]);

app.controller("ApplicationCtrl", function appCtrl($sce, $scope, $controller) {
  const sl = this;
  sl.currentNavItem = "leaveForm";

  sl.goto = function (page) {
    $scope.status = "Goto " + page;
  };

  sl.name = "MyApp";
  $scope.name2 = "TestTest";

  $scope.user = {
    title: 'Developer',
    email: 'ipsum@lorem.com',
    firstName: '',
    lastName: '',
    company: 'Google',
    address: '1600 Amphitheatre Pkwy',
    city: 'Mountain View',
    state: null,
    stateOfBirth: 'CA',
    description: 'Loves TypeScript 💖',
    postalCode: '94043',
    licenseAccepted: true,
    submissionDate: null,
    marketingOptIn: true
  };

  $scope.gens = ('ชาย หญิง').split(' ').map(function (gen) {
    return {abbrev: gen};
  });
});
