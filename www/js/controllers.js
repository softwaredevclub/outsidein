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

    var setFirebaseThing = function(authData) {
        var user = ref.child('/users/' + authData.uid)
        user.on('value', function(snapshot) {
            console.log('there')
            if(snapshot.val() === null) {
                console.log('here')
                user.set({
                    name: authData.facebook.displayName,
                    picture: authData.facebook.cachedUserProfile.picture.data.url
                })

            } else {
                var retrieveUser = snapshot.val();
            }
        })
    }

    // document.addEventListener("deviceready", function() {
        if(!ref.getAuth()) {
            console.log('not logged in')

            auth.$authWithOAuthPopup("facebook", function(error, authData) {
                if(error) {
                    console.log('failed')
                } else {
                    console.log(authData)
                    $scope.name = authData.facebook.displayName
                    $rootScope.authId = authData.uid

                    setFirebaseThing(authData)
                }
            })
        } else {
            console.log(ref.getAuth())
            $scope.name = ref.getAuth().facebook.displayName
            authData = ref.getAuth()

            setFirebaseThing(authData)
        }
    // }, false)
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
