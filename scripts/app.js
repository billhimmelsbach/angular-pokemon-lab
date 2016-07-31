/* CLIENT-SIDE JS
 *
 * This is your main angular file. Edit as you see fit.
 *
 */

angular
  .module('pokemon', [])
  .controller('PokemonIndexController', PokemonIndexController);

PokemonIndexController.$inject = ['$http'];

function PokemonIndexController ($http) {
  var vm = this;
  // vm.newAlbum = {};
  // vm.newAlbum = {
  //   name: 'Viva Hate',
  //   artistName: 'Morrissey'
  // };

  $http({
    method: 'GET',
    url:'https://super-crud.herokuapp.com/pokemon',
  }).then(function successCallback(response) {
    vm.pokemon = response.data.pokemon;
    console.log(response.data);
    console.log(vm.albums);
    // console.log(vm.albums.pokemon);
    // console.log(vm.albums.pokemon[0].name);
  }, function errorCallback(response) {
    console.log('There was an error getting the data', response);
  });

  vm.createPoke = function () {
    console.log("test");
    $http({
      method: 'POST',
      url: 'https://super-crud.herokuapp.com/pokemon/',
      data: vm.newPoke,
    }).then(function successCallback(response) {
      vm.pokemon.push(response.data);
    }, function errorCallback(response) {
      console.log('There was an error posting the data', response);
    });
  };

  vm.editPoke = function (poke) {
    $http({
      method: 'PUT',
      url: 'https://super-crud.herokuapp.com/pokemon/'+poke._id,
      data: poke
    }).then(function successCallback(json) {
      // don't need to do anything!
    }, function errorCallback(response) {
      console.log('There was an error editing the data', response);
    });
  };

  vm.deletePoke = function (poke) {
    $http({
      method: 'DELETE',
      url: 'https://super-crud.herokuapp.com/pokemon/'+ poke._id
    }).then(function successCallback(json) {
      var index = vm.pokemon.indexOf(poke);
      vm.pokemon.splice(index,1);
    }, function errorCallback(response) {
      console.log('There was an error deleting the data', response);
    });
  };

}
