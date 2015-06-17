var app = app || {};

app.SearchView = Backbone.View.extend({
      el: "#main",

      events: {
        'click': 'findFlights'
      },

  render: function() {

    this.$el.html($("#search").html());
  },
});

var findFlights = function(origin, destination, dateOne, dateTwo) {
  origin = origin || "";
  destination = destination || "";
  dateOne = Date.parse(dateOne) || "";
  dateTwo = Date.parse(dateTwo) || "";
  var dateMatch; 

  var dateMatchFunc = function() {
    if (dateOne !== "" && dateTwo !== "") {
      if ((dateOne < thisDate) && (thisDate < dateTwo)) {
        dateMatch = true;
      } else {
        dateMatch = false;
      }
    } else if (dateOne === "" && dateTwo !== "") {
      if (thisDate < dateTwo) {
        dateMatch = true;
      } else {
        dateMatch = false;
      }
    } else if (dateOne !== "" && dateTwo === "") {
      if (dateOne < thisDate) {
        dateMatch = true;
      } else {
        dateMatch = false;
      }
    } else if (dateOne === "" && dateTwo === "") {
      dateMatch = true;
    }
  }

  var result = [];

  if (origin !== "" && destination !== "") {
    for (var i = 0; i < app.allFlights.toJSON().length; i++) {
      var thisOri = app.allFlights.toJSON()[i].origin;
      var thisDest = app.allFlights.toJSON()[i].destination;
      var thisDate = Date.parse(app.allFlights.toJSON()[i].date);

      dateMatchFunc();
      
      if (thisOri === origin.toUpperCase() && thisDest === destination.toUpperCase()) {
        console.log('the date, destination and origin match');
        result.push(app.allFlights.models[i]);
      }
    }
  } else if (destination !== "") {
    for (var j = 0; j < app.allFlights.toJSON().length; j++) {
      var thisDest = app.allFlights.toJSON()[j].destination;
      var thisDate = Date.parse(app.allFlights.toJSON()[j].date);
      dateMatchFunc();
      if (thisDest === destination.toUpperCase() && dateMatch) {
        console.log('the destination and date is a match!');
        result.push(app.allFlights.models[j]);
      }
    }
  } else if (origin !== "") {
    for (var k = 0; k < app.allFlights.toJSON().length; k++) {
      var thisOri = app.allFlights.toJSON()[k].origin;
      var thisDate = Date.parse(app.allFlights.toJSON()[k].date);
      dateMatchFunc();
      if (thisOri === origin.toUpperCase() && dateMatch) {
        console.log('the origin and date are a match!');
        result.push(app.allFlights.models[k]);
      }
    }
  } else {
    for (var k = 0; k < app.allFlights.toJSON().length; k++) {
      var thisDate = Date.parse(app.allFlights.toJSON()[k].date);
      dateMatchFunc();
      if (dateMatch) {
        console.log('this should juust be all flights');
        result.push(app.allFlights.models[k]);
      }
    }
  }
  console.log("this is the result", result);
  renderResults(result);
};

var renderResults = function(results) {
  $('#searchResults').html('');
     if (results.length === 0) {
      console.log("here")
    $('#searchResults').html('<p>No flights match your search</p>')
  } else {
    for ( var i = 0; i < results.length; i++ ) {
      var flightIndexView = new app.FlightIndexView({model: results[i]});
    
      flightIndexView.render();
    }
  }
};

