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

