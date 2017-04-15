angular
    .module('myApp')
    .directive('errorWindow', editModal);

function editModal() {
    var directive = {
        controller: 'ErrorWindowController',
        controllerAs: 'vm',
        templateUrl: '/widgets/errorWindow/error-window.html',
        restrict: 'E',
        scope: {
            errorMessage: '=errorMessage'
        }
    };
    return directive;
}
