var app = app || {};

app.AppRouter = Backbone.Router.extend({

  routes: {
    '': 'search',
    'planes/:plane_id/flights/:id': 'flightView',
    'app/plane/:id' : 'viewPlane'
    // 'app/plane/:id/edit'
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
  },

  viewPlane: function() {
    var Plane = app.viewPlanes.get(id);
    var viewPlane = new ViewPlane({model: plane});
    viewPlane.render();
  }
});