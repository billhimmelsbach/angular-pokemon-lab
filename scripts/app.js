angular
  .module('tunely', [])
  .controller('PokemonIndexController', PokemonIndexController);



  AlbumsIndexController.$inject = ['$http'];
  function AlbumsIndexController (  $http  ) {
  $http({
    method: 'GET',
    url: 'https://super-crud.herokuapp.com/pokemon',
  }).then(function successCallback(response) {
    vm.albums = response.data;
  }, function errorCallback(response) {
    console.log('There was an error getting the data', response);
  });
