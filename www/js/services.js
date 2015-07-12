angular.module('starter.services', [])

.factory('Bot', function() {
    var http = null
    var foods = [["4505 Meats", "Cheeseburgers, Garlic Chimichurri Fries"],
        ["Alicia's Tamales Los Mayas", "Tamales, Arroz Con Leche"],
        ["AQ", "Sweet, Spicy and Shroomy Waffles"],
        ["Azalina's", "Peanut Tofu Nachos, Chicken Curry Nachos"],
        ["Beast and the Hare", "Texas Style Baked Potatoes"],
        ["Big Chef Tom's Belly Burgers", "Pork Belly Burgers, Crinkle Cut Cheese Fries"],
        ["Charles Chocolates", "Gourmet S'mores, Brownie Ice Cream Sundaes"],
        ["Chino", "Lumpia, Pork Fried Rice"],
        ["Curry Up Now", "Sexy Fries, Deconstructed Samosas"],
        ["Delessio Market & Bakery", "Thai Chicken Sandwiches, Kale Salads, Rabanada"],
        ["Delfina", "Meatball Subs with Provolone and Tomato"],
        ["Earthly Delights", "Philly Cheesesteaks, Cajun Chicken Sandwiches"],
        ["El Huarache Loco", "Huaraches, Gorditas, Quesadillas"],
        ["Endless Summer Sweets", "Gourmet Funnel Cakes, Hand-dipped Corn Dogs"],
        ["Escape from New York Pizza", "Pesto, Roasted Garlic and Potato Pizza Slices"],
        ["Freshroll Vietnamese Rolls & Bowls", "Vietnamese Sandwiches, Taro Chips"],
        ["Full Belly Farm", "An Outside Lands Farmers Market"],
        ["Glaze Teriyaki", "Teriyaki Bowls, Gyoza, Shishito Peppers"],
        ["Humphry Slocombe Ice Cream", "Secret Breakfast Ice Cream, Bourbon Coke Floats"],
        ["Il Cane Rosso", "Olive Oil Fried Egg Sandwiches, Griddled French Toast"],
        ["La Urbana", "Mexican Chorizo Dogs, Bean Soup"],
        ["Little Skillet", "Chicken & Waffles, Mac & Cheese, Fresh Watermelon"],
        ["Long Meadow Ranch - Cheeselands", "Cheese and Charcuterie Plates"],
        ["Loving Cup", "Madagascar Vanilla Bean Rice Pudding, Frozen Yogurt Sandwiches"],
        ["Lucca Foods", "BBQ Pulled Pork, Rice Krispy Treats"],
        ["Merigan Sub Shop", "Eggplant Parm Subs, Italian Shaved Ice"],
        ["Michael Mina’s Tailgate", "Smoked-Coconut Sugar Brisket, Sorghum Pickles, Bourbon BBQ Sauce"],
        ["Namu Street Food", "Mushroom Udon, Pork Tonkotsu"],
        ["NOJO", "Spicy Japanese Style Tator Tots"],
        ["Nombe", "Ramenburgers, JFC (Japanese Fried Chicken)"],
        ["Pacific Catch", "Hawaiian Ahi Poke, Fish & Chips, Sweet Potato Fries"],
        ["Pica Pica Arepa Kitchen", "Arepas, Sweet Plantains, Yuca Fries"],
        ["Precita Park Cafe", "Deep Fried Organic Donuts, Equator Coffee"],
        ["Proposition Chicken", "Fried, Flipped, Fake Chicken Sandwiches"]
        ["Raj + Singh", "Chicken Tikka Masala Naan Wraps, Veggie Korma Rice Bowls"],
        ["Rich Table", "Dried Porcini Doughnuts"]
        ["Rosamunde Sausage Grill", "Beer Sausages, Chicken Cherry Sausages, Vegan Apple Sage Sausages"],
        ["Sababa", "Falafels, Cardamom Coffee Slushies"],
        ["Sabores Del Sur", "Award-Winning Alfajores"],
        ["Sataysfied", "Chicken Satays, Mie Tek Tek Fried Noodles"],
        ["Sightglass Coffee", "Individually Prepared Coffees, Vanilla Iced Cold Brew"],
        ["Southpaw BBQ & Southern Cooking", "Smoked Brisket Sandwiches, Collard Greens"],
        ["Spicy Pie", "Pizza Slices, Cookie Pie"],
        ["Spin City Coffee", "Black Jet Pastries, Dynamo Donuts, Shakedown Ice Cream, Blue Bottle Coffee"],
        ["Split Pea Seduction", "Farm to Fork Soups, Salads, and Sandwiches"],
        ["Stones Throw", "Chicken Parm Sandwiches"],
        ["Straw", "\"The Ringmaster\" Donut Cheeseburgers"],
        ["Sugar & Spun", "Freshly Spun Cotton Candy Bouquets"],
        ["Suite Foods Waffle Shop", "Maple Bacon Waffles Stuffed With Fried Chicken"],
        ["Tacolicious", "Shot-and-a-beer Braised Chicken Tacos, Veggie Tacos, Baja Style Fried Fish Tacos"],
        ["The American Grilled Cheese Kitchen", "Classic Grilled Cheese Sandwiches, Smoky Tomato Soup"],
        ["The Butcher's Daughter", "Spicy Cheddar Brats, Knackwurst, Chicken Brats, Pates"],
        ["The Little Chihuahua", "Breakfast Burritos, Plantain & Black Bean Burritos, Fajita Burritos"],
        ["The Monk's Kettle", "Pretzel Knots, Sausages in a Pretzel Bun"],
        ["The Pizza Place", "Cheese, Pepperoni, and Vegan Personal Pizzas"],
        ["Three Babes Bakeshop", "Chicken Pot Pie, Peach Pie, Hot Apple Cider"],
        ["Three Twins Ice Cream", "Brownie Batter Chunk Ice Cream, Raspberry Sorbet"],
        ["Up & Under Pub and Grill", "Waffle Fries w/ Crazy Toppings"],
        ["Wise Sons Deli", "Pastrami Sandwiches, Bagels and Cream Cheese"],
        ["Woodhouse Fish Co.", "Oysters, Maine Lobster Rolls, New England Clam Chowder"],
        ["Bacon Bacon", "BBQ Bacon Burritos, Porky Fries"],
        ["Del Popolo", "Margherita Pizzas"],
        ["Event Specialists", "Cinnamon Sugar Churros, Giant Soft Pretzels"],
        ["Kara's Cupcakes", "Cupcakes, Karamel Corn, Artisan Cookies"],
        ["Living Greens Juice", "Fresh Juices, Thai Cocounuts, Hot Detox Tea, Hot Mulled Cider"],
        ["Rocko's Ice Cream Tacos", "Ice Cream Tacos, Frozen Bananas"],
        ["Señor Sisig", "Sisig Burritos & Tacos"],
        ["Seoul on Wheels", "Korritos, Korean Rice Plates"],
        ["Sprogs", "Rice Scooters"],
        ["The Chairman Truck", "Pork Belly, Pork Shoulder, Chicken and Tofu Buns"],
        ["The Creme Brulee Cart", "Gourmet Creme Brulees"],
        ["The Rib Whip", "BBQ Bowls & Sandwiches"],
        ["Those Fabulous Frickle Brothers", "Fabulous Frickles, Fried Green Tomatoes, Cold Kosher Dills"],
        ["Candybar Dessert Lounge", "Chocolate French Macarons, Homemade Hot Chocolate"],
        ["Epic Cookies", "Chocolate Krackle Cookies, White Chocolate Macadamia Cookies, Chocolate Chunk Cookies, 2% Milk"],
        ["Guittard Chocolate Company", "Melted Chocolate Bars"],
        ["Sharona's Chocolate Shop", "Chocolate Peanut Butter Cups, S'mores, Chocolate-Dipped Brownies"]]

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

    var addAnswer = function(answer, ref, weather) {
        var aRef = ref.child('/answers')
        var a = {
            content: answer,
            score: 0,
            timestamp: Date.now(),
            user: 'Robo Dave',
            weather: weather
        }
        aRef.push(a)
    }

    var doFoodShit = function(question, ref) {
        console.log('doing food shit')
        var q = question.content.toLowerCase()
        var foodWords = ['food', 'hungry', 'restaurant']
        if(matches(q, [foodWords])) {
            var top = {food: null, matches: 0}

            for(var i=0;i<foods.length;i++) {
                var food = foods[i]
                if(!food)
                    continue

                food.matches = 0
                var foodTokens = food[0].split(' ').concat(food[1].split(' '))

                for(var j=0;j<foodTokens.length;j++) {
                    foodTokens[j] = foodTokens[j].replace(',', '').toLowerCase()
                    console.log(foodTokens[j])
                    if(q.indexOf(foodTokens[j]) != -1) {
                        console.log('matched', foodTokens[j])
                        food.matches++
                    }
                }

                if(food.matches > top.matches) {
                    top.matches = food.matches
                    top.food = food
                }
            }

            console.log('top food', top.food)

            if(!top.food)
                return

            var answer = "Hungry? I suggest you check out " + top.food[0] + ", serving " + top.food[1].toLowerCase() + "."
            addAnswer(answer, ref, false)

        }
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
                            answer = answer + 'make sure to wear long pants and bring a jacket.'
                        } else {
                            answer = answer + 'dress for warm weather, but bring a jacket because it could get cold tonight.'
                        }
                    } else if(matches(q, [['rain', 'rainy', 'umbrella', 'poncho', 'raincoat']])) {
                        var condition = forecast.simpleforecast.forecastday[i].conditions.toLowerCase()
                        if(condition == 'rain' || condition == 'showers' || condition == 'rainy' || condition == 'drizzle') {
                            answer = 'It will rain ' + day + ', so make sure to bring rain gear!'
                        } else {
                            answer = answer + ' It will be ' + condition + ' ' + day + ', so no need for rain gear!'
                        }
                    } else if(matches(q, [['temperature', 'hot', 'cold', 'warm', 'freezing', 'chilly']])) {
                        var low = forecast.simpleforecast.forecastday[i].low.fahrenheit
                        var high = forecast.simpleforecast.forecastday[i].high.fahrenheit

                        answer = 'The low is ' + low + ' degrees and the high is ' + high + ' degrees.'
                    } else {
                        if(day == 'tonight')
                            i = 1
                        else if(day == 'tomorrow')
                            i = 2
                        answer = 'The weather forecast for ' + day + ' is: ' + forecast.txt_forecast.forecastday[i].fcttext + '.'
                    }
                    answer = answer + ' (Powered by Weather Underground)'
                    addAnswer(answer, ref, true)
                }).error(function(data, status, headers, config) {
                    console.log('oh no', data)
                })
        }
    }

    return {
        bleepBloop: function(question, ref, $http) {
            http = $http
            doWeatherShit(question, ref)
            doFoodShit(question, ref)
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
