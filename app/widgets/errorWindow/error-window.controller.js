angular
    .module('myApp')
    .controller('ErrorWindowController', EditModalController);

function EditModalController($scope) {
  const vm = this;
  vm.close = close;
  activate();

  function activate() {}

  function close() {
      $scope.errorMessage = '';
  }

}
