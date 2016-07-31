
console.log("Helloooo!");


    angular
      .module('pokemon', [])
      .controller('AlbumsIndexController', AlbumsIndexController);



      AlbumsIndexController.$inject = ['$http'];
      function AlbumsIndexController (  $http  ) {
      $http({
        method: 'GET',
        url: 'api/albums',
      }).then(function successCallback(response) {
        vm.albums = response.data;
      }, function errorCallback(response) {
        console.log('There was an error getting the data', response);
      });

      var vm = this;
      vm.deleteAlbum = function (album) {
      $http({
        method: 'DELETE',
        url: '/api/albums/'+ album._id
      }).then(function successCallback(json) {
        var index = vm.albums.indexOf(album);
        vm.albums.splice(index, 1);
      }, function errorCallback(response) {
        console.log('There was an error deleting the data', response);
      });
      };

      vm.newAlbum = {};
      console.log(newAlbum);
      vm.createAlbum = function () {
      $http({
        method: 'POST',
        url: '/api/albums',
        data: vm.newAlbum,
      }).then(function successCallback(newAlbum) {
        console.log(newAlbum);
        vm.albums.push(newAlbum.data);
      }, function errorCallback(response) {
        console.log('There was an error posting the data', response);
      });
    };
      vm.editAlbum = function(album) {
        console.log(album);
        console.log(album._id);
        $http({
          method: 'PUT',
          url: '/api/albums/'+ album._id,
          data: album,
        }).then(function successCallback(editAlbum) {
          console.log(editAlbum.data);
          vm.albums.push(editAlbum.data);
        }, function errorCallback(response) {
          console.log('There was an error posting the data', response);
        });
      };
    }
