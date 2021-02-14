(function(){
    'use strict'

    angular
        .module('MyApp')
        .controller('ApplicationCtrl', applicationCtrl);

    // injection below

    function applicationCtrl($sce, $scope){
        const sl = this;
        sl.name = "MyApp";
        $scope.name2 = "Palawit"
    }

})();