/* CLIENT-SIDE JS
 *
 * This is your main angular file. Edit as you see fit.
 *
 */
//  window.onload = function() {
//    console.log("test!");
//    $('.pokeSide').on('click', function(){
//      console.log("hey!");
//      $(this).addClass('active');
//   });


$(document).ready(function() {
   console.log("test!");
   $('body').on('click', '.pokeSide', function(e){
     e.preventDefault();
     $('div').removeClass('active');
     $('div a').removeClass('active');
     console.log("hey!");
     $(this).addClass('active');
  });
  $('body').on('click', '.savePokemon', function(e){
    console.log("test!");
    $('#myModal').modal('toggle');
    setTimeout(function(){ $('.newPokeForm').find("input[type=text], textarea").val(""); }, 3000);
 });
});

angular
  .module('pokemon', [])
  .controller('PokemonIndexController', PokemonIndexController);
//   .controller('SelectPokemonController', SelectPokemonController);
//
// function SelectPokemonController($scope) {
//   function Main($scope) {
//   $scope.rootFolders = 'bob';
// }

PokemonIndexController.$inject = ['$http', '$scope'];

// function PokemonIndexController($scope) {
//   $scope.selectPokemon = 'bob';
// }
function PokemonIndexController ($http, $scope) {
  var vm = this;
  vm.newPoke = {};
  // vm.newPoke = {
  //   name: '',
  //   artistName: 'Morrissey'
  // };

  $http({
    method: 'GET',
    url:'https://super-crud.herokuapp.com/pokemon',
  }).then(function successCallback(response) {
    vm.pokemon = response.data.pokemon;
    console.log(response.data);
    vm.selectPokemon = vm.pokemon[0].name;
  }, function errorCallback(response) {
    console.log('There was an error getting the data', response);
  });


  // $scope.selectPokemon = 'Venusaur';

  vm.changePoke = function(poke) {
    console.log(poke);
    console.log("Clicked!");
    console.log(poke.name);
    vm.selectPokemon = poke._id;
    console.log(vm.selectPokemon);
    // console.log(vm.pokemon[$index].name);
    // $scope.selectPokemon = vm.pokemon[$index].name;
  };


  vm.createPoke = function () {
    console.log("test");
    console.log("newPoke");
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
    console.log(poke);
    $http({
      method: 'PUT',
      url: 'https://super-crud.herokuapp.com/pokemon/'+poke._id,
      data: poke
    }).then(function successCallback(json) {
      console.log("PUT!");
    }, function errorCallback(response) {
      console.log('There was an error editing the data', response);
    });
  };

  vm.deletePoke = function (poke) {
    $http({
      method: 'DELETE',
      url: 'https://super-crud.herokuapp.com/pokemon/'+ poke._id
    }).then(function successCallback(json) {
      console.log("test");
      var index = vm.pokemon.indexOf(poke);
      vm.pokemon.splice(index,1);
    }, function errorCallback(response) {
      console.log('There was an error deleting the data', response);
    });
  };

}
