angular.module('fotografiasApp.controllers', ['ionic'])

.controller('APPController', function($scope, $ionicPopup) {

  //Control de eliminación de cuenta
  $scope.salir = function() {

    //dialogo de confirmacion para salir de la app
    var confirmPopup = $ionicPopup.confirm({
      title: 'Cerrar sesión',
      template: '¿Está seguro de que quiere salir de la aplicación?',
      buttons: [{
        text: 'No',
        type: 'button-assertive'
      }, {
        text: 'Sí',
        type: 'button-balanced'
      }]
    });

    //dependiendo de la respuesta salimos o no
    confirmPopup.then(function(res) {
      if(res) {
          //comando para cerrar app?
      }
    });
  };

})

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {

  //array donde se guardaran los datos del formu de login
  $scope.data = {};

  //funcion llamada desde el boton de login del formu
  $scope.login = function() {

    //llamamos a la función del servicio de login pasando email y pass
    LoginService.loginUser($scope.data.email, $scope.data.password)
    .success(function(data) {

      if(debug){
        console.log(data);
      }

      //si el login es correcto vamos a la tab de las fotos
      $state.go('tab.fotos');
    })
    .error(function(data) {

      if(debug){
        console.log(data);
      }

      //Si el login es incorrecto mostramos mensaje de error
      var alertPopup = $ionicPopup.alert({
        title: '¡Error de login!',
        template: 'Datos de acceso incorrectos.'
      });
    });
  }
})

.controller('FotosCtrl', function($scope, $ionicModal) {

  //lightbox para ver las fotos en grande desde el listado
  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function() {
    $scope.modal.show();
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

  $scope.$on('modal.shown', function() {
    console.log('Modal is shown!');
  });

  $scope.imageSrc = 'img/logo.png';

  $scope.showImage = function(index) {
    switch(index) {
      case 1:
      $scope.imageSrc = 'img/logo.png';
      break;
      case 2:
      $scope.imageSrc = 'img/logo.png';
      break;
      case 3:
      $scope.imageSrc = 'img/logo.png';
      break;
    }
    $scope.openModal();
  }

})

.controller('CartCtrl', function($scope, Chats) {
  $scope.bBorrar = false;

  $scope.showBorrar = function(){
    $scope.bBorrar = true;
  }

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('CuentaCtrl', function($scope, $ionicPopup) {
  /*$scope.settings = {
  enableFriends: true
  };*/

  //Control de eliminación de cuenta
  $scope.eliminarCuenta = function() {

    //dialogo de confirmacion
    var confirmPopup = $ionicPopup.confirm({
      title: 'Eliminar cuenta',
      template: '¿Está seguro de que quiere eliminar su cuenta de cliente?',
      buttons: [{
        text: 'No',
        type: 'button-assertive'
      }, {
        text: 'Sí',
        type: 'button-balanced'
      }]
    });

    //dependiendo de la respuesta borramos o no el cliente
    confirmPopup.then(function(res) {
      if(res) {
        if(debug){
          console.log("Confirmación del cliente de eliminación de cuenta.");
        }
      } else {
        if(debug){
          console.log("El cliente no elimina la cuenta.");
        }
      }
    });
  };

});
