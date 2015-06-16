var app = app || {};

app.AppRouter = Backbone.Router.extend({

  routes: {
    '': 'search',
    'planes/:plane_id/flights/:id': 'flightView'
  },

  search: function() {
    var searchView = new app.SearchView();
    searchView.render();

    $('#searchForm').on('submit', function(e) {
      e.preventDefault();

      findFlights($('#departingSearch').val(), $('#arrivingSearch').val());
    });
  },

  flightView: function(plane_id, flight_id) {
    $('#main').html('');
    var rows = app.allPlanes.toJSON()[plane_id-1].rows;
    var columns = app.allPlanes.toJSON()[plane_id-1].columns;
    
    var flightView = new app.FlightView({model: app.allFlights.models[flight_id-1]});
    flightView.render(rows, columns)
  }


});

var findFlights = function(origin, destination) {
  origin = origin || "";
  destination = destination || "";

  var result = [];
  if (origin !== "" && destination !== "") {
    for (var i = 0; i < app.allFlights.toJSON().length; i++) {
      var thisOri = app.allFlights.toJSON()[i].origin;
      var thisDest = app.allFlights.toJSON()[i].destination;

      if (thisOri === origin.toUpperCase() && thisDest === destination.toUpperCase()) {
        console.log('we have a match!');
        result.push(app.allFlights.models[i]);
      };
    };
  } else if (destination !== "") {
    for (var j = 0; j < app.allFlights.toJSON().length; j++) {
      var thisDest = app.allFlights.toJSON()[j].destination;

      if (thisDest === destination.toUpperCase()) {
        console.log('the destination is a match!');
        app
        result.push(app.allFlights.models[j]);
      }
    }
  } else if (origin !== "") {
    for (var k = 0; k < app.allFlights.toJSON().length; k++) {
      var thisOri = app.allFlights.toJSON()[k].origin;

      if (thisOri === origin.toUpperCase()) {
        console.log('the origin is a match!');
        result.push(app.allFlights.models[k]);
      }
    }
  };
  renderResults(result);
};

var renderResults = function(results) {
  $('#searchResults').html('');

  results

  for ( var i = 0; i < results.length; i++ ) {
    var flightIndexView = new app.FlightIndexView({model: results[i]})
    flightIndexView.render();

    // console.log(results[i].id)
    // var $resultLine = '<p>Date: ' + results[i].date + ' Flight Number: ' + results[i].id + ' Origin: ' + results[i].origin + ' Arriving: ' + results[i].destination + '</p>';
    // $('#searchResults').append($resultLine);
  };
};