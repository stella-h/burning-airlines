var app = app || {};

app.SearchView = Backbone.View.extend({
      el: "#main",

      events: {
        'click': 'findFlights'
      },

  render: function() {

    this.$el.html($("#search").html());
  },
  
  PlaneIndexTemplate: function() {
        app.router.navigate('app/planes/' + this.collection.models[0].get('id'), true);
  },
});

var findFlights = function(origin, destination, date) {
  origin = origin || "";
  destination = destination || "";
  date = date || "";

  var result = [];

  if (origin !== "" && destination !== "" && date !== "") {
    for (var i = 0; i < app.allFlights.toJSON().length; i++) {
      var thisOri = app.allFlights.toJSON()[i].origin;
      var thisDest = app.allFlights.toJSON()[i].destination;
      var thisDate = app.allFlights.toJSON()[i].date;
      debugger;

      if (thisOri === origin.toUpperCase() && thisDest === destination.toUpperCase() && thisDate === date) {
        console.log('the date, destination and origin match');
        result.push(app.allFlights.models[i]);
      }
    }
  } else if (destination !== "" && date !== "") {
    for (var j = 0; j < app.allFlights.toJSON().length; j++) {
      var thisDest = app.allFlights.toJSON()[j].destination;
      var thisDate = app.allFlights.toJSON()[j].date
      if (thisDest === destination.toUpperCase() && thisDate === date) {
        console.log('the destination and date is a match!');
        result.push(app.allFlights.models[j]);
      }
    }
  } else if (origin !== "" && date !== "") {
    for (var k = 0; k < app.allFlights.toJSON().length; k++) {
      var thisOri = app.allFlights.toJSON()[k].origin;
      var thisDate = app.allFlights.toJSON()[k].date;
      if (thisOri === origin.toUpperCase() && thisDate === date) {
        console.log('the origin and date are a match!');
        result.push(app.allFlights.models[k]);
      }
    }
  } else if (date !== "") {
    for (var k = 0; k < app.allFlights.toJSON().length; k++) {
      var thisDate = app.allFlights.toJSON()[k].date;
      if (thisDate === date) {
        console.log('the date is a match!');
        result.push(app.allFlights.models[k]);
      }
    }
  };
  console.log(result);
  renderResults(result);
};

var renderResults = function(results) {
  $('#searchResults').html('');

  for ( var i = 0; i < results.length; i++ ) {
    var flightIndexView = new app.FlightIndexView({model: results[i]});
    flightIndexView.render();
  }
};

