angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    console.log('hi')
    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
        Chats.remove(chat);
    }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
    $scope.settings = {
        enableFriends: true
    };
})

.controller('HomeCtrl', function($scope, $rootScope, $firebaseObject, $firebaseAuth, $timeout) {
    var ref = new Firebase('https://outside-in.firebaseio.com/')

    var auth = $firebaseAuth(ref);

    // login with Facebook
    $scope.name = ""

    // document.addEventListener("deviceready", function() {
        if(!ref.getAuth()) {
            console.log('not logged in')

            auth.$authWithOAuthPopup("facebook", function(error, authData) {
                if(error) {
                    console.log('failed')
                } else {
                    console.log(authData)
                    $scope.name = authData.facebook.displayName
                    // $scope.$apply()
                }
            })
        } else {
            console.log(ref.getAuth())
            $scope.name = ref.getAuth().facebook.displayName
            // $scope.$apply()
        }
    // }, false)

})


.controller('SavedCtrl', function($scope, $rootScope) {

})
.controller('ReplyCtrl', function($scope, $rootScope) {

})
.controller('PostCtrl', function($scope, $rootScope) {
    // Called when the form is submitted
    $scope.createPost = function(task) {
      $scope.tasks.push({
        content: post.content
      });
      $scope.taskModal.hide();
      task.title = "";
    };
})
.controller('LoginCtrl', function($scope, $rootScope) {
    console.log('login')
})
