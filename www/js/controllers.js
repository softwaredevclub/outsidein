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
    $scope.doRefresh = function(){}; //needs to be filled in

    var setFirebaseThing = function(authData) {
        var user = ref.child('/users/' + authData.uid)
        user.on('value', function(snapshot) {
            if(snapshot.val() === null) {
                user.set({
                    name: authData.facebook.displayName,
                    picture: authData.facebook.cachedUserProfile.picture.data.url
                })

            } else {
                var retrieveUser = snapshot.val();
            }
        })
    }

    var doShit = function() {
        console.log('doing shit')
        var users = ref.child('/users')
        users.on('value', function(snapshot) {
            var questions = []
            var users = snapshot.val()
            console.log(users)

            for(var userKey in users) {
                if(!users.hasOwnProperty(userKey))
                    continue

                var user = users[userKey]

                for(var questionKey in user.questions) {
                    if(!user.questions.hasOwnProperty(questionKey))
                        continue

                    var question = user.questions[questionKey]
                    question.userKey = userKey
                    question.questionKey = questionKey
                    question.userName = user.name
                    if(!question.answers)
                        question.answers = []
                    questions.push(question)
                }
            }

            console.log(questions)



            $scope.questions = questions
        })
    }

    var getQuestionRef = function(question) {
        return ref.child('/users/' + question.userKey + '/questions/' + question.questionKey)
    }

    //TODO: FOR NICHOLAS
    $scope.saveQuestion = function(question){
        console.log('SAVE!', question)
    }
    $scope.viewAnswers = function(question){
        console.log('VIEW!')
    }
    $scope.voteUp = function(question){
        console.log('UP!')
        if(window.localStorage[question.userKey + question.questionKey])
            return
        getQuestionRef(question).update({
            "score": question.score + 1
        })
        window.localStorage[question.userKey + question.questionKey] = true
    }
    $scope.voteDown = function(question){
        console.log('DOWN!')
        if(window.localStorage[question.userKey + question.questionKey])
            return
        getQuestionRef(question).update({
            "score": question.score - 1
        })
        window.localStorage[question.userKey + question.questionKey] = true
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
                    $rootScope.uid = authData.uid
                    window.localStorage['uid'] = authData.uid

                    setFirebaseThing(authData)
                    doShit()
                }
            })
        } else {
            console.log(ref.getAuth())
            $scope.name = ref.getAuth().facebook.displayName
            authData = ref.getAuth()

            $rootScope.uid = authData.uid
            window.localStorage['uid'] = authData.uid

            setFirebaseThing(authData)
            doShit()
        }
    // }, false)
})


.controller('SavedCtrl', function($scope, $rootScope) {

})
.controller('ReplyCtrl', function($scope, $rootScope) {

})
.controller('PostCtrl', function($scope, $rootScope, $firebaseObject, $ionicPopup) {
    if(!$rootScope.uid)
        $rootScope.uid = window.localStorage['uid']

    var ref = new Firebase('https://outside-in.firebaseio.com/users/' + $rootScope.uid + '/questions')

    $scope.createPost = function(post) {
        var post = {
            content: post.content,
            sticky: false,
            score: 0,
            timestamp: Date.now()
        }
        ref.push(post)
        var alertPopup = $ionicPopup.alert({
          title: 'Success',
          template: 'Your question was sent!',
          okType: 'blue'

        });
        alertPopup.then(function(res) {
          console.log('Thanks!');
        });

        $scope.post.content = ""
    }

    // var qRef = ref.child("questions");
    // qRef.set({
    // alanisawesome: {
    // date_of_birth: "June 23, 1912",
    // full_name: "Alan Turing"
    // },
    // gracehop: {
    // date_of_birth: "December 9, 1906",
    // full_name: "Grace Hopper"
    // }
    // });
    // var tstamp = Date.now();
    // $scope.createPost = function(post) {
    //   $scope.tasks.push({
    //     content: post.content
    //     sticky:  false
    //     uid: userID
    //     timestamp: tstamp //convert this to readable date when presenting to user
    //     score: 0
    //   });
    //   $scope.taskModal.hide();
    //   task.title = "";
    // };
})

.controller('LoginCtrl', function($scope, $rootScope) {
    console.log('login')
})
