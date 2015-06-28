angular.module('starter')

.controller('masterCtrl', ['$scope', '$state', 'BgtestFactory', '$rootScope', '$ionicPopup', function($scope, $state, BgtestFactory, $rootScope, $ionicPopup){
    BgtestFactory.index().$promise.then(function(response){
      console.log(response.data);
        $scope.bgtests = response.bgtests;
    });

    $scope.create = function() {
      $state.go('create');
    };

    $scope.edit = function(id) {
      $state.go('update', {id: id});
    };

    $scope.delete = function(id) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Delete Record?',
        template: 'Are you sure you want to delete this record?'
      });
      confirmPopup.then(function(res) {
        if(res) {
          BgtestFactory.destroy({id: id}).$promise.then(function(status){
            console.log('You deleted record: ' + id);
            $scope.$emit('bgtest:listUpdate');
            $state.go('master', {}, {reload: true});
          });
        } else {
          console.log('You canceled the delete.');
        }
      });
    };

    $rootScope.$on('bgtest:listUpdate', function() {
      $scope.listUpdate();
    });

    $scope.listUpdate = function() {
      BgtestFactory.index().$promise.then(function(data){
        $scope.bgtests = data.bgtests;
      })
    };
}])

.controller("detailsCtrl",['$scope','$stateParams','BgtestService', function($scope,$stateParams,BgtestService){

    var id = $stateParams.id;
    BgtestService.getBgtest(id).then(function(response){
      console.log(response);
      $scope.bgtest = response.data;
    });

}])

.controller('createCtrl', ['$scope','$state','BgtestFactory', '$ionicPopup', function($scope, $state, BgtestFactory, $ionicPopup){
    $scope.bgtest = new BgtestFactory();
    $scope.create = function(){
      $scope.bgtest.$create(function(){
        var alertPopup = $ionicPopup.alert({
          title: 'Success!',
          template: 'Record successfully added!'
        });
        $scope.$emit('bgtest:listUpdate');
        $state.go('master', {}, {reload: true});
      });
    };
}])

.controller('updateCtrl', ['$scope', '$state', '$stateParams', 'BgtestFactory', '$ionicPopup', function($scope, $state, $stateParams, BgtestFactory, $ionicPopup){
    $scope.bgtest = BgtestFactory.show({id: $stateParams.id});
    console.log($scope.bgtest);

    $scope.update = function() {
      BgtestFactory.update($scope.bgtest, function(){
        var alertPopup = $ionicPopup.alert({
          title: 'Success!',
          template: 'Record successfully updated!'
        });
        $scope.$emit('bgtest:listUpdate');
        $state.go('master', {}, {reload: true});
      }, function(err){

      });
    };
}]);
