
//  window.onload = function() {
//    console.log("test!");
//    $('.pokeSide').on('click', function(){
//      console.log("hey!");
//      $(this).addClass('active');
//   });
var music1 = new Audio("sound/opening.mp3");
var bulbasaur = new Audio("sound/bulbasaur.mp3");
var menu = new Audio("sound/menuShort.mp3");
var charmander = new Audio("sound/charmander.mp3");
var pikachu = new Audio("sound/pikachu.mp3");
function pokeSound(sound) {
  console.log("Sounds!");
  sound.play();
}


$(document).ready(function() {
   console.log("test!");
   $('body').on('click', '.pokeSide', function(e){
     e.preventDefault();
     pokeSound(menu);
     $('div').removeClass('active');
     $('div a').removeClass('active');
     console.log("hey!");
     $(this).addClass('active');

  });

  music1.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
  }, false);
  music1.play();

  // var snd1  = new Audio();
  // var src1  = document.createElement("source");
  // src1.type = "sound/mp3";
  // src1.src  = "sound/opening.mp3";
  // snd1.appendChild(src1);
  // snd1.play();
 //  $('body').on('click', '.savePokemon', function(e){
 //    console.log("test!");
 //    $('#myModal').modal('toggle');
 //    setTimeout(function(){ $('.newPokeForm').find("input[type=text], textarea").val(""); }, 3000);
 // });
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
      $('#myModal').modal('toggle');
      pokeSound(bulbasaur);
      setTimeout(function(){ $('.newPokeForm').find("input[type=text], input[type=url], textarea").val(""); }, 3000);
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
      pokeSound(pikachu);
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
      pokeSound(charmander);
      var index = vm.pokemon.indexOf(poke);
      vm.pokemon.splice(index,1);
    }, function errorCallback(response) {
      console.log('There was an error deleting the data', response);
    });
  };

}
