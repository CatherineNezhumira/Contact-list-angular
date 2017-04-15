angular
    .module('myApp')
    .directive('editModal', editModal);

function editModal() {
    var directive = {
        controller: 'EditModalController',
        controllerAs: 'vm',
        templateUrl: '/widgets/modal/edit-modal.html',
        restrict: 'E',
        scope: {
            contact: '=contact',
            visible: '=visible',
            onSubmit: '=onSubmit'
        }
    };
    return directive;
}
