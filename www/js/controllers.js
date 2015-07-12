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

.controller('HomeCtrl', function($scope, $rootScope, $firebaseObject, $firebaseAuth) {
    var ref = new Firebase('https://outside-in.firebaseio.com/')

    var auth = $firebaseAuth(ref);
    // login with Facebook
    auth.$authWithOAuthPopup("facebook").then(function(authData) {
        console.log("Logged in as:", authData.uid)
    }).catch(function(error) {
        console.log("Authentication failed:", error)
    })


    console.log('hi')
    if(!$rootScope.user) {

    }
})


.controller('SavedCtrl', function($scope, $rootScope) {

})
.controller('ReplyCtrl', function($scope, $rootScope) {

})
.controller('PostCtrl', function($scope, $rootScope) {
    // Called when the form is submitted
    /* Nikki's shitty writing code below.
var ref = new Firebase('https://outside-in.firebaseio.com')
var qRef = ref.child("questions");
qRef.set({
alanisawesome: {
date_of_birth: "June 23, 1912",
full_name: "Alan Turing"
},
gracehop: {
date_of_birth: "December 9, 1906",
full_name: "Grace Hopper"
}
});
var tstamp = Date.now();
    $scope.createPost = function(post) {
      $scope.tasks.push({
        content: post.content
        sticky:  false
        uid: userID
        timestamp: tstamp //convert this to readable date when presenting to user
        score: 0
      });
      $scope.taskModal.hide();
      task.title = "";
    };
})

*/
.controller('LoginCtrl', function($scope, $rootScope) {
    console.log('login')
})
