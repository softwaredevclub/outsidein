angular.module('starter.services', [])

.factory('Bot', function() {
    var http = null

    var matches = function(q, m) {
        // q is question, m is an array of words, returns true if q matches at least one word per array in m
        for(var i=0;i<m.length;m++) {
            var matches = false
            for(var j=0;j<m[i].length;j++) {
                if(q.toLowerCase().indexOf(m[i][j]) != -1) {
                    matches = true
                    break
                }
            }
            if(!matches)
                return false
        }
        return true
    }

    var addAnswer = function(answer, ref) {
        var aRef = ref.child('/answers')
        var a = {
            content: answer,
            score: 0,
            timestamp: Date.now(),
            user: 'Robo Dave',
            weather: true
        }
        aRef.push(a)
    }

    var doWeatherShit = function(question, ref) {
        var q = question.content
        var weatherWords = ['weather', 'rainy', 'rain', 'sun', 'sunny', 'cold', 'hot', 'foggy', 'temperature', 'karl',
            'warm', 'umbrella', 'windy', 'wind', 'cloudy', 'clouds', 'breeze', 'jacket', 'shorts', 'wear', 'jeans', 'pants', 'sweater', 'shirt', 'poncho',
            'chilly', 'freezing']
        var questionWords = ['what', 'who', 'where', 'why', 'is it', 'is the', 'how', '?', 'should']

        if(matches(q, [weatherWords, questionWords])) { // talks about weather AND is a question
            http.get('http://api.wunderground.com/api/2e082dc05181a02c/forecast/q/CA/San_Francisco.json')
                .success(function(data, status, headers, config) {
                    console.log('aww yeah', data)
                    var forecast = data.forecast

                    var i, low, day
                    if(matches(q, [['tomorrow']])) {
                        i = 1
                        low = false
                        day = 'tomorrow'
                    } else if(matches(q, [['tonight', 'evening', 'later']])) {
                        i = 0
                        low = true
                        day = 'tonight'
                    } else {
                        // assume today
                        i = 0
                        low = false
                        day = 'today'
                    }

                    var answer = ''
                    if(matches(q, [['wind', 'windy', 'breeze']])) {
                        answer = 'The wind speed should be ' + forecast.simpleforecast.forecastday[i].avewind.mph + ' mph ' + day
                    } else if(matches(q, [['jacket', 'shorts', 'wear', 'jeans', 'pants', 'sweater', 'shirt']])) {
                        var temp
                        if(low)
                            temp = forecast.simpleforecast.forecastday[i].low.fahrenheit
                        else
                            temp = forecast.simpleforecast.forecastday[i].high.fahrenheit

                        var condition = forecast.simpleforecast.forecastday[i].conditions.toLowerCase()

                        answer = 'It will be ' + condition + ' and ' + temp + ' degrees ' + day + ', so '
                        if(temp < 57) {
                            answer = answer + 'make sure to wear long pants and bring a jacket'
                        } else {
                            answer = answer + 'dress for warm weather, but bring a jacket because it could get cold tonight'
                        }
                    } else if(matches(q, [['rain', 'rainy', 'umbrella', 'poncho', 'raincoat']])) {
                        var condition = forecast.simpleforecast.forecastday[i].conditions.toLowerCase()
                        if(condition == 'rain' || condition == 'showers' || condition == 'rainy' || condition == 'drizzle') {
                            answer = 'It will rain ' + day + ', so make sure to bring rain gear'
                        } else {
                            answer = answer + ' it will be ' + condition + ' ' + day + ', so need for rain gear!'
                        }
                    } else if(matches(q, [['temperature', 'hot', 'cold', 'warm', 'freezing', 'chilly']])) {
                        var low = forecast.simpleforecast.forecastday[i].low.fahrenheit
                        var high = forecast.simpleforecast.forecastday[i].high.fahrenheit

                        answer = 'The low is ' + low + ' degrees and the high is ' + high + ' degrees'
                    } else {
                        if(day == 'tonight')
                            i = 1
                        else if(day == 'tomorrow')
                            i = 2
                        answer = 'The weather forecast for ' + day + ' is: ' + forecast.txt_forecast.forecastday[i].fcttext
                    }
                    answer = answer + ' (Powered by Weather Underground)'
                    addAnswer(answer, ref)
                }).error(function(data, status, headers, config) {
                    console.log('oh no', data)
                })
        }
    }

    return {
        bleepBloop: function(question, ref, $http) {
            http = $http
            doWeatherShit(question, ref)
        }
    }
})

.factory('Chats', function() {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
        id: 0,
        name: 'Ben Sparrow',
        lastText: 'You on your way?',
        face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
    }, {
        id: 1,
        name: 'Max Lynx',
        lastText: 'Hey, it\'s me',
        face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
    },{
        id: 2,
        name: 'Adam Bradleyson',
        lastText: 'I should buy a boat',
        face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
    }, {
        id: 3,
        name: 'Perry Governor',
        lastText: 'Look at my mukluks!',
        face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
    }, {
        id: 4,
        name: 'Mike Harrington',
        lastText: 'This is wicked good ice cream.',
        face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
    }];

    return {
        all: function() {
            return chats;
        },
        remove: function(chat) {
            chats.splice(chats.indexOf(chat), 1);
        },
        get: function(chatId) {
            for (var i = 0; i < chats.length; i++) {
                if (chats[i].id === parseInt(chatId)) {
                    return chats[i];
                }
            }
            return null;
        }
    };
})
