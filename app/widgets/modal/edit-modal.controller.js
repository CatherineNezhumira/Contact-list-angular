angular
    .module('myApp')
    .controller('EditModalController', EditModalController);

function EditModalController($scope) {
  const vm = this;
  vm.close = close;
  vm.submit = submit;
  activate();

  function activate() {}

  function close() {
      $scope.visible = false;
  }

  function submit() {
    vm.close();
    $scope.onSubmit();
  }


}
