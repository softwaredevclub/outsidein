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

.controller('HomeCtrl', function($scope, $rootScope, $firebaseObject, $firebaseAuth, $timeout, $state, $ionicPopup) {
    var ref = new Firebase('https://outside-in.firebaseio.com/')

    var auth = $firebaseAuth(ref);

    // login with Facebook
    $scope.name = ""
    $scope.doRefresh = function(){
        $state.go($state.current, {}, {reload: true})
    }; //needs to be filled in

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
                    question.up = window.localStorage[question.userKey + question.questionKey + 'up'] || false
                    question.down = window.localStorage[question.userKey + question.questionKey + 'down'] || false
                    question.showAnswers = false
                    question.hidden = false

                    if(!question.answers)
                        question.answers = {}
                    if(!window.localStorage['saved'] || window.localStorage['saved'].indexOf(questionKey) == -1)
                        question.star = 'ion-ios-star-outline'
                    else
                        question.star = 'ion-ios-star'
                    questions.push(question)
                }
            }
            //questions is an array first

            //questions.reverse() // newest first
            for (var i = 0; i < questions.length; i++) {
              questions[i].points = 0;
              if (questions[i].user == ref.getAuth().facebook.displayName) {
                questions[i].points += 200;
              }
              if (questions[i].sticky) {

                questions[i].points += 100;
              }
              questions[i].points += questions[i].score;
              questions[i].points += i/(questions.length/10);
            }
            //order by points
            questions.sort(function(a, b){
              return b.points-a.points
})

            console.log(questions)
            $scope.questions = questions
        })
    }

    var getQuestionRef = function(question) {
        return ref.child('/users/' + question.userKey + '/questions/' + question.questionKey)
    }

    //TODO: FOR NICHOLAS
    $scope.saveQuestion = function(question){

        if(!window.localStorage['saved'])
            window.localStorage['saved'] = "[]"

        if(window.localStorage['saved'].indexOf(question.questionKey) == -1) {
            var saved = JSON.parse(window.localStorage['saved'])
            saved.push(question)
            window.localStorage['saved'] = JSON.stringify(saved)
            question.star = 'ion-ios-star'
        } else {
            var saved = JSON.parse(window.localStorage['saved'])
            for(var i=0;i<saved.length;i++) {
                if(saved[i].questionKey == question.questionKey) {
                    saved.splice(i, 1)
                    break
                }
            }
            window.localStorage['saved'] = JSON.stringify(saved)
            question.star = 'ion-ios-star-outline'
        }
    }
    $scope.viewAnswers = function(question){
        console.log('VIEW!')
        question.showAnswers = !question.showAnswers
    }
    $scope.voteUp = function(question){
        if(window.localStorage[question.userKey + question.questionKey + 'up'] || window.localStorage[question.userKey + question.questionKey + 'down'])
            return
        getQuestionRef(question).update({
            "score": question.score + 1
        })
        question.up = true
        window.localStorage[question.userKey + question.questionKey + 'up'] = true
        $state.go($state.current, {}, {reload: true})
    }
    $scope.voteDown = function(question){
        if(window.localStorage[question.userKey + question.questionKey + 'down'] || window.localStorage[question.userKey + question.questionKey + 'up'])
            return
        getQuestionRef(question).update({
            "score": question.score - 1
        })
        question.down = true
        window.localStorage[question.userKey + question.questionKey + 'down'] = true
        $state.go($state.current, {}, {reload: true})
    }
    $scope.voteUpAnswer = function(answer){}
    $scope.voteDownAnswer = function(answer){}

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

    $scope.search = function(query) {
        var keywords = query.split(' ')
        if(query.length == 0) {
            for(var i=0;i<$scope.questions.length;i++)
                $scope.questions[i].hidden = false
            return
        }

        for(var i=0;i<$scope.questions.length;i++) {
            var question = $scope.questions[i]
            var tokens = question.content.split(' ')

            var has = false
            for(var j=0;j<tokens.length;j++) {
                var token = tokens[j]

                for(var k=0;k<keywords.length;k++) {
                    var keyword = keywords[k]
                    if(token.toLowerCase().indexOf(keyword.toLowerCase()) != -1) {
                        has = true
                        break;
                    }
                }

                if(has)
                    break;

            }

            if(has)
                question.hidden = false
            else
                question.hidden = true
        }
    }

    $scope.saveAnswer = function(question, answer) {
        console.log(ref.getAuth())
        var aRef = ref.child('/users/' + question.userKey + '/questions/' + question.questionKey + '/answers')
        var a = {
            content: answer.content,
            score: 0,
            timestamp: Date.now(),
            user: ref.getAuth().facebook.displayName
        }
        aRef.push(a)
        var alertPopup = $ionicPopup.alert({
          title: 'Success',
          template: 'Your answer was sent!',
          okType: 'blue'

        })
        alertPopup.then(function(res) {
          console.log('yah')
        })
    }
})


.controller('SavedCtrl', function($scope, $rootScope, $state) {
    if(!window.localStorage['saved'])
        window.localStorage['saved'] = '[]'
    $scope.questions = JSON.parse(window.localStorage['saved']) || []

    $scope.unsaveQuestion = function(question){
        window.localStorage['saved'] = window.localStorage['saved'].replace(JSON.stringify(question) + ',', '')
        window.localStorage['saved'] = window.localStorage['saved'].replace(JSON.stringify(question), '')
        $scope.questions = JSON.parse(window.localStorage['saved'])
    }
    $scope.viewAnswers = function(question){}

    $scope.doRefresh = function() {
        $state.go($state.current, {}, {reload: true})
    }

    $scope.search = function(query) {
        var keywords = query.split(' ')
        if(query.length == 0) {
            for(var i=0;i<$scope.questions.length;i++)
                $scope.questions[i].hidden = false
            return
        }

        for(var i=0;i<$scope.questions.length;i++) {
            var question = $scope.questions[i]
            var tokens = question.content.split(' ')

            var has = false
            for(var j=0;j<tokens.length;j++) {
                var token = tokens[j]

                for(var k=0;k<keywords.length;k++) {
                    var keyword = keywords[k]
                    if(token.toLowerCase().indexOf(keyword.toLowerCase()) != -1) {
                        has = true
                        break;
                    }
                }

                if(has)
                    break;

            }

            if(has)
                question.hidden = false
            else
                question.hidden = true
        }
    }
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

    }
})

.controller('LoginCtrl', function($scope, $rootScope) {
    console.log('login')
})
